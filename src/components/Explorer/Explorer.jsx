/* global window ace API_HOST */
import React from 'react';
import {
  connect,
}
from 'react-redux';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Link,
}
from 'react-router';
import Helmet from 'react-helmet';
import strings from 'lang';
import {
  getScript,
  transformations,
  formatSeconds,
}
from 'utility';
import Table from 'components/Table';
import Heading from 'components/Heading';
import heroData from 'dotaconstants/build/heroes.json';
import patchData from 'dotaconstants/build/patch.json';
import itemData from 'dotaconstants/build/items.json';
import {
  getProPlayers,
  getLeagues,
}
from 'actions';
import {
  TablePercent,
}
from 'components/Visualizations';
import util from 'util';
import querystring from 'querystring';
import queryTemplate from './queryTemplate';
import ExplorerFormField from './ExplorerFormField';

function jsonResponse(response) {
  return response.json();
}
function getItemSuffix(itemKey) {
  return ['_2', '_3', '_4', '_5'].some(suffix => itemKey.indexOf(suffix) !== -1) ? itemKey[itemKey.length - 1] : '';
}
// TODO mega creep wins
// TODO bans
// TODO hero combos
// TODO lane positions
// TODO match level selects (duration), right now these get 10 rows per match
// TODO helplink
const player = {
  text: strings.explorer_player,
  value: 'notable_players.name',
  alias: 'playername',
};
const hero = {
  text: strings.th_hero_id,
  value: 'player_matches.hero_id',
};
const league = {
  text: strings.explorer_league,
  value: 'leagues.name',
  alias: 'leaguename',
};
const patch = {
  text: strings.explorer_patch,
  value: 'patch',
};
const jsonSelect = {
  value: 'key',
  groupValue: 'value::text::int',
  groupKey: 'key',
};
const timingSelect = itemKey => ({
  text: `${strings.explorer_timing} - ${itemData[itemKey].dname} ${getItemSuffix(itemKey)}`,
  value: 'match_logs.time',
  order: 'ASC',
  join: `JOIN match_logs 
ON match_logs.match_id = matches.match_id 
AND player_matches.player_slot = match_logs.targetname_slot 
AND match_logs.type = 'DOTA_COMBATLOG_PURCHASE'
AND match_logs.valuename = 'item_${itemKey}'`,
});
const killSelect = ({
  text,
  key,
}) => ({
  text: `${strings.explorer_kill} - ${text}`,
  value: 'match_logs.time',
  order: 'ASC',
  join: `JOIN match_logs 
ON match_logs.match_id = matches.match_id 
AND player_matches.player_slot = match_logs.sourcename_slot 
AND match_logs.type = 'DOTA_COMBATLOG_DEATH'
AND match_logs.targetname LIKE '${key}'`,
});
const fields = {
  select: [{
    text: strings.heading_kills,
    value: 'kills',
  }, {
    text: strings.heading_deaths,
    value: 'deaths',
  }, {
    text: strings.heading_assists,
    value: 'assists',
  }, {
    text: strings.heading_gold_per_min,
    value: 'gold_per_min',
  }, {
    text: strings.heading_xp_per_min,
    value: 'xp_per_min',
  }, {
    text: strings.heading_last_hits,
    value: 'last_hits',
  }, {
    text: strings.heading_denies,
    value: 'denies',
  }, {
    text: strings.heading_hero_damage,
    value: 'hero_damage',
  }, {
    text: strings.heading_tower_damage,
    value: 'tower_damage',
  }, {
    text: strings.heading_hero_healing,
    value: 'hero_healing',
  }, {
    text: strings.heading_level,
    value: 'level',
  }, {
    text: strings.heading_stuns,
    value: 'stuns',
  }, {
    text: strings.heading_camps_stacked,
    value: 'camps_stacked',
  }, {
    text: strings.heading_lhten,
    value: 'lh_t[10]',
  }, {
    text: strings.heading_lhtwenty,
    value: 'lh_t[20]',
  }, {
    text: strings.heading_lhthirty,
    value: 'lh_t[30]',
  }, {
    text: strings.heading_lhforty,
    value: 'lh_t[40]',
  }, {
    text: strings.heading_lhfifty,
    value: 'lh_t[50]',
  }, {
    text: strings.heading_duration,
    value: 'duration',
  }, { ...jsonSelect,
    text: strings.heading_item_purchased,
    alias: 'item_name',
    join: ', json_each(player_matches.purchase)',
  }, { ...jsonSelect,
    text: strings.heading_ability_used,
    alias: 'ability_name',
    join: ', json_each(player_matches.ability_uses)',
  }, { ...jsonSelect,
    text: strings.heading_item_used,
    alias: 'item_name',
    join: ', json_each(player_matches.item_uses)',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor,
    join: ', json_each(player_matches.damage_inflictor)',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor_received,
    join: ', json_each(player_matches.damage_inflictor_received)',
  }, { ...jsonSelect,
    text: strings.heading_runes,
    alias: 'rune_id',
    join: ', json_each(player_matches.runes)',
  }, { ...jsonSelect,
    text: strings.heading_unit_kills,
    join: ', json_each(player_matches.killed)',
  }, { ...jsonSelect,
    text: strings.heading_damage_instances,
    join: ', json_each(player_matches.hero_hits)',
  }, killSelect({
    text: strings.heading_courier,
    key: 'npc_dota_courier',
  }),
    killSelect({
      text: strings.heading_roshan,
      key: 'npc_dota_roshan',
    }),
    killSelect({
      text: strings.heading_tower,
      key: '%tower%',
    }),
    killSelect({
      text: strings.heading_barracks,
      key: '%rax%',
    }),
    killSelect({
      text: strings.heading_shrine,
      key: '%healers%',
    }),
  ]
    .concat(Object.keys(itemData).filter(itemKey => itemData[itemKey].cost > 2000).map(timingSelect)),
  group: [
    hero,
    player,
    league,
    patch, {
      text: strings.heading_duration,
      value: 'duration/300*5',
      alias: 'minutes',
    },
  ],
  patch: patchData.reverse().map(patch => ({
    text: patch.name,
    value: patch.name,
  })),
  hero: Object.keys(heroData).map(heroId => ({
    text: heroData[heroId].localized_name,
    value: heroData[heroId].id,
  })),
  playerPurchased: Object.keys(itemData).map(itemName => ({
    text: itemData[itemName].dname,
    value: itemName,
  })),
  duration: [10, 20, 30, 40, 50].map(duration => ({
    text: `>${util.format(strings.time_mm, duration)}`,
    value: duration * 60,
  })),
};

class Explorer extends React.Component {
  constructor() {
    super();
    const urlBuilderState = querystring.parse(window.location.search.substring(1));

    this.state = {
      loadingEditor: true,
      querying: false,
      result: {},
      builder: urlBuilderState.builder ? JSON.parse(urlBuilderState.builder) : {},
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
    const builder = encodeURIComponent(JSON.stringify(this.state.builder));
    const sql = encodeURIComponent(this.editor.getSelectedText() || this.editor.getValue());
    return `?builder=${builder}&sql=${sql}`;
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
    this.setState(Object.assign({}, this.state, {
      loadingEditor: false,
    }));
  }
  handleQuery() {
    if (this.state.loadingEditor === true) {
      return setTimeout(this.handleQuery, 1000);
    }
    this.setState(Object.assign({}, this.state, {
      querying: true,
    }));
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
    console.log(this.state.builder);
    this.editor.setValue(queryTemplate(this.state.builder));
  }
  render() {
    const proPlayers = this.props.proPlayers.map(player => ({
      text: player.name,
      value: player.account_id,
    }));
    const leagues = this.props.leagues.map(league => ({
      text: league.name,
      value: league.leagueid,
    }));
    const proPlayerMapping = {};
    proPlayers.forEach((player) => {
      proPlayerMapping[player.text] = player.value;
    });
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      <div>
        <ExplorerFormField label={strings.explorer_select} dataSource={fields.select} builderField="select" builderContext={this} />
        <ExplorerFormField label={strings.explorer_group_by} dataSource={fields.group} builderField="group" builderContext={this} />
        <ExplorerFormField label={strings.explorer_hero} dataSource={fields.hero} builderField="hero" builderContext={this} />
        <ExplorerFormField label={strings.explorer_patch} dataSource={fields.patch} builderField="patch" builderContext={this} />
        <ExplorerFormField label={strings.explorer_player} dataSource={proPlayers} builderField="player" builderContext={this} />
        <ExplorerFormField label={strings.explorer_league} dataSource={leagues} builderField="league" builderContext={this} />
        <ExplorerFormField
          label={strings.explorer_player_purchased}
          dataSource={fields.playerPurchased}
          builderField="playerPurchased"
          builderContext={this}
        />
        <ExplorerFormField label={strings.explorer_duration} dataSource={fields.duration} builderField="duration" builderContext={this} />
      </div>
      <div>
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
                return transformations.hero_id(row, col, field);
              } else if (column.name === 'winrate') {
                return (field >= 0 && field <= 1 ? <TablePercent
                  val={Number((field * 100).toFixed(2))}
                /> : null);
              } else if (column.name === 'rune_id') {
                return strings[`rune_${field}`];
              } else if (column.name === 'item_name') {
                return itemData[field] ? itemData[field].dname : field;
              } else if (column.name === 'playername') {
                return <Link to={`/players/${proPlayerMapping[field]}`}>{field}</Link>;
              } else if (column.name === 'time') {
                return formatSeconds(field);
              }
              return typeof field === 'string' ? field : JSON.stringify(field);
            },
            sortFn: row => (isNaN(Number(row[column.name])) ? row[column.name] : Number(row[column.name])),
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
