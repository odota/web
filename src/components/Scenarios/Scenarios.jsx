import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionSearch from 'material-ui/svg-icons/action/search';
import Schedule from 'material-ui/svg-icons/action/schedule';
import Grain from 'material-ui/svg-icons/image/grain';
import { withRouter, Link } from 'react-router-dom';
import querystring from 'querystring';
import FlatButton from 'material-ui/FlatButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import ScenariosFormField from './ScenariosFormField';
import getColumns from './ScenariosColumns';
import { buttonStyle, formFieldStyle, StyledDiv, tabsStyle } from './Styles';
import { getScenariosItemTimings, getScenariosMisc, getScenariosLaneRoles } from '../../actions/index';
import Table from '../Table';
import Error from '../Error';
import Heading from '../Heading';
import ScenariosSkeleton from '../Skeletons/ScenariosSkeleton';
import { formatTemplateToString, groupByArray } from '../../utility/index';
import { IconLaneRoles } from '../Icons';

const minSampleSize = row => row.games > 10;

const forms = {
  itemTimings: {
    queryForms: ['hero_id', 'item'],
    filterForms: ['time'],
    initialQuery: { hero_id: '1', item: 'bfury' },
  },
  laneRoles: {
    queryForms: ['hero_id', 'lane_role'],
    filterForms: ['time'],
    initialQuery: { hero_id: '101', lane_role: '2' },
  },
  misc: {
    queryForms: ['scenario'],
  },
};

const tabItems = strings => ([{
  text: strings.scenarios_item_timings,
  value: 'itemTimings',
  icon: <Schedule />,
},
{
  text: strings.heading_lane_role,
  value: 'laneRoles',
  icon: <IconLaneRoles />,
},
{
  text: strings.scenarios_misc,
  value: 'misc',
  icon: <Grain />,
},
]);

const reduceRows = (data) => {
  if (data.length === 0) {
    return data;
  }
  return data.map(scenario => scenario.values.reduce((a, b) => ({
    ...a,
    games: Number(a.games) + Number(b.games),
    wins: Number(a.wins) + Number(b.wins),
  })));
};

const getLink = scenario => <Link to={`/scenarios/${scenario}`} />;

class Scenarios extends React.Component {
  tableKey = 0;

  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({ info: PropTypes.string }),
    }),
    location: PropTypes.shape({
      search: PropTypes.shape({
        substring: PropTypes.string,
      }),
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    scenariosState: PropTypes.shape({}),
    strings: PropTypes.shape({}),
  }

  constructor(props) {
    super(props);

    const selectedTab = this.props.match.params.info || 'itemTimings';
    const params = this.props.location.search.substring(1);

    const initialQueries = {};
    Object.keys(forms).forEach((tab) => {
      initialQueries[tab] = (selectedTab === tab && Object.keys(querystring.parse(params)).length > 0) ? querystring.parse(params) : forms[tab].initialQuery;
    });

    this.state = {
      selectedTab,
      formFields: initialQueries,
    };
    this.updateFormFieldStates();

    this.getData = this.getData.bind(this);
    this.updateQueryParams = this.updateQueryParams.bind(this);
    this.updateFormFieldStates = this.updateFormFieldStates.bind(this);
  }

  componentDidMount() {
    this.getData();
    this.updateQueryParams();
  }

  getData() {
    const { selectedTab, formFields } = this.state;
    this.props[selectedTab](formFields[selectedTab]);
    this.incrementTableKey();
  }

  handleChange = (selectedTab) => {
    this.setState({ selectedTab }, this.initialQuery);
  }

  incrementTableKey = () => {
    this.tableKey += 1;
  }

  initialQuery() {
    const { scenariosState } = this.props;
    const { selectedTab } = this.state;
    const { data } = scenariosState[selectedTab];
    if (scenariosState[selectedTab].loading && data.length === 0) {
      this.getData();
    }
    this.updateQueryParams();
  }

  updateQueryParams() {
    const { formFields, selectedTab } = this.state;
    this.props.history.push(`/scenarios/${selectedTab}?${querystring.stringify(formFields[selectedTab])}`);
  }

  updateFormFieldStates(newFormFieldState) {
    const { selectedTab, formFields } = this.state;
    this.setState({
      formFields: { ...formFields, [selectedTab]: { ...formFields[selectedTab], ...newFormFieldState } },
    }, this.updateQueryParams);
  }

  render() {
    const { scenariosState, strings } = this.props;
    const { selectedTab, formFields } = this.state;
    let { data } = scenariosState[selectedTab];
    const { queryForms, filterForms } = forms[selectedTab];
    const { metadata, metadataLoading, metadataError } = scenariosState.metadata;
    if (filterForms) {
      filterForms.forEach((key) => {
        const formValue = formFields[selectedTab] && formFields[selectedTab][key];
        data = data.filter(row => Number(formValue) === row[key] || formValue === row[key] || !formValue);
      });
    }
    return (
      <StyledDiv>
        {metadataError && <Error />}
        {metadataLoading && <ScenariosSkeleton />}
        {!metadataError && !metadataLoading &&
        <div>
          <Heading title={strings.header_scenarios} subtitle={strings.scenarios_subtitle} info={`${formatTemplateToString(strings.scenarios_info, 4)}`} className="top-heading"/>
          <Tabs value={selectedTab} onChange={this.handleChange} style={tabsStyle}>
            {tabItems(strings).map(item => (
              <Tab label={item.text} value={item.value} icon={item.icon} containerElement={getLink(item.value)} className="tab" />
            ))}
          </Tabs>
          <div style={formFieldStyle}>
            {[...(queryForms || []), ...(filterForms || [])].map((field, index) => (
              <ScenariosFormField
                key={field + selectedTab}
                field={field}
                index={index}
                selectedTab={selectedTab}
                updateQueryParams={this.updateQueryParams}
                updateFormFieldState={this.updateFormFieldStates}
                formFieldState={formFields[selectedTab] && formFields[selectedTab][field]}
                metadata={metadata}
                className={filterForms && filterForms.includes(field) ? 'filter' : 'query'}
                incrementTableKey={this.incrementTableKey}
              />
            ))}
          </div>
          <FlatButton
            onClick={this.getData}
            style={buttonStyle}
            backgroundColor="rgba(220, 220, 220, 0.05)"
            hoverColor="rgba(220, 220, 220, 0.2)"
            label={strings.explorer_query_button}
            icon={<ActionSearch />}
            primary
          />
          <Heading title={strings.explorer_results} subtitle={`${data.filter(minSampleSize).length} ${strings.explorer_num_rows}`} />
          <Table
            key={selectedTab + this.tableKey}
            data={data.filter(minSampleSize)}
            columns={getColumns(selectedTab, metadata, strings)}
            loading={scenariosState[selectedTab].loading}
            paginated
          />
        </div>
        }
      </StyledDiv>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    scenariosItemTimings,
    scenariosLaneRoles,
    scenariosMisc,
    metadata,
  } = state.app;

  return {
    scenariosState: {
      metadata: {
        metadata: metadata.data.scenarios,
        metadataLoading: metadata.loading,
        metadataError: metadata.error,
      },
      itemTimings: {
        data: scenariosItemTimings.data,
        loading: scenariosItemTimings.loading,
        error: scenariosItemTimings.error,
      },
      laneRoles: {
        data: scenariosLaneRoles.data,
        loading: scenariosLaneRoles.loading,
        error: scenariosLaneRoles.error,
      },
      misc: {
        data: reduceRows(groupByArray(scenariosMisc.data, 'scenario')),
        loading: scenariosMisc.loading,
        error: scenariosMisc.error,
      },
    },
    strings: state.app.strings,
  };
};

const mapDispatchToProps = dispatch => ({
  itemTimings: params => dispatch(getScenariosItemTimings(params)),
  laneRoles: params => dispatch(getScenariosLaneRoles(params)),
  misc: params => dispatch(getScenariosMisc(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenarios));
