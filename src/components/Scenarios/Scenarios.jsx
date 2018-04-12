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

const minSampleSize = row => row.games > 200;

const fields = {
  itemTimings: ['hero_id', 'item'],
  laneRoles: ['hero_id', 'lane_role'],
  misc: ['scenario'],
};

const menuItems = [{
  text: strings.scenarios_item_timings,
  value: 'itemTimings',
  icon: <Schedule />,
},
{
  text: strings.heading_lane_role,
  value: 'laneRoles',
  icon: <img src="/assets/images/dota2/lane_roles.svg" alt="" />,
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
  return [data.reduce((a, b) => ({
    ...a,
    games: Number(a.games) + Number(b.games),
    wins: Number(a.wins) + Number(b.wins),
  }))];
};

const getLink = scenario => <Link to={`/scenarios/${scenario}`} />;

class Scenarios extends React.Component {
  constructor(props) {
    super(props);

    const dropDownValue = this.props.match.params.info || 'itemTimings';
    const params = this.props.location.search.substring(1);
    this.state = {
      dropDownValue,
      formFields: { [dropDownValue]: querystring.parse(params) || null },
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
    const { scenariosDispatch } = this.props;
    const { dropDownValue, formFields } = this.state;
    scenariosDispatch[dropDownValue](formFields[dropDownValue]);
  }

  initialQuery() {
    const { scenariosState } = this.props;
    const { dropDownValue } = this.state;
    const { data } = scenariosState[dropDownValue];
    if (scenariosState[dropDownValue].loading && data.length === 0){
      this.getData()
    }
    this.updateQueryParams()
  }

  handleChange = (dropDownValue) => {
    this.setState({ dropDownValue }, this.initialQuery);
  }

  updateQueryParams() {
    const { formFields, dropDownValue } = this.state;
    const { location } = this.props;
    this.props.history.push(`${location.pathname}?${querystring.stringify(formFields[dropDownValue])}`);
  }

  updateFormFieldStates(newFormFieldState) {
    const { dropDownValue, formFields } = this.state;
    this.setState({
      formFields: { ...formFields, [dropDownValue]: { ...formFields[dropDownValue], ...newFormFieldState } },
    }, this.updateQueryParams);
  }

  render() {
    const { scenariosState } = this.props;
    const { dropDownValue, formFields } = this.state;
    const { data } = scenariosState[dropDownValue];
    const { metadata, metadataLoading, metadataError } = scenariosState.metadata;
    return (
      <StyledDiv>
        {metadataError && <Error />}
        {metadataLoading && <Spinner />}
        {!metadataError && !metadataLoading &&
        <div>
          <Heading title={strings.header_scenarios} subtitle={strings.scenarios_subtitle} />
          <Tabs value={dropDownValue} onChange={this.handleChange} style={tabsStyle}>
            {menuItems.map(item => (
              <Tab label={item.text} value={item.value} icon={item.icon} containerElement={getLink(item.value)} />
            ))}
          </Tabs>
          <div style={formFieldStyle}>
            {fields[dropDownValue].map(field => (
              <ScenariosFormField
                key={field + dropDownValue}
                field={field}
                updateQueryParams={this.updateQueryParams}
                updateFormFieldState={this.updateFormFieldStates}
                formFieldState={formFields[dropDownValue] && formFields[dropDownValue][field]}
                metadata={metadata}
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
          {!scenariosState[dropDownValue].loading &&
            <Heading title={strings.explorer_results} subtitle={`${data.filter(minSampleSize).length} ${strings.explorer_num_rows}`} />
          }
          <Table
            key={dropDownValue}
            data={data.filter(minSampleSize)}
            columns={getColumns(dropDownValue, metadata)}
            loading={scenariosState[dropDownValue].loading}
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
        data: reduceRows(scenariosMisc.data),
        loading: scenariosMisc.loading,
        error: scenariosMisc.error,
      },
    },
  };
};

const mapDispatchToProps = dispatch => ({
  scenariosDispatch: {
    itemTimings: params => dispatch(getScenariosItemTimings(params)),
    laneRoles: params => dispatch(getScenariosLaneRoles(params)),
    misc: params => dispatch(getScenariosMisc(params)),
  },
});

Scenarios.propTypes = {
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
  scenariosDispatch: PropTypes.shape({}),
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Scenarios));
