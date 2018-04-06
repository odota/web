import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from 'lang';
import Table from 'components/Table';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { withRouter, Link } from 'react-router-dom';
import querystring from 'querystring';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import { DropDownMenu } from 'material-ui/DropDownMenu';
import ScenariosFormField from './ScenariosFormField';
import getColumns from './ScenariosColumns';
import { buttonStyle, formFieldStyle } from './Styles';
import { getScenariosItemTimings, getScenariosMisc, getScenariosLaneRoles } from '../../actions/index';


// placeholder, will be replaced by api call
const metadata = {
  timings: [450, 600, 720, 900, 1200, 1500, 1800],
  gameDurationBucket: [900, 1800, 2700, 3600, 5400],
  itemCost: 2000,
  teamScenariosQueryParams: {
    pos_chat_1min: 'Positivity in chat before 1 minute',
    neg_chat_1min: 'Negativity in chat before 1 minute',
    courier_kill: 'Courier Kill before 3 minutes',
    first_blood: 'First Blood',
  },
};

const minSampleSize = x => x.games > 100;

const fields = {
  itemTimings: ['hero_id', 'item'],
  laneRoles: ['hero_id', 'lane_role'],
  misc: ['scenario'],
};

const menuItems = [{
  text: strings.item_timings,
  value: 'itemTimings',
},
{
  text: strings.heading_lane_role,
  value: 'laneRoles',
},
{
  text: strings.misc,
  value: 'misc',
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
    const { dropDownValue, formFields } = this.state;
    if (Object.keys(formFields[dropDownValue]).length > 0) {
      this.getData();
    }
  }

  getData() {
    const { scenariosDispatch } = this.props;
    const { dropDownValue, formFields } = this.state;
    scenariosDispatch[dropDownValue](formFields[dropDownValue]);
  }

  getLink(scenario) {
    return <Link to={`/scenarios/${scenario}?${querystring.stringify(this.state.formFields)}`} />;
  }

  handleChange = (event, index, dropDownValue) => {
    this.setState({ dropDownValue }, this.updateQueryParams);
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
    return (
      <div>
        <DropDownMenu value={dropDownValue} onChange={this.handleChange}>
          {menuItems.map(item => (
            <MenuItem value={item.value} primaryText={item.text} containerElement={this.getLink(item.value)} />
          ))}
        </DropDownMenu>
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
          label={strings.explorer_query_button}
          icon={<ActionSearch />}
          primary
        />
        <Table
          key={dropDownValue}
          data={data.filter(minSampleSize)}
          columns={getColumns(dropDownValue, metadata)}
          loading={scenariosState[dropDownValue].loading}
          paginated
        />
      </div>
    );
  }
}

Scenarios.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ info: PropTypes.string }),
  }),
};

const mapStateToProps = (state) => {
  const {
    scenariosItemTimings,
    scenariosLaneRoles,
    scenariosMisc,
  } = state.app;

  return {
    scenariosState: {
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
