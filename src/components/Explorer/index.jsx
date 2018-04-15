/* global ace */
import React from 'react';
import PropTypes from 'prop-types';
import { connect }
  from 'react-redux';
import fetch from 'isomorphic-fetch';
import RaisedButton from 'material-ui/RaisedButton';
import Helmet from 'react-helmet';
import querystring from 'querystring';
import json2csv from 'json2csv';
import Spinner from '../Spinner';
import strings from '../../lang';
import { getScript } from '../../utility';
import Heading from '../Heading';
import {
  getProPlayers,
  getLeagues,
  getTeams,
}
  from '../../actions';
import queryTemplate from './queryTemplate';
import ExplorerOutputButton from './ExplorerOutputButton';
import ExplorerOutputSection from './ExplorerOutputSection';
import ExplorerControlSection from './ExplorerControlSection';
import ExplorerFormField from './ExplorerFormField';
import fields from './fields';
import autocomplete from './autocomplete';

const playerMapping = {};
const teamMapping = {};

function jsonResponse(response) {
  return response.json();
}

function expandBuilderState(builder, _fields) {
  const expandedBuilder = {};
  Object.keys(builder).forEach((key) => {
    if (builder[key]) {
      expandedBuilder[key] = (_fields[key] || []).find(element => element.key === builder[key]) || { value: builder[key] };
    }
  });
  return expandedBuilder;
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
      // console.error(e);
    }
    this.state = {
      loadingEditor: true,
      showEditor: Boolean(sqlState),
      loading: false,
      result: {},
      builder: urlState,
    };
  }
  componentDidMount() {
    this.props.dispatchProPlayers();
    this.props.dispatchLeagues();
    this.props.dispatchTeams();
    getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js', () => {
      getScript('https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ext-language_tools.js', this.instantiateEditor);
    });
  }

  getSqlString = () => this.editor.getSelectedText() || this.editor.getValue();

  buildQuery = () => {
    // Note that this will not get expanded data for API-dependent fields (player/league/team)
    // This is ok if we only need the value prop (e.g. an id to build the query with)
    const expandedBuilder = expandBuilderState(this.state.builder, fields());
    // TODO handle arrays
    this.editor.setValue(queryTemplate(expandedBuilder));
  };

  handleCancel = () => {
    this.setState({
      ...this.state,
      loading: false,
    });
    window.stop();
  };

  handleFieldUpdate = (builderField, value) => {
    this.setState({
      ...this.state,
      builder: {
        ...this.state.builder,
        [builderField]: value,
      },
    }, this.buildQuery);
  };

  handleQuery = () => {
    if (this.state.loadingEditor === true) {
      return setTimeout(this.handleQuery, 1000);
    }
    this.setState({
      ...this.state,
      loading: true,
    });
    this.syncWindowHistory();
    const sqlString = this.getSqlString();
    return fetch(`${process.env.REACT_APP_API_HOST}/api/explorer?sql=${encodeURIComponent(sqlString)}`).then(jsonResponse).then(this.handleResponse);
  };

  handleResponse = (json) => {
    this.setState({
      ...this.state,
      loading: false,
      result: json,
    });
  };

  instantiateEditor = () => {
    const editor = ace.edit('editor');
    editor.setTheme('ace/theme/monokai');
    editor.getSession().setMode('ace/mode/sql');
    editor.setShowPrintMargin(false);
    editor.setOptions({
      minLines: 10,
      maxLines: Infinity,
      enableLiveAutocompletion: true,
    });
    fetch(`${process.env.REACT_APP_API_HOST}/api/schema`).then(jsonResponse).then((schema) => {
      editor.completers = [autocomplete(schema)];
    });
    this.editor = editor;
    const { sql } = querystring.parse(window.location.search.substring(1));
    if (sql) {
      editor.setValue(decodeURIComponent(sql));
    } else {
      this.buildQuery();
    }
    this.handleQuery();
    this.setState({
      ...this.state,
      loadingEditor: false,
    });
  };

  syncWindowHistory = () => {
    const sqlString = this.getSqlString();
    const objectToSerialize = this.state.showEditor ? { sql: sqlString, format: this.state.builder.format } : this.state.builder;
    const stringToSerialize = `?${querystring.stringify(objectToSerialize)}`;
    window.history.pushState('', '', stringToSerialize);
  };

  toggleEditor = () => {
    this.setState({ ...this.state, showEditor: !this.state.showEditor });
    this.editor.renderer.updateFull();
  };

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
    const {
      handleQuery, handleCancel, getSqlString, handleFieldUpdate,
    } = this;
    const explorer = this;
    const { builder } = this.state;
    return (
      <div>
        <Helmet title={`${strings.title_explorer} - ${strings.explorer_subtitle}`} />
        <Heading title={strings.explorer_title} subtitle={strings.explorer_description} />
        <ExplorerControlSection
          showToggle
          showEditor={this.state.showEditor}
          toggleEditor={this.toggleEditor}
        >
          <ExplorerFormField label={strings.explorer_select} fields={expandedFields} builderField="select" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_player} fields={expandedFields} builderField="player" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_team} fields={expandedFields} builderField="team" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_organization} fields={expandedFields} builderField="organization" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_league} fields={expandedFields} builderField="league" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_tier} fields={expandedFields} builderField="tier" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_region} fields={expandedFields} builderField="region" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField
            label={strings.explorer_player_purchased}
            fields={expandedFields}
            builderField="playerPurchased"
            handleFieldUpdate={handleFieldUpdate}
            builder={builder}
          />
          <ExplorerFormField label={strings.explorer_lane_role} fields={expandedFields} builderField="laneRole" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_min_patch} fields={expandedFields} builderField="minPatch" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_max_patch} fields={expandedFields} builderField="maxPatch" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_min_duration} fields={expandedFields} builderField="minDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_max_duration} fields={expandedFields} builderField="maxDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField />
          <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField />
          <ExplorerFormField label={strings.explorer_order} fields={expandedFields} builderField="order" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_having} fields={expandedFields} builderField="having" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_limit} fields={expandedFields} builderField="limit" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label="Is TI7 Team" fields={expandedFields} builderField="isTi7Team" handleFieldUpdate={handleFieldUpdate} builder={builder} />
        </ExplorerControlSection>
        <div>
          <RaisedButton
            primary={!this.state.loading}
            secondary={this.state.loading}
            style={{ margin: '5px' }}
            label={this.state.loading ? strings.explorer_cancel_button : strings.explorer_query_button}
            onClick={this.state.loading ? handleCancel : handleQuery}
          />
          <RaisedButton
            secondary
            target="_blank"
            style={{ margin: '5px' }}
            label={strings.explorer_schema}
            href="https://github.com/odota/core/blob/master/sql/create_tables.sql"
          />
          <span style={{ float: 'right' }}>
            <ExplorerOutputButton defaultSelected label={strings.explorer_table_button} format="table" context={explorer} />
            {/*
          <ExplorerOutputButton label={strings.explorer_donut_button} format="donut" context={explorer} />
          <ExplorerOutputButton label={strings.explorer_bar_button} format="bar" context={explorer} />
          <ExplorerOutputButton label={strings.explorer_timeseries_button} format="timeseries" context={explorer} />
          */}
            <ExplorerOutputButton
              label={strings.explorer_csv_button}
              href={`data:application/octet-stream,${encodeURIComponent(json2csv({
              data: this.state.result.rows || [],
              fields: (this.state.result.fields || []).map(field => field.name),
            }))}`}
              download="data.csv"
              context={explorer}
            />
            <ExplorerOutputButton
              label={strings.explorer_json_button}
              href={`data:application/octet-stream,${encodeURIComponent(JSON.stringify(this.state.result.rows, null, 2))}`}
              download="data.json"
              context={explorer}
            />
            <ExplorerOutputButton
              label={strings.explorer_api_button}
              onClick={() => window.open(`${process.env.REACT_APP_API_HOST}/api/explorer?sql=${encodeURIComponent(getSqlString())}`, '_blank')}
              context={explorer}
            />
          </span>
        </div>
        <Heading title={strings.explorer_results} subtitle={`${(this.state.result.rows || []).length} ${strings.explorer_num_rows}`} />
        <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
        {this.state.loading ? <Spinner /> : null}
        <ExplorerOutputSection
          rows={this.state.result.rows}
          fields={this.state.result.fields}
          expandedBuilder={expandedBuilder}
          playerMapping={playerMapping}
          teamMapping={teamMapping}
          format={this.state.builder.format}
        />
      </div>);
  }
}

Explorer.propTypes = {
  proPlayers: PropTypes.arrayOf({}),
  teams: PropTypes.arrayOf({}),
  leagues: PropTypes.shape({}),
  dispatchProPlayers: PropTypes.func,
  dispatchLeagues: PropTypes.func,
  dispatchTeams: PropTypes.func,
};

const mapStateToProps = state => ({
  proPlayers: state.app.proPlayers.data,
  leagues: state.app.leagues.data,
  teams: state.app.teams.data,
});

const mapDispatchToProps = dispatch => ({
  dispatchProPlayers: () => dispatch(getProPlayers()),
  dispatchLeagues: () => dispatch(getLeagues()),
  dispatchTeams: () => dispatch(getTeams()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
