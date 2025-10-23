import React from 'react';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import getFormFieldData from './FormFieldData';
import { listStyle } from './Styles';

const hintTexts = (strings: Strings) => ({
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
});

const customStyles = {
  scenario: { width: '450px' },
};

type ScenariosFormFieldProps = {
  field: 'hero_id' | 'item' | 'time' | 'lane_role' | 'scenario',
  formFieldState: any,
  metadata: any,
  updateFormFieldState: Function,
  selectedTab: ScenariosTab,
  className: string,
  index: number,
  strings: Strings,
  incrementTableKey: Function,
}

class ScenarioFormField extends React.Component<ScenariosFormFieldProps, { searchText: string, animate?: boolean }> {
  dataSources: Record<string, Record<string, any[]>> = {};
  constructor(props: ScenariosFormFieldProps) {
    super(props);
    const { field, formFieldState, metadata, selectedTab, strings } =
      this.props;
    const {
      heroList,
      itemList,
      laneRoleList,
      miscList,
      gameDurationList,
      timingList,
    } = getFormFieldData(metadata, strings);
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

    let searchText = this.dataSources[selectedTab][field].find(
      (el) =>
        (el.altValue !== undefined && el.altValue === formFieldState) ||
        el.value === formFieldState,
    );
    searchText = searchText ? searchText.text : '';

    this.state = {
      searchText,
    };
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ animate: true });
    });
  }

  handleUpdateInput = (searchText: string) => {
    this.setState({ searchText });
  }

  handleRequest = (chosenRequest: any) => {
    const { updateFormFieldState, field } = this.props;
    updateFormFieldState({
      [field]: chosenRequest.altValue || chosenRequest.value,
    });
  }

  resetField = () => {
    if (this.props.className === 'filter') {
      this.props.incrementTableKey();
    }
    const { updateFormFieldState, field } = this.props;
    this.setState({ searchText: '' }, updateFormFieldState({ [field]: null }));
  }

  render() {
    const { field, index, selectedTab, className, strings } = this.props;
    const { searchText } = this.state;
    const style = {
      paddingRight: '20px',
      opacity: this.state.animate ? 1 : 0,
      transition: `all ${0.25 * (index + 1)}s ease-in-out`,
    };

    return (
      <div>
        <AutoComplete
          openOnFocus
          listStyle={{ ...listStyle, ...customStyles[field as keyof typeof customStyles] }}
          filter={AutoComplete.caseInsensitiveFilter}
          //@ts-expect-error
          floatingLabelText={hintTexts(strings)[selectedTab][field]}
          dataSource={this.dataSources[selectedTab][field]}
          //@ts-expect-error
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

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(ScenarioFormField);
