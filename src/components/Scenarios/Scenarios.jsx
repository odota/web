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
import strings from '../../lang';
import Table from '../Table';
import Spinner from '../Spinner';
import Error from '../Error';
import Heading from '../Heading';
import { groupByArray } from '../../utility/index';
import { IconLaneRoles } from '../Icons';

const minSampleSize = row => row.games > 200;

const forms = {
  itemTimings: {
    queryForms: ['hero_id', 'item'],
    filterForms: ['time'],
  },
  laneRoles: {
    queryForms: ['hero_id', 'lane_role'],
    filterForms: ['time'],
  },
  misc: {
    queryForms: ['scenario'],
  },
};

const tabItems = [{
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
];

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
  }

  constructor(props) {
    super(props);

    const selectedTab = this.props.match.params.info || 'itemTimings';
    const params = this.props.location.search.substring(1);
    this.state = {
      selectedTab,
      formFields: { [selectedTab]: querystring.parse(params) || null },
    };
    this.updateFormFieldStates();

    this.getData = this.getData.bind(this);
    this.updateQueryParams = this.updateQueryParams.bind(this);
    this.updateFormFieldStates = this.updateFormFieldStates.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const { selectedTab, formFields } = this.state;
    this.props[selectedTab](formFields[selectedTab]);
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

  handleChange = (selectedTab) => {
    this.setState({ selectedTab }, this.initialQuery);
  }

  updateQueryParams() {
    const { formFields, selectedTab } = this.state;
    const { location } = this.props;
    this.props.history.push(`${location.pathname}?${querystring.stringify(formFields[selectedTab])}`);
  }

  updateFormFieldStates(newFormFieldState) {
    const { selectedTab, formFields } = this.state;
    this.setState({
      formFields: { ...formFields, [selectedTab]: { ...formFields[selectedTab], ...newFormFieldState } },
    }, this.updateQueryParams);
  }

  render() {
    const { scenariosState } = this.props;
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
        {metadataLoading && <Spinner />}
        {!metadataError && !metadataLoading &&
        <div>
          <Heading title={strings.header_scenarios} subtitle={strings.scenarios_subtitle} />
          <Tabs value={selectedTab} onChange={this.handleChange} style={tabsStyle}>
            {tabItems.map(item => (
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
            key={selectedTab}
            data={data.filter(minSampleSize)}
            columns={getColumns(selectedTab, metadata)}
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
  };
};

const mapDispatchToProps = dispatch => ({
  itemTimings: params => dispatch(getScenariosItemTimings(params)),
  laneRoles: params => dispatch(getScenariosLaneRoles(params)),
  misc: params => dispatch(getScenariosMisc(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenarios));
