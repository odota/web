/* global window ace API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import strings from 'lang';
import { getScript } from 'utility';
import Table from 'components/Table';
import Heading from 'components/Heading';
import heroData from 'dotaconstants/build/heroes.json';
import patchData from 'dotaconstants/build/patch.json';
import itemData from 'dotaconstants/build/items.json';
import { getProPlayers, getLeagues } from 'actions';
import queryTemplate from './queryTemplate';
import ExplorerFormField from './ExplorerFormField';

function jsonResponse(response) {
  return response.json();
}
/*
What patch has the highest pro winrate for Tiny+Io?
What hero was banned the most at TI4?
What was the winrate of players picking up Hand of Midas in 6.84 pro play? How many people lost with it?
What items does DKPhobos buy on Zeus?
How many times has Night Stalker been played in a dual mid lane over all time in pro play?
What % of the time did pro teams down by 4 towers at 25 minutes end up winning in 6.84?
Which pro player has the 5th highest last hits on Venomancer at 40 minutes across all patches?
Who has the earliest courier kill in 6.85, what time did it happen at, and on what hero?
*/
// TODO special queries: mega creep wins, bans, log queries
// TODO hero duos
// TODO lane positions
const player = { text: 'Player', value: 'notable_players.name', alias: 'playername' };
const hero = { text: strings.th_hero_id, value: 'hero_id' };
const league = { text: 'League', value: 'leagues.name', alias: 'leaguename' };
const patch = { text: 'Patch', value: 'patch' };
// const match = { text: 'Match', value: 'match_id' };
const selects = [
  { text: strings.heading_gold_per_min, value: 'gold_per_min' },
  { text: strings.heading_xp_per_min, value: 'xp_per_min' },
  { text: strings.heading_kills, value: 'kills' },
  { text: strings.heading_deaths, value: 'deaths' },
  { text: strings.heading_assists, value: 'assists' },
  { text: strings.heading_last_hits, value: 'last_hits' },
  { text: strings.heading_denies, value: 'denies' },
  { text: strings.heading_hero_damage, value: 'hero_damage' },
  { text: strings.heading_tower_damage, value: 'tower_damage' },
  { text: strings.heading_hero_healing, value: 'hero_healing' },
  { text: strings.heading_level, value: 'level' },
  { text: strings.heading_stuns, value: 'stuns' },
  // TODO expand to 10, 20, 30, 40, 50
  { text: strings.heading_lhten, value: 'lh_t[10]' },
  { text: 'Gold@10', value: 'gold_t[10]' },
  // TODO purchase->>item
  // TODO ability_uses->>ability
  // TODO item uses->item
  // TODO damage_inflictor
  // TODO damage_inflictor_received
  // TODO runes
  // TODO kills->>unit
];
const groups = [
  player,
  hero,
  league,
  patch,
// TODO damage inflictor
// TODO damage inflictor received
// TODO kills->>unit
];
const patches = patchData.reverse().map(patch => ({ text: patch.name, value: patch.name }));
const heroes = Object.keys(heroData).map(heroId => ({ text: heroData[heroId].localized_name, value: heroData[heroId].id }));
const items = Object.keys(itemData).map(itemName => ({ text: itemData[itemName].dname, value: itemName }));

class Explorer extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingEditor: true,
      querying: false,
      result: {},
      builder: {},
    };
    this.instantiateEditor = this.instantiateEditor.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.handleJson = this.handleJson.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
  }
  componentDidMount() {
    this.props.dispatchProPlayers();
    this.props.dispatchLeagues();
    getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js', this.instantiateEditor);
  }
  getQueryString() {
    return `?sql=${encodeURIComponent(this.editor.getSelectedText() || this.editor.getValue())}`;
  }
  instantiateEditor() {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 10,
      maxLines: Infinity,
    });
    this.editor = editor;
    const sql = this.props && this.props.location && this.props.location.query && this.props.location.query.sql;
    if (sql) {
      editor.setValue(decodeURIComponent(sql));
      this.handleQuery();
    } else {
      editor.setValue('select count(*) from matches;');
    }
    this.setState(Object.assign({}, this.state, { loadingEditor: false }));
  }
  handleQuery() {
    if (this.state.loadingEditor === true) {
      return setTimeout(this.handleQuery, 1000);
    }
    this.setState(Object.assign({}, this.state, { querying: true }));
    const queryString = this.getQueryString();
    window.history.pushState('', '', queryString);
    return fetch(`${API_HOST}/api/explorer${queryString}`).then(jsonResponse).then(this.handleResponse);
  }
  handleJson() {
    window.open(`${API_HOST}/api/explorer${this.getQueryString()}`, '_blank');
  }
  handleResponse(json) {
    this.setState(Object.assign({}, this.state, {
      querying: false,
      open: false,
      result: json,
    }));
  }
  buildQuery() {
    this.editor.setValue(queryTemplate(this.state.builder));
  }
  render() {
    const proPlayers = this.props.proPlayers.map(player => ({ text: player.name, value: player.account_id }));
    const leagues = this.props.leagues.map(league => ({ text: league.name, value: league.leagueid }));
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      <div>
        <a href="https://github.com/odota/core/blob/master/sql/create_tables.sql">{strings.explorer_schema}</a>
      </div>
      <div>
        <Heading title={strings.explorer_builder} subtitle={strings.explorer_builder_description} />
        <div style={{ display: 'flex' }}>
          <ExplorerFormField label="Select" dataSource={selects} builderField="select" builderContext={this} />
          <ExplorerFormField label="Group By" dataSource={groups} builderField="group" builderContext={this} />
          <ExplorerFormField label="Hero" dataSource={heroes} builderField="hero" builderContext={this} />
          <ExplorerFormField label="Patch" dataSource={patches} builderField="patch" builderContext={this} />
          <ExplorerFormField label="Player" dataSource={proPlayers} builderField="player" builderContext={this} />
          <ExplorerFormField label="League" dataSource={leagues} builderField="league" builderContext={this} />
          <ExplorerFormField label="Item" dataSource={items} builderField="item" builderContext={this} />
        </div>
      </div>
      <div>
        <Heading title={strings.explorer_query} subtitle={strings.explorer_query_description} />
        {this.state.loadingEditor && <Spinner />}
        <div
          id={'editor'}
          style={{
            width: '100%',
            height: 200,
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_query_button}
          onClick={this.handleQuery}
          disabled={this.state.loadingEditor}
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_json_button}
          onClick={this.handleJson}
          disabled={this.state.loadingEditor}
        />
      </div>
      <Heading title={strings.explorer_results} subtitle={`${(this.state.result.rows || []).length} ${strings.explorer_num_rows}`} />
      <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
      {!this.state.querying ?
        <Table
          data={this.state.result.rows || []}
          columns={(this.state.result.fields || []).map(column => ({
            displayName: column.name,
            field: column.name,
            displayFn: (row, col, field) => {
              if (column.name === 'match_id') {
                return <Link to={`/matches/${field}`}>{field}</Link>;
              } else if (column.name === 'hero_id') {
                return <Link to={`/heroes/${field}`}>{heroData[field] ? heroData[field].localized_name : field}</Link>;
              }
              return typeof field === 'string' ? field : JSON.stringify(field);
            },
            sortFn: true,
          }))}
        />
        : <Spinner />
      }
    </div>);
  }
}

const mapStateToProps = state => ({
  proPlayers: state.app.proPlayers.list,
  leagues: state.app.leagues.list,
});

const mapDispatchToProps = dispatch => ({
  dispatchProPlayers: () => dispatch(getProPlayers()),
  dispatchLeagues: () => dispatch(getLeagues()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
