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
import AutoComplete from 'material-ui/AutoComplete';
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
import c3 from 'c3';
import queryTemplate from './queryTemplate';
import ExplorerFormField from './ExplorerFormField';
import fields from './fields';
import autocomplete from './autocomplete';
import styles from './Explorer.css';

// TODO mega creep wins (matches table only)
// TODO bans (picks_bans table)
// TODO num matches played by team (team_match table)
// TODO hero combos (more than 2)
// TODO lane positions
// TODO num wards placed?
// TODO num roshans killed?
// TODO item build rates?
// TODO AEGIS_STOLEN, AEGIS, DENIED_AEGIS, FIRSTBLOOD, PAUSED (requires player1_slot fix)
// TODO scan/glyph action (use action rather than CHAT_MESSAGE_SCAN/CHAT_MESSAGE_GLYPH_USED)
// TODO autostat (combine with GetLiveLeagueGames)

function jsonResponse(response) {
  return response.json();
}

function expandBuilderState(builder, fields) {
  const expandedBuilder = {};
  Object.keys(builder).forEach((key) => {
    if (builder[key]) {
      expandedBuilder[key] = fields[key]
        ? fields[key].find(element => element.key === builder[key])
        : { value: builder[key] };
    }
  });
  return expandedBuilder;
}

function redrawGraphs(rows, fields) {
  setTimeout(() => {
    const firstCol = fields[0].name;
    c3.generate({
      bindto: '#donut',
      data: {
        type: 'donut',
        columns: rows.map(row => [row[firstCol], row.sum]),
      },
      donut: {
        title: strings.th_sum,
      },
    });
    rows.sort((a, b) => b.avg - a.avg);
    c3.generate({
      bindto: '#bar',
      data: {
        type: 'bar',
        columns: [
          [strings.th_average].concat(rows.map(row => row.avg)),
          [strings.th_sum].concat(rows.map(row => row.sum)),
        ],
      },
      axis: {
        x: {
          type: 'category',
          categories: rows.map(row => row[firstCol]),
        },
      },
    });
    rows.sort((a, b) => a[firstCol] - b[firstCol]);
    c3.generate({
      bindto: '#timeseries',
      data: {
        type: 'spline',
        columns: [
          [firstCol].concat(rows.map(row => row.avg)),
        ],
      },
      axis: {
        x: {
          type: 'category',
          categories: rows.map(row => row[firstCol]),
        },
      },
    });
  }, 100);
}

function drawOutput({ rows, fields, expandedBuilder, teamMapping, playerMapping, format }) {
  // TODO resolve ids to strings
  // TODO axis labels
  // TODO don't redraw graphs unless a new query is made
  redrawGraphs(JSON.parse(JSON.stringify(rows || [])), fields);
  if (format === 'donut') {
    return <div id="donut" />;
  } else if (format === 'bar') {
    return <div id="bar" />;
  } else if (format === 'timeseries') {
    return <div id="timeseries" />;
  }
  return (
    <Table
      data={rows || []}
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
          }
          return typeof field === 'string' ? field : JSON.stringify(field);
        },
        sortFn: row => (isNaN(Number(row[column.field])) ? row[column.field] : Number(row[column.field])),
      }))}
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
      getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-language_tools.js', () => {
        fetch(`${API_HOST}/api/schema`).then(jsonResponse).then(this.instantiateEditor);
      });
    });
  }
  getSqlString() {
    return this.editor.getSelectedText() || this.editor.getValue();
  }
  instantiateEditor(schema) {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 10,
      maxLines: Infinity,
      enableLiveAutocompletion: true,
    });
    editor.completers = [autocomplete(schema)];
    this.editor = editor;
    const sql = this.props && this.props.location && this.props.location.query && this.props.location.query.sql;
    if (sql) {
      editor.setValue(decodeURIComponent(sql));
      this.handleQuery();
    } else {
      this.buildQuery();
      this.handleQuery();
    }
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
    // This is ok if we only need the value prop.
    const expandedBuilder = expandBuilderState(this.state.builder, fields);
    // console.log(this.state.builder, expandedBuilder);
    this.editor.setValue(queryTemplate(expandedBuilder));
  }
  render() {
    const specials = {
      84772440: 'iceiceice',
    };
    const player = this.props.proPlayers.map(player => ({
      text: specials[player.account_id] || player.name,
      value: player.account_id,
      key: String(player.account_id),
    }));
    const league = this.props.leagues.map(league => ({
      text: league.name,
      value: league.leagueid,
      key: String(league.leagueid),
    }));
    const team = this.props.teams.map(team => ({
      text: team.name,
      value: team.team_id,
      key: String(team.team_id),
    }));
    const playerMapping = {};
    player.forEach((player) => {
      playerMapping[player.value] = player.text;
    });
    const teamMapping = {};
    team.forEach((team) => {
      teamMapping[team.value] = team.text;
    });
    const expandedFields = { ...fields, player, league, team };
    const expandedBuilder = expandBuilderState(this.state.builder, expandedFields);
    return (<div>
      <Helmet title={strings.title_explorer} />
      <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
      {<TextField
        style={{ display: 'none' }} floatingLabelText="Omnibox" onChange={(event, value) => {
          console.log(value, expandedFields);
        // Fuzzy match against all inputs
        // TODO tokenize the input string by space
        // TODO order the keys for precedence
        // TODO set min threshold on fuzziness (levenshtein)
          Object.keys(expandedFields).some((key) => {
            const match = expandedFields[key].find(element => AutoComplete.fuzzyFilter(value, element.text));
          // Apply state update with match
            this.setState({ ...this.state, builder: { ...this.state.builder, [key]: match.key } });
            return Boolean(match);
          });
        }}
      />}
      <div className={styles.formGroup}>
        <ExplorerFormField label={strings.explorer_select} fields={expandedFields} builderField="select" builderContext={this} />
        <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" builderContext={this} />
        <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" builderContext={this} />
        <ExplorerFormField label={strings.explorer_player} fields={expandedFields} builderField="player" builderContext={this} />
        <ExplorerFormField label={strings.explorer_league} fields={expandedFields} builderField="league" builderContext={this} />
        <ExplorerFormField label={strings.explorer_patch} fields={expandedFields} builderField="patch" builderContext={this} />
        <ExplorerFormField
          label={strings.explorer_player_purchased}
          fields={expandedFields}
          builderField="playerPurchased"
          builderContext={this}
        />
        <ExplorerFormField label={strings.explorer_duration} fields={expandedFields} builderField="duration" builderContext={this} />
        <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" builderContext={this} />
        <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" builderContext={this} />
        <ExplorerFormField label={strings.explorer_team} fields={expandedFields} builderField="team" builderContext={this} />
        {/* <ExplorerFormField label={strings.explorer_lane_pos} fields={expandedFields} builderField="lanePos" builderContext={this} />*/}
        <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" builderContext={this} isDateField />
        <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" builderContext={this} isDateField />
        <span style={{ width: '180px', marginTop: '20px' }}>
          <Toggle
            label={strings.explorer_toggle_sql}
            onToggle={this.toggleEditor}
          />
        </span>
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
      <RaisedButton
        primary
        style={{ margin: '5px' }}
        label={strings.explorer_query_button}
        onClick={this.handleQuery}
      />
      <span style={{ float: 'right' }}>
        <RaisedButton
          secondary={this.state.builder.format === 'table'}
          style={{ margin: '5px' }}
          label={strings.explorer_table_button}
          onClick={() => {
            this.setState({ ...this.state, builder: { ...this.state.builder, format: 'table' } }, this.syncWindowHistory);
          }}
        />
        <RaisedButton
          secondary={this.state.builder.format === 'donut'}
          style={{ margin: '5px' }}
          label={strings.explorer_donut_button}
          onClick={() => {
            this.setState({ ...this.state, builder: { ...this.state.builder, format: 'donut' } }, this.syncWindowHistory);
          }}
        />
        <RaisedButton
          secondary={this.state.builder.format === 'bar'}
          style={{ margin: '5px' }}
          label={strings.explorer_bar_button}
          onClick={() => {
            this.setState({ ...this.state, builder: { ...this.state.builder, format: 'bar' } }, this.syncWindowHistory);
          }}
        />
        <RaisedButton
          secondary={this.state.builder.format === 'timeseries'}
          style={{ margin: '5px' }}
          label={strings.explorer_timeseries_button}
          onClick={() => {
            this.setState({ ...this.state, builder: { ...this.state.builder, format: 'timeseries' } }, this.syncWindowHistory);
          }}
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_csv_button}
          href={`data:application/octet-stream,${encodeURIComponent(json2csv({
            data: this.state.result.rows || [],
            fields: (this.state.result.fields || []).map(field => field.name),
          }))}`}
          download="data.csv"
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_json_button}
          href={`data:application/octet-stream,${encodeURIComponent(JSON.stringify(this.state.result.rows, null, 2))}`}
          download="data.json"
        />
        <RaisedButton
          style={{ margin: '5px' }}
          label={strings.explorer_api_button}
          onClick={() => window.open(`${API_HOST}/api/explorer?sql=${encodeURIComponent(this.getSqlString())}`, '_blank')}
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
