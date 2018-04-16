import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import getFormFieldData from './FormFieldData';
import { listStyle } from './Styles';
import strings from '../../lang';

const hintTexts = {
  itemTimings: {
    hero_id: strings.filter_hero_id,
    item: strings.scenarios_item,
    time: strings.scenarios_time,
  },
  laneRoles: {
    hero_id: strings.filter_hero_id,
    lane_role: strings.heading_lane_role,
    time: strings.scenarios_game_duration,
  },
  misc: {
    scenario: strings.scenarios_scenario,
  },
};

const customStyles = {
  scenario: { width: '450px' },
};

class ScenarioFormField extends React.Component {
  constructor(props) {
    super(props);
    const {
      field, formFieldState, metadata, selectedTab,
    } = this.props;
    const {
      heroList, itemList, laneRoleList, miscList, gameDurationList, timingList,
    } = getFormFieldData(metadata);
    this.dataSources = {
      itemTimings: {
        hero_id: heroList,
        item: itemList,
        time: timingList,
      },
      laneRoles: {
        hero_id: heroList,
        lane_role: laneRoleList,
        time: gameDurationList,
      },
      misc: {
        scenario: miscList,
      },
    };


    let searchText = this.dataSources[selectedTab][field].find(el => el.value === formFieldState);
    searchText = searchText ? searchText.text : '';

    this.state = {
      searchText,
    };

    this.resetField = this.resetField.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ animate: true });
    });
  }

  resetField() {
    const { updateFormFieldState, field } = this.props;
    this.setState({ searchText: '' }, updateFormFieldState({ [field]: null }));
  }

  handleUpdateInput(searchText) {
    this.setState({ searchText });
  }

  handleRequest(chosenRequest) {
    const { updateFormFieldState, field } = this.props;
    updateFormFieldState({ [field]: chosenRequest.value });
  }

  render() {
    const {
      field, index, selectedTab, className,
    } = this.props;
    const { searchText } = this.state;
    const style = {
      paddingRight: '20px',
      opacity: this.state.animate ? 1 : 0,
      transition: `all ${((index + 1) * 2) * 0.125}s ease-in-out`,
    };

    return (
      <div>
        <AutoComplete
          openOnFocus
          listStyle={{ ...listStyle, ...customStyles[field] }}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText={hintTexts[selectedTab][field]}
          dataSource={this.dataSources[selectedTab][field]}
          onClick={this.resetField}
          onUpdateInput={this.handleUpdateInput}
          searchText={searchText}
          onNewRequest={this.handleRequest}
          style={style}
          className={className}
        />
      </div>
    );
  }
}

ScenarioFormField.propTypes = {
  field: PropTypes.string,
  formFieldState: PropTypes.shape({}),
  metadata: PropTypes.shape({}),
  updateFormFieldState: PropTypes.func,
  selectedTab: PropTypes.string,
  className: PropTypes.string,
  index: PropTypes.number,
};

export default ScenarioFormField;
