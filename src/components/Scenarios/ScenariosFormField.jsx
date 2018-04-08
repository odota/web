import React from 'react';
import PropTypes from 'prop-types';
import AutoComplete from 'material-ui/AutoComplete';
import getFormFieldData from './FormFieldData';
import { autoCompleteStyle } from './Styles';
import strings from '../../lang';

const hintText = {
  hero_id: strings.filter_hero_id,
  item: strings.scenarios_item,
  scenario: strings.scenarios_scenario,
  lane_role: strings.heading_lane_role,
};

class ScenarioFormField extends React.Component {
  constructor(props) {
    super(props);
    const { field, formFieldState, metadata } = this.props;

    const {
      heroList, itemList, laneRoleList, miscList,
    } = getFormFieldData(metadata);
    this.dataSources = {
      hero_id: heroList,
      item: itemList,
      lane_role: laneRoleList,
      scenario: miscList,
    };

    let searchText = this.dataSources[field].find(el => el.value === formFieldState);
    searchText = searchText ? searchText.text : '';

    this.state = {
      searchText,
    };

    this.resetField = this.resetField.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
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
    const { field } = this.props;
    const { searchText } = this.state;
    return (
      <div>
        <AutoComplete
          openOnFocus
          listStyle={{ maxHeight: 400, overflow: 'auto' }}
          filter={AutoComplete.caseInsensitiveFilter}
          floatingLabelText={hintText[field]}
          dataSource={this.dataSources[field]}
          onClick={this.resetField}
          onUpdateInput={this.handleUpdateInput}
          searchText={searchText}
          onNewRequest={this.handleRequest}
          style={autoCompleteStyle}
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
};

export default ScenarioFormField;
