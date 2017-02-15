/* global window ace API_HOST */
import React from 'react';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import strings from 'lang';
import { getScript } from 'utility';
import Table from 'components/Table';
import Heading from 'components/Heading';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
// import Menu from 'material-ui/Menu';

function jsonResponse(response) {
  return response.json();
}
// TODO special queries: mega creep wins
// TODO graphical query builder
// TODO Remote API calls: league listing, player listing
const queryTypes = [
// query type: picks/bans/stat/purchase/casts/uses/damage/received
];
const selectFields = [
  { display: 'Hero', value: 'hero_id' },
];
const groupByFields = [
  { display: 'Player', value: 'account_id' },
  { display: 'Hero', value: 'hero_id' },
];

const queryTemplate = ({ select, where, group, agg, order }) => `
SELECT ${select}, ${agg}(${select}) as ${agg}
FROM player_matches pm
LEFT JOIN notable_players np
ON pm.account_id = np.account_id
JOIN matches m
ON pm.match_id = m.match_id
JOIN heroes h
ON pm.hero_id = h.id
JOIN leagues le
ON m.leagueid = le.leagueid
WHERE ${where}
GROUP BY ${group}
ORDER BY ${order} DESC
LIMIT 1000
`;

// hero_id,
// picks/bans,
// tower damage,
// hero damage,
// hero_healing,
// kills, deaths, assists,
// gpm, xpm, lh, dn, hd, td, hh, level, stuns
// stat_t[minute],
// damage_inflictor
// damage_inflictor_received
// runes
// kills->>unit, purchase->>item, casts->>ability, uses->>item
// where (none, patch, league, hero, player, item purchased)
// TODO allow multiple where conditions
// group by (none, hero, player, league, team, month), aggregation (none, count, avg, sum)
// order by (stat descending)
// limit (default 1000)
// basic player_match data: league.name as leaguename, h.localized_name, np.name, stat
// basic agg data: count(*), agg(stat)
/*
Which pro player with at least 10 games has the highest average GPM in 6.85 so far?

What patch has the highest pro winrate for Tiny+Io?

What hero was banned the most at TI4?

What was the winrate of players picking up Hand of Midas in 6.84 pro play? How many people lost with it?

What items does DKPhobos buy on Zeus?

How many times has Night Stalker been played in a dual mid lane over all time in pro play?

What % of the time did pro teams down by 4 towers at 25 minutes end up winning in 6.84?

Which pro player has the 5th highest last hits on Venomancer at 40 minutes across all patches?

Who has the earliest courier kill in 6.85, what time did it happen at, and on what hero?

Who had the most kills in a single game in season 6 of the Amateur Dota 2 League (AD2L)?

What is Nahaz (NahazDota)’s record in ticketed games?
*/


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
    fetch(`${API_HOST}/api/explorer${queryString}`).then(jsonResponse).then(this.handleResponse);
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

  }
  render() {
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      <div>
        <a href="https://github.com/odota/core/blob/master/sql/create_tables.sql">{strings.explorer_schema}</a>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>
          <Heading title={strings.explorer_builder} subtitle={strings.explorer_builder_description} />
          <SelectField
            floatingLabelText="Select"
            value={this.state.builder.queryType}
          >
            <MenuItem value={1} primaryText="Never" />
          </SelectField>
          <SelectField
            floatingLabelText="Aggregate"
            value={this.state.builder.queryType}
          />
          <SelectField
            floatingLabelText="Group By"
            value={this.state.builder.queryType}
          />
          <SelectField
            floatingLabelText="Where"
            value={this.state.builder.queryType}
          />
        </div>
        <div style={{ width: '50%' }}>
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
              }
              return typeof field === 'string' ? field : JSON.stringify(field);
            },
          }))}
        />
        : <Spinner />
      }
    </div>);
  }
}

export default Explorer;
