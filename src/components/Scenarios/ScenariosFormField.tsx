import React from "react";
import { connect } from "react-redux";
import { Autocomplete, TextField } from "@mui/material";
import getFormFieldData from "./FormFieldData";

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
  scenario: { width: "450px" },
};

type ScenariosFormFieldProps = {
  field: "hero_id" | "item" | "time" | "lane_role" | "scenario";
  formFieldState: any;
  metadata: any;
  updateFormFieldState: Function;
  selectedTab: ScenariosTab;
  className: string;
  index: number;
  strings: Strings;
  incrementTableKey: Function;
};

class ScenarioFormField extends React.Component<
  ScenariosFormFieldProps,
  { animate?: boolean }
> {
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
  }

  componentDidMount() {
    requestAnimationFrame(() => {
      this.setState({ animate: true });
    });
  }

  // handleUpdateInput = (e: any, searchText: string) => {
  //   this.setState({ searchText });
  // }

  handleRequest = (e: any, value: { label: string; id: string } | null) => {
    const { updateFormFieldState, field } = this.props;
    updateFormFieldState({
      [field]: value?.id,
    });
    // this.setState({ searchText: value?.label });
  };

  // resetField = () => {
  //   if (this.props.className === 'filter') {
  //     this.props.incrementTableKey();
  //   }
  //   const { updateFormFieldState, field } = this.props;
  //   this.setState({ searchText: '' }, updateFormFieldState({ [field]: null }));
  // }

  render() {
    const { field, index, selectedTab, className, strings } = this.props;
    //@ts-expect-error
    const label = hintTexts(strings)[selectedTab][field];
    const options = this.dataSources[selectedTab][field].map((d: any) => ({
      label: d.text ?? d.value,
      id: String(d.value),
    }));
    return (
      <Autocomplete
        sx={{ width: "300px" }}
        openOnFocus
        renderInput={(params) => <TextField {...params} label={label} />}
        options={options}
        // onOpen={this.resetField}
        value={options.find((o) => o.id === this.props.formFieldState)}
        // onInputChange={this.handleUpdateInput}
        onChange={this.handleRequest}
        className={className}
      />
    );
  }
}

const mapStateToProps = (state: any) => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(ScenarioFormField);
