import React from 'react';
import PropTypes from 'prop-types';
import { connect }
  from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Helmet from 'react-helmet';
import querystring from 'querystring';
import ExplorerOutputSection from '../Explorer/ExplorerOutputSection';
import ExplorerControlSection from '../Explorer/ExplorerControlSection';
import ExplorerFormField from '../Explorer/ExplorerFormField';
import Heading from '../Heading';
import TableSkeleton from '../Skeletons/TableSkeleton';
import queryTemplate from './queryTemplate';
import getFields from './fields';
import config from '../../config';

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

class Explorer extends React.Component {
  static propTypes = {
    strings: PropTypes.shape({}),
  }

  constructor() {
    super();
    const urlState = querystring.parse(window.location.search.substring(1));
    this.state = {
      loadingEditor: true,
      loading: false,
      result: {},
      builder: urlState,
      sql: '',
    };
  }
  componentDidMount() {
    this.buildQuery(this.handleQuery);
  }

  buildQuery = (cb) => {
    const noOp = () => {};
    const expandedBuilder = expandBuilderState(this.state.builder, getFields());
    this.setState({ sql: queryTemplate(expandedBuilder) }, cb || noOp);
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
    this.setState({
      ...this.state,
      loading: true,
    });
    this.syncWindowHistory();
    const sqlString = this.state.sql;
    return fetch(`${config.VITE_API_HOST}/api/explorer?sql=${encodeURIComponent(sqlString)}`).then(jsonResponse).then(this.handleResponse);
  };

  handleResponse = (json) => {
    this.setState({
      ...this.state,
      loading: false,
      result: json,
    });
  };

  syncWindowHistory = () => {
    const objectToSerialize = this.state.builder;
    const stringToSerialize = `?${querystring.stringify(objectToSerialize)}`;
    window.history.pushState('', '', stringToSerialize);
  };

  render() {
    const { builder } = this.state;
    const { strings } = this.props;
    const expandedFields = getFields();
    const expandedBuilder = expandBuilderState(this.state.builder, expandedFields);
    const { handleQuery, handleCancel, handleFieldUpdate } = this;
    return (
      <div>
        <Helmet title={`${strings.title_meta}`} />
        <Heading title={strings.meta_title} subtitle={strings.meta_description} className="top-heading"/>
        <ExplorerControlSection>
          <ExplorerFormField label={strings.explorer_group_by} fields={expandedFields} builderField="group" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_min_rank_tier} fields={expandedFields} builderField="minRankTier" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_max_rank_tier} fields={expandedFields} builderField="maxRankTier" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_hero} fields={expandedFields} builderField="hero" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_side} fields={expandedFields} builderField="side" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.th_result} fields={expandedFields} builderField="result" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_min_duration} fields={expandedFields} builderField="minDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.explorer_max_duration} fields={expandedFields} builderField="maxDuration" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.filter_game_mode} fields={expandedFields} builderField="gameMode" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          <ExplorerFormField label={strings.filter_lobby_type} fields={expandedFields} builderField="lobbyType" handleFieldUpdate={handleFieldUpdate} builder={builder} />
          {/* <ExplorerFormField label={strings.explorer_min_mmr} fields={expandedFields} builderField="minMmr" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
          {/* <ExplorerFormField label={strings.explorer_max_mmr} fields={expandedFields} builderField="maxMmr" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
          {/* <ExplorerFormField label={strings.explorer_min_date} builderField="minDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField /> */}
          {/* <ExplorerFormField label={strings.explorer_max_date} builderField="maxDate" handleFieldUpdate={handleFieldUpdate} builder={builder} isDateField /> */}
          {/* <ExplorerFormField label={strings.explorer_order} fields={expandedFields} builderField="order" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
          {/* <ExplorerFormField label={strings.explorer_having} fields={expandedFields} builderField="having" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
          {/* <ExplorerFormField label={strings.explorer_limit} fields={expandedFields} builderField="limit" handleFieldUpdate={handleFieldUpdate} builder={builder} /> */}
        </ExplorerControlSection>
        <div>
          <RaisedButton
            primary={!this.state.loading}
            secondary={this.state.loading}
            style={{ margin: '5px' }}
            icon={!this.state.loading ? <ActionSearch /> : null}
            label={this.state.loading ? strings.explorer_cancel_button : strings.explorer_query_button}
            onClick={this.state.loading ? handleCancel : handleQuery}
          />
        </div>
        <Heading title={strings.explorer_results} subtitle={`${(this.state.result.rows || []).length} ${strings.explorer_num_rows}`} />
        <pre style={{ color: 'red' }}>{this.state.result.err}</pre>
        {this.state.loading ? <TableSkeleton /> : null}
        <ExplorerOutputSection
          rows={this.state.result.rows}
          fields={this.state.result.fields}
          expandedBuilder={expandedBuilder}
          format={this.state.builder.format}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  strings: state.app.strings,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Explorer);
