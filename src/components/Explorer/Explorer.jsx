/* global window ace API_HOST */
import React from 'react';
import {
  connect,
}
from 'react-redux';
import fetch from 'isomorphic-fetch';
import Spinner from 'components/Spinner';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
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
import { IconRadiant, IconDire } from 'components/Icons';
import matchStyles from 'components/Match/Match.css';
import querystring from 'querystring';
import json2csv from 'json2csv';
import heroes from 'dotaconstants/build/heroes.json';
import debounce from 'lodash.debounce';
import queryTemplate from './queryTemplate';
import ExplorerFormField from './ExplorerFormField';
import ExplorerOutputButton from './ExplorerOutputButton';
import fields from './fields';
import autocomplete from './autocomplete';
import redrawGraphs from './redrawGraphs';
import editDistance from './editDistance';
import styles from './Explorer.css';

// TODO split picks/bans by phase
// TODO mega creep wins (matches table only)
// TODO num matches played by team (team_match table)
// TODO hero combos (3+)
// TODO lane positions/lane roles
// TODO num wards placed?
// TODO num roshans killed?
// TODO item build rates?
// TODO AEGIS_STOLEN, AEGIS, DENIED_AEGIS, FIRSTBLOOD, PAUSED (requires player1_slot fix)
// TODO scan/glyph action (use action rather than CHAT_MESSAGE_SCAN/CHAT_MESSAGE_GLYPH_USED)
// TODO autostat (combine with GetLiveLeagueGames)

const playerMapping = {};
const teamMapping = {};
let currRows = null;
let currFormat = null;

function jsonResponse(response) {
  return response.json();
}

function expandBuilderState(builder, fields) {
  const expandedBuilder = {};
  Object.keys(builder).forEach((key) => {
    if (builder[key]) {
      expandedBuilder[key] = (fields[key] || []).find(element => element.key === builder[key]) || { value: builder[key] };
    }
  });
  return expandedBuilder;
}

function resolveId(key, value, mappings) {
  if (key === 'hero_id') {
    return (heroes[value] || {}).localized_name;
  } else if (key === 'account_id') {
    return mappings.playerMapping[value];
  } else if (key === 'team_id') {
    return mappings.teamMapping[value];
  }
  return value;
}

function drawOutput({ rows, fields, expandedBuilder, teamMapping, playerMapping, format }) {
  setTimeout(() => {
    if ((currRows !== rows || currFormat !== format) && fields) {
      const firstCol = fields[0].name;
      redrawGraphs(rows.map(row => ({
        ...row,
        [firstCol]: resolveId(firstCol, row[firstCol], { teamMapping, playerMapping }) }
      )), firstCol, (expandedBuilder.select && expandedBuilder.select.key) || strings.th_count);
      currRows = rows;
      currFormat = format;
    }
  }, 100);
  if (format === 'donut') {
    return <div id="donut" />;
  } else if (format === 'bar') {
    return <div id="bar" />;
  } else if (format === 'timeseries') {
    return <div id="timeseries" />;
  }
  return (
    <Table
      data={(rows || []).slice(0, 1000)}
      columns={(fields || []).map(column => ({
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
            return <Link to={`/players/${field}`}>{playerMapping[field] || field}</Link>;
          } else if (column.field === 'winrate') {
            return (field >= 0 && field <= 1 ? <TablePercent
              percent={Number((field * 100).toFixed(2))}
            /> : null);
          } else if (column.field === 'adj_winrate') {
          /*
          const phat = field;
          const z = 1.96;
          const n = row.count;
          return ((phat + z * z / (2 * n) - z * Math.sqrt((phat * (1 - phat) + z * z / (4 * n)) / n)) / (1 + z * z / n)).toFixed(2);
          */
            return field;
          } else if (column.field === 'rune_id') {
            return strings[`rune_${field}`];
          } else if (column.field === 'item_name') {
            return itemData[field] ? itemData[field].dname : field;
          } else if (column.field === 'team_id') {
            return teamMapping[field] || field;
          } else if (column.field === 'time' || (column.field === 'avg' && expandedBuilder.select && expandedBuilder.select.formatSeconds)) {
            return formatSeconds(field);
          } else if (column.field === 'inflictor') {
            return <span>{inflictorWithValue(field)} {field}</span>;
          } else if (column.field === 'win') {
            return <span className={field ? styles.textSuccess : styles.textDanger}>{field ? strings.td_win : strings.td_loss}</span>;
          } else if (column.field === 'is_radiant') {
            return field
            ? <span className={matchStyles.teamIconContainer}><IconRadiant className={matchStyles.iconRadiant} />{strings.general_radiant}</span>
            : <span className={matchStyles.teamIconContainer}><IconDire className={matchStyles.iconDire} />{strings.general_dire}</span>;
          } else if (column.field === 'start_time') {
            return (new Date(field * 1000)).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
          }
          return typeof field === 'string' ? field : JSON.stringify(field);
        },
        sortFn: row => (isNaN(Number(row[column.field])) ? row[column.field] : Number(row[column.field])),
      }))}
    />);
}

function drawOmnibox(context, expandedFields) {
  return (<TextField
    style={{ display: 'none' }}
    floatingLabelText="Omnibox"
    onChange={debounce((event, value) => {
      // Sample input 'dendi antimage'
      // Iterate over the fields and phrase tokens
      // Keep track of the best match for each field + token
      // TODO handle multi-word phrases like 'evil geniuses', 'gold per min'
      const result = [];
      Object.keys(expandedFields).forEach((field) => {
        value.split(' ').forEach((token) => {
          const distances = expandedFields[field].map(element => ({
            field,
            token,
            searchText: element.searchText,
            key: element.key,
            editDistance: editDistance(token.toLowerCase(), (element.searchText || element.text).toLowerCase()),
          }));
          distances.sort((a, b) => a.editDistance - b.editDistance);
          const bestMatch = distances[0];
          result.push(bestMatch);
        });
      });
      // TODO order by field keys for precedence (e.g. hero should match before player, use as tiebreak for equal distance)
      result.sort((a, b) => a.editDistance - b.editDistance);
      // For each field, pick the best token. A token can't be used more than once.
      // Minimizing the total is N*M time where N is the number of fields and M is the number of words
      // Apply state update with best fit (matchedBuilder)
      console.log(result);
      const alreadyUsedTokens = {};
      const alreadyUsedFields = {};
      const matchedBuilder = {};
      Object.keys(expandedFields).forEach(() => {
        for (let i = 0; i < result.length; i += 1) {
          const element = result[i];
          if (!alreadyUsedTokens[element.token] && !alreadyUsedFields[element.field]) {
            matchedBuilder[element.field] = element.key;
            alreadyUsedTokens[element.token] = true;
            alreadyUsedFields[element.field] = true;
            break;
          }
        }
      });
      console.log(matchedBuilder);
      context.setState({ ...context.state, builder: { ...matchedBuilder } });
    }, 1000)}
  />);
}

class Explorer extends React.Component {
  constructor() {
    super();
    let urlState = {};
    let sqlState = '';
    try {
      urlState = querystring.parse(window.location.search.substring(1));
      sqlState = urlState.sql;
      delete urlState.sql;
    } catch (e) {
      console.error(e);
    }
    this.state = {
      loadingEditor: true,
      showEditor: Boolean(sqlState),
      querying: false,
      result: {},
      builder: urlState,
    };
    this.instantiateEditor = this.instantiateEditor.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.handleResponse = this.handleResponse.bind(this);
    this.getSqlString = this.getSqlString.bind(this);
    this.buildQuery = this.buildQuery.bind(this);
    this.syncWindowHistory = this.syncWindowHistory.bind(this);
  }
  componentDidMount() {
    this.props.dispatchProPlayers();
    this.props.dispatchLeagues();
    this.props.dispatchTeams();
    getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js', () => {
      getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-language_tools.js', this.instantiateEditor);
    });
  }
  getSqlString() {
    return this.editor.getSelectedText() || this.editor.getValue();
  }
  instantiateEditor() {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 10,
      maxLines: Infinity,
      enableLiveAutocompletion: true,
    });
    fetch(`${API_HOST}/api/schema`).then(jsonResponse).then((schema) => {
      editor.completers = [autocomplete(schema)];
    });
    this.editor = editor;
    const sql = this.props && this.props.location && this.props.location.query && this.props.location.query.sql;
    if (sql) {
      editor.setValue(decodeURIComponent(sql));
    } else {
      this.buildQuery();
    }
    this.handleQuery();
    this.setState({ ...this.state,
      loadingEditor: false,
    });
  }
  toggleEditor() {
    this.setState({ ...this.state, showEditor: !this.state.showEditor });
    this.editor.renderer.updateFull();
  }
  syncWindowHistory() {
    const sqlString = this.getSqlString();
    const objectToSerialize = this.state.showEditor ? { sql: sqlString, format: this.state.builder.format } : this.state.builder;
    const stringToSerialize = `?${querystring.stringify(objectToSerialize)}`;
    window.history.pushState('', '', stringToSerialize);
  }
  handleQuery() {
    if (this.state.loadingEditor === true) {
      return setTimeout(this.handleQuery, 1000);
    }
    this.setState({ ...this.state,
      querying: true,
    });
    this.syncWindowHistory();
    const sqlString = this.getSqlString();
    return fetch(`${API_HOST}/api/explorer?sql=${encodeURIComponent(sqlString)}`).then(jsonResponse).then(this.handleResponse);
  }
  handleResponse(json) {
    this.setState({ ...this.state,
      querying: false,
      result: json,
    });
  }
  buildQuery() {
    // Note that this will not get expanded data for API-dependent fields (player/league/team)
    // This is ok if we only need the value prop (e.g. an id to build the query with)
    const expandedBuilder = expandBuilderState(this.state.builder, fields());
    this.editor.setValue(queryTemplate(expandedBuilder));
  }
  render() {
    if (!Object.keys(playerMapping).length) {
      this.props.proPlayers.forEach((player) => {
        playerMapping[player.account_id] = player.name;
      });
    }
    if (!Object.keys(teamMapping).length) {
      this.props.teams.forEach((team) => {
        teamMapping[team.team_id] = team.name;
      });
    }
    const expandedFields = fields(this.props.proPlayers, this.props.leagues, this.props.teams);
    const expandedBuilder = expandBuilderState(this.state.builder, expandedFields);
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      <div style={{ width: '180px', margin: '10px' }}>
        <div>{drawOmnibox(this, expandedFields)}</div>
        <Toggle
          label={strings.explorer_toggle_sql}
          defaultToggled={this.state.showEditor}
          onToggle={this.toggleEditor}
        />
      </div>
      <div style={{ display: this.state.showEditor ? 'none' : 'flex' }} className={styles.formGroup}>
        <ExplorerFormField label={strings.explorer_select} fields={expandedFields} builderField="select" context={this} />
        <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" context={this} />
        <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" context={this} />
        <ExplorerFormField label={strings.explorer_player} fields={expandedFields} builderField="player" context={this} />
        <ExplorerFormField label={strings.explorer_team} fields={expandedFields} builderField="team" context={this} />
        <ExplorerFormField label={strings.explorer_league} fields={expandedFields} builderField="league" context={this} />
        <ExplorerFormField label={strings.explorer_region} fields={expandedFields} builderField="region" context={this} />
        <ExplorerFormField label={strings.explorer_patch} fields={expandedFields} builderField="patch" context={this} />
        <ExplorerFormField label={strings.explorer_duration} fields={expandedFields} builderField="duration" context={this} />
        <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" context={this} />
        <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" context={this} />
        <ExplorerFormField
          label={strings.explorer_player_purchased}
          fields={expandedFields}
          builderField="playerPurchased"
          context={this}
        />
        {/* <ExplorerFormField label={strings.explorer_lane_pos} fields={expandedFields} builderField="lanePos" context={this} />*/}
        <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" context={this} isDateField />
        <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" context={this} isDateField />
      </div>
      <div style={{ display: this.state.showEditor ? 'block' : 'none' }}>
        <div
          id={'editor'}
          style={{
            height: 100,
            width: '100%',
          }}
        />
      </div>
      <RaisedButton
        primary
        style={{ margin: '5px' }}
        label={strings.explorer_query_button}
        onClick={this.handleQuery}
      />
      <span style={{ float: 'right' }}>
        <ExplorerOutputButton defaultSelected label={strings.explorer_table_button} format="table" context={this} />
        <ExplorerOutputButton label={strings.explorer_donut_button} format="donut" context={this} />
        <ExplorerOutputButton label={strings.explorer_bar_button} format="bar" context={this} />
        <ExplorerOutputButton label={strings.explorer_timeseries_button} format="timeseries" context={this} />
        <ExplorerOutputButton
          label={strings.explorer_csv_button}
          href={`data:application/octet-stream,${encodeURIComponent(json2csv({
            data: this.state.result.rows || [],
            fields: (this.state.result.fields || []).map(field => field.name),
          }))}`}
          download="data.csv"
          context={this}
        />
        <ExplorerOutputButton
          label={strings.explorer_json_button}
          href={`data:application/octet-stream,${encodeURIComponent(JSON.stringify(this.state.result.rows, null, 2))}`}
          download="data.json"
          context={this}
        />
        <ExplorerOutputButton
          label={strings.explorer_api_button}
          onClick={() => window.open(`${API_HOST}/api/explorer?sql=${encodeURIComponent(this.getSqlString())}`, '_blank')}
          context={this}
        />
      </span>
      <Heading title={strings.explorer_results} subtitle={`${(this.state.result.rows || []).length} ${strings.explorer_num_rows}`} />
      <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
      {!this.state.querying ? drawOutput({
        rows: this.state.result.rows,
        fields: this.state.result.fields,
        expandedBuilder,
        playerMapping,
        teamMapping,
        format: this.state.builder.format,
      }) : <Spinner />}
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
