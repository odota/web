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
  getTeams,
}
from 'actions';
import {
  TablePercent,
  inflictorWithValue,
}
from 'components/Visualizations';
import util from 'util';
import querystring from 'querystring';
import queryTemplate from './queryTemplate';
import ExplorerFormField from './ExplorerFormField';
import styles from './Explorer.css';

function jsonResponse(response) {
  return response.json();
}
function getItemSuffix(itemKey) {
  return ['_2', '_3', '_4', '_5'].some(suffix => itemKey.indexOf(suffix) !== -1) ? itemKey[itemKey.length - 1] : '';
}
// TODO omnibox search
// TODO mega creep wins
// TODO bans
// TODO hero combos
// TODO lane positions
// TODO num wards placed?
// TODO num roshans killed?
// TODO num matches played by team?
// TODO item build rates?
// TODO graphing buttons (pie, timeseries, bar)
// TODO group by + time data should be formatted
// TODO filter out team 2889074 (not really navi)
// TODO AEGIS_STOLEN, AEGIS, DENIED_AEGIS, FIRSTBLOOD, PAUSED (requires player1_slot fix)
// TODO scan/glyph action (use action rather than CHAT_MESSAGE_SCAN/CHAT_MESSAGE_GLYPH_USED)
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
  key: `timing_${itemKey}`,
});
const killSelect = ({
  text,
  unitKey,
}) => ({
  text: `${strings.explorer_kill} - ${text}`,
  value: 'match_logs.time',
  order: 'ASC',
  join: `JOIN match_logs 
ON match_logs.match_id = matches.match_id 
AND player_matches.player_slot = match_logs.sourcename_slot 
AND match_logs.type = 'DOTA_COMBATLOG_DEATH'
AND match_logs.targetname LIKE '${unitKey}'`,
  key: `kill_${unitKey}`,
});
const fields = {
  select: [{
    text: strings.heading_kills,
    value: 'kills',
    key: 'kills',
  }, {
    text: strings.heading_deaths,
    value: 'deaths',
    key: 'deaths',
  }, {
    text: strings.heading_assists,
    value: 'assists',
    key: 'assists',
  }, {
    text: strings.heading_gold_per_min,
    value: 'gold_per_min',
    key: 'gold_per_min',
  }, {
    text: strings.heading_xp_per_min,
    value: 'xp_per_min',
    key: 'xp_per_min',
  }, {
    text: strings.heading_last_hits,
    value: 'last_hits',
    key: 'last_hits',
  }, {
    text: strings.heading_denies,
    value: 'denies',
    key: 'denies',
  }, {
    text: strings.heading_hero_damage,
    value: 'hero_damage',
    key: 'hero_damage',
  }, {
    text: strings.heading_tower_damage,
    value: 'tower_damage',
    key: 'tower_damage',
  }, {
    text: strings.heading_hero_healing,
    value: 'hero_healing',
    key: 'hero_healing',
  }, {
    text: strings.heading_level,
    value: 'level',
    key: 'level',
  }, {
    text: strings.heading_stuns,
    value: 'stuns',
    key: 'stuns',
  }, {
    text: strings.heading_camps_stacked,
    value: 'camps_stacked',
    key: 'camps_stacked',
  }, {
    text: strings.heading_lhten,
    value: 'lh_t[10]',
    key: 'lh10',
  }, {
    text: strings.heading_lhtwenty,
    value: 'lh_t[20]',
    key: 'lh20',
  }, {
    text: strings.heading_lhthirty,
    value: 'lh_t[30]',
    key: 'lh30',
  }, {
    text: strings.heading_lhforty,
    value: 'lh_t[40]',
    key: 'lh40',
  }, {
    text: strings.heading_lhfifty,
    value: 'lh_t[50]',
    key: 'lh50',
  }, {
    text: strings.heading_duration,
    value: 'duration',
    alias: 'as time',
    key: 'duration',
  }, { ...jsonSelect,
    text: strings.heading_item_purchased,
    alias: 'item_name',
    join: ', json_each(player_matches.purchase)',
    key: 'item_purchased',
  }, { ...jsonSelect,
    text: strings.heading_ability_used,
    alias: 'ability_name',
    join: ', json_each(player_matches.ability_uses)',
    key: 'ability_used',
  }, { ...jsonSelect,
    text: strings.heading_item_used,
    alias: 'item_name',
    join: ', json_each(player_matches.item_uses)',
    key: 'item_used',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor,
    alias: 'inflictor',
    join: ', json_each(player_matches.damage_inflictor)',
    key: 'damage_inflictor',
  }, { ...jsonSelect,
    text: strings.heading_damage_inflictor_received,
    alias: 'inflictor',
    join: ', json_each(player_matches.damage_inflictor_received)',
    key: 'damage_inflictor_received',
  }, { ...jsonSelect,
    text: strings.heading_runes,
    alias: 'rune_id',
    join: ', json_each(player_matches.runes)',
    key: 'runes',
  }, { ...jsonSelect,
    text: strings.heading_unit_kills,
    join: ', json_each(player_matches.killed)',
    key: 'unit_kills',
  }, { ...jsonSelect,
    text: strings.heading_damage_instances,
    join: ', json_each(player_matches.hero_hits)',
    key: 'damage_instances',
  }, killSelect({
    text: strings.heading_courier,
    unitKey: 'npc_dota_courier',
  }),
    killSelect({
      text: strings.heading_roshan,
      unitLey: 'npc_dota_roshan',
    }),
    killSelect({
      text: strings.heading_tower,
      unitKey: '%tower%',
    }),
    killSelect({
      text: strings.heading_barracks,
      unitKey: '%rax%',
    }),
    killSelect({
      text: strings.heading_shrine,
      unitKey: '%healers%',
    }),
  {
    text: strings.th_buybacks,
    value: 'json_array_length(array_to_json(buyback_log))',
    alias: 'buybacks',
    key: 'buybacks',
  },
  {
    text: strings.explorer_hero_combos,
    value: 1,
    groupValue: 1,
    groupKeySelect: 'player_matches.hero_id, player_matches2.hero_id hero_id2',
    groupKey: 'player_matches.hero_id, player_matches2.hero_id',
    join: `JOIN player_matches player_matches2
ON player_matches.match_id = player_matches2.match_id
AND player_matches.hero_id != player_matches2.hero_id 
AND abs(player_matches.player_slot - player_matches2.player_slot) < 10`,
    key: 'hero_combos',
  },
  ]
    .concat(Object.keys(itemData).filter(itemKey => itemData[itemKey].cost > 2000).map(timingSelect)),
  group: [{
    text: strings.explorer_player,
    value: 'notable_players.account_id',
    key: 'player',
  }, {
    text: strings.th_hero_id,
    value: 'player_matches.hero_id',
    key: 'hero',
  }, {
    text: strings.explorer_league,
    value: 'leagues.name',
    alias: 'leaguename',
    key: 'league',
  }, {
    text: strings.explorer_patch,
    value: 'patch',
    key: 'patch',
  }, {
    text: strings.heading_duration,
    value: 'duration/300*5',
    alias: 'minutes',
    key: 'duration',
  }, {
    text: strings.explorer_side,
    value: '(player_matches.player_slot < 128)',
    alias: 'is_radiant',
    key: 'side',
  }, {
    text: strings.th_result,
    value: '((player_matches.player_slot < 128) = matches.radiant_win)',
    alias: 'win',
    key: 'result',
  }, {
    text: strings.explorer_team,
    value: 'teams.name',
    key: 'team',
  },
  ],
  patch: patchData.reverse().map(patch => ({
    text: patch.name,
    value: patch.name,
    key: patch.name,
  })),
  hero: Object.keys(heroData).map(heroId => ({
    text: heroData[heroId].localized_name,
    value: heroData[heroId].id,
    key: String(heroData[heroId].id),
  })),
  playerPurchased: Object.keys(itemData).map(itemName => ({
    text: itemData[itemName].dname,
    value: itemName,
    key: itemName,
  })),
  duration: [10, 20, 30, 40, 50].map(duration => ({
    text: `> ${util.format(strings.time_mm, duration)}`,
    value: duration * 60,
    key: String(duration),
  })),
  side: [{ text: strings.general_radiant, value: true, key: 'radiant' }, { text: strings.general_dire, value: false, key: 'dire' }],
  result: [{ text: strings.td_win, value: true, key: 'win' }, { text: strings.td_loss, value: false, key: 'loss' }],
  /*
  lanePos: Object.keys(strings).filter(str => str.indexOf('lane_pos_') === 0).map(str => {
    const lanePosId = Number(str.substring('lane_pos_'.length));
    return { text: strings[str], value: lanePosId, key: lanePosId };
  }),
  */
};

class Explorer extends React.Component {
  constructor() {
    super();
    let savedBuilderState = {};
    const savedSqlState = '';
    try {
      savedBuilderState = querystring.parse(window.location.search.substring(1));
      /*
      savedSqlState = urlState.sql;
      if (urlState.builder) {
        savedBuilderState = JSON.parse(urlState.builder);
      }
      */
    } catch (e) {
      console.error(e);
    }
    this.state = {
      loadingEditor: true,
      showEditor: Boolean(savedSqlState),
      querying: false,
      result: {},
      builder: savedBuilderState,
    };
    this.instantiateEditor = this.instantiateEditor.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.getQueryString = this.getQueryString.bind(this);
    this.handleJson = this.handleJson.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
  }
  componentDidMount() {
    this.props.dispatchProPlayers();
    this.props.dispatchLeagues();
    this.props.dispatchTeams();
    getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js', this.instantiateEditor);
  }
  getQueryString() {
    const sql = encodeURIComponent(this.editor.getSelectedText() || this.editor.getValue());
    return `?sql=${sql}`;
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
    } else if (Object.keys(this.state.builder).length) {
      this.buildQuery();
      this.handleQuery();
    } else {
      editor.setValue('select count(*) from matches;');
    }
    this.setState({ ...this.state,
      loadingEditor: false,
    });
  }
  toggleEditor() {
    this.setState({ ...this.state, showEditor: !this.state.showEditor });
    this.editor.renderer.updateFull();
  }
  handleQuery() {
    if (this.state.loadingEditor === true) {
      return setTimeout(this.handleQuery, 1000);
    }
    this.setState({ ...this.state,
      querying: true,
    });
    const queryString = this.getQueryString();
    // Only serialize the builder state to window history
    window.history.pushState('', '', this.state.showEditor ? queryString : `?${querystring.stringify(this.state.builder)}`);
    return fetch(`${API_HOST}/api/explorer${queryString}`).then(jsonResponse).then(this.handleResponse);
  }
  handleJson() {
    window.open(`${API_HOST}/api/explorer${this.getQueryString()}`, '_blank');
  }
  handleResponse(json) {
    this.setState({ ...this.state,
      querying: false,
      open: false,
      result: json,
    });
  }
  buildQuery() {
    const expandedBuilder = {};
    Object.keys(this.state.builder).forEach((key) => {
      if (this.state.builder[key]) {
        expandedBuilder[key] = fields[key]
        ? fields[key].find(element => element.key === this.state.builder[key])
        : { value: this.state.builder[key] };
      }
    });
    console.log(this.state.builder, expandedBuilder);
    this.editor.setValue(queryTemplate(expandedBuilder));
  }
  render() {
    const proPlayers = this.props.proPlayers.map(player => ({
      text: player.name,
      value: player.account_id,
      key: String(player.account_id),
    }));
    const leagues = this.props.leagues.map(league => ({
      text: league.name,
      value: league.leagueid,
      key: String(league.leagueid),
    }));
    const teams = this.props.teams.map(team => ({
      text: team.name,
      value: team.team_id,
      key: String(team.team_id),
    }));
    const proPlayerMapping = {};
    proPlayers.forEach((player) => {
      proPlayerMapping[player.value] = player.text;
    });
    const teamMapping = {};
    teams.forEach((team) => {
      teamMapping[team.value] = team.text;
    });
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      <div className={styles.formGroup}>
        <ExplorerFormField label={strings.explorer_select} dataSource={fields.select} builderField="select" builderContext={this} />
        <ExplorerFormField label={strings.explorer_group_by} dataSource={fields.group} builderField="group" builderContext={this} />
        <ExplorerFormField label={strings.explorer_hero} dataSource={fields.hero} builderField="hero" builderContext={this} />
        <ExplorerFormField label={strings.explorer_player} dataSource={proPlayers} builderField="player" builderContext={this} />
        <ExplorerFormField label={strings.explorer_league} dataSource={leagues} builderField="league" builderContext={this} />
        <ExplorerFormField label={strings.explorer_patch} dataSource={fields.patch} builderField="patch" builderContext={this} />
        <ExplorerFormField
          label={strings.explorer_player_purchased}
          dataSource={fields.playerPurchased}
          builderField="playerPurchased"
          builderContext={this}
        />
        <ExplorerFormField label={strings.explorer_duration} dataSource={fields.duration} builderField="duration" builderContext={this} />
        <ExplorerFormField label={strings.explorer_side} dataSource={fields.side} builderField="side" builderContext={this} />
        <ExplorerFormField label={strings.th_result} dataSource={fields.result} builderField="result" builderContext={this} />
        <ExplorerFormField label={strings.explorer_team} dataSource={teams} builderField="team" builderContext={this} />
        <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" builderContext={this} isDateField />
        <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" builderContext={this} isDateField />
        {/* <ExplorerFormField label={strings.explorer_lane_pos} dataSource={fields.lanePos} builderField="lanePos" builderContext={this} />*/}
      </div>
      <div style={{ display: this.state.showEditor ? 'block' : 'none' }}>
        {this.state.loadingEditor && <Spinner />}
        <div
          id={'editor'}
          style={{
            height: 100,
            width: '100%',
          }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_query_button}
          onClick={this.handleQuery}
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_json_button}
          onClick={this.handleJson}
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_toggle_sql}
          onClick={this.toggleEditor}
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
          })).map(column => ({
            ...column,
            displayFn: (row, col, field) => {
              if (column.field === 'match_id') {
                return <Link to={`/matches/${field}`}>{field}</Link>;
              } else if (column.field.indexOf('hero_id') === 0) {
                return transformations.hero_id(row, col, field);
              } else if (column.field.indexOf('account_id') === 0) {
                return <Link to={`/players/${field}`}>{proPlayerMapping[field] || field}</Link>;
              } else if (column.field === 'winrate') {
                return (field >= 0 && field <= 1 ? <TablePercent
                  val={Number((field * 100).toFixed(2))}
                /> : null);
              } else if (column.field === 'rune_id') {
                return strings[`rune_${field}`];
              } else if (column.field === 'item_name') {
                return itemData[field] ? itemData[field].dname : field;
              } else if (column.field === 'team_id') {
                return teamMapping[field] || field;
              } else if (column.field === 'time') {
                return formatSeconds(field);
              } else if (column.field === 'inflictor') {
                return <span>{inflictorWithValue(field)} {field}</span>;
              } else if (column.field === 'win') {
                return <span className={field ? styles.textSuccess : styles.textDanger}>{field ? strings.td_win : strings.td_loss}</span>;
              }
              return typeof field === 'string' ? field : JSON.stringify(field);
            },
            sortFn: row => (isNaN(Number(row[column.field])) ? row[column.field] : Number(row[column.field])),
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
  teams: state.app.teams.list,
});

const mapDispatchToProps = dispatch => ({
  dispatchProPlayers: () => dispatch(getProPlayers()),
  dispatchLeagues: () => dispatch(getLeagues()),
  dispatchTeams: () => dispatch(getTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
