import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import querystring from "querystring";
import { Button } from "@mui/material";
import { Tabs, Tab } from "@mui/material";
import ScenariosFormField from "./ScenariosFormField";
import getColumns from "./ScenariosColumns";
import { buttonStyle, formFieldStyle, StyledDiv, tabsStyle } from "./Styles";
import {
  getScenariosItemTimings,
  getScenariosMisc,
  getScenariosLaneRoles,
} from "../../actions/index";
import Table from "../Table/Table";
import Error from "../Error/Error";
import Heading from "../Heading/Heading";
import ScenariosSkeleton from "../Skeletons/ScenariosSkeleton";
import { formatTemplateToString, groupByArray } from "../../utility";
import { IconLaneRoles } from "../Icons";

const minSampleSize = (row: any) => row.games > 10;

const forms: Record<string, any> = {
  itemTimings: {
    queryForms: ["hero_id", "item"],
    filterForms: ["time"],
    initialQuery: { hero_id: "1", item: "bfury" },
  },
  laneRoles: {
    queryForms: ["hero_id", "lane_role"],
    filterForms: ["time"],
    initialQuery: { hero_id: "101", lane_role: "2" },
  },
  misc: {
    queryForms: ["scenario"],
  },
};

const tabItems = (strings: Strings) => [
  {
    text: strings.scenarios_item_timings,
    value: "itemTimings",
    // icon: <Schedule />,
  },
  {
    text: strings.heading_lane_role,
    value: "laneRoles",
    // icon: <IconLaneRoles style={{}} />,
  },
  {
    text: strings.scenarios_misc,
    value: "misc",
    // icon: <Grain />,
  },
];

const reduceRows = (data: any[]) => {
  if (data.length === 0) {
    return data;
  }
  return data.map((scenario) =>
    scenario.values.reduce((a: any, b: any) => ({
      ...a,
      games: Number(a.games) + Number(b.games),
      wins: Number(a.wins) + Number(b.wins),
    })),
  );
};

type ScenariosProps = {
  match: {
    params: { info: string };
  };
  location: {
    search: {
      substring: Function;
    };
  };
  history: {
    push: Function;
  };
  scenariosState: Record<
    string,
    {
      data: any[];
      loading?: boolean;
      error?: string;
      metadata?: any;
      metadataLoading?: boolean;
      metadataError?: string;
    }
  >;
  strings: Strings;
  itemTimings: Function;
  laneRoles: Function;
  misc: Function;
};

type ScenariosState = {
  selectedTab: ScenariosTab;
  formFields: Record<string, any>;
};

class Scenarios extends React.Component<ScenariosProps, ScenariosState> {
  tableKey = 0;
  constructor(props: ScenariosProps) {
    super(props);

    const selectedTab = this.props.match.params.info || "itemTimings";
    const params = this.props.location.search.substring(1);

    const initialQueries: Record<string, any> = {};
    Object.keys(forms).forEach((tab) => {
      initialQueries[tab] =
        selectedTab === tab && Object.keys(querystring.parse(params)).length > 0
          ? querystring.parse(params)
          : forms[tab].initialQuery;
    });

    this.state = {
      selectedTab: selectedTab as ScenariosTab,
      formFields: initialQueries,
    };
    this.updateFormFieldStates();
  }

  componentDidMount() {
    this.getData();
    this.updateQueryParams();
  }

  getData = () => {
    const { selectedTab, formFields } = this.state;
    this.props[selectedTab](formFields[selectedTab]);
    this.incrementTableKey();
  };

  handleChange = (e: React.SyntheticEvent, selectedTab: ScenariosTab) => {
    this.setState({ selectedTab }, this.initialQuery);
  };

  incrementTableKey = () => {
    this.tableKey += 1;
  };

  initialQuery = () => {
    const { scenariosState } = this.props;
    const { selectedTab } = this.state;
    const { data } = scenariosState[selectedTab];
    if (scenariosState[selectedTab].loading && data?.length === 0) {
      this.getData();
    }
    this.updateQueryParams();
  };

  updateQueryParams = () => {
    const { formFields, selectedTab } = this.state;
    this.props.history.push(
      `/scenarios/${selectedTab}?${querystring.stringify(formFields[selectedTab])}`,
    );
    this.getData();
  };

  updateFormFieldStates = (newFormFieldState?: any) => {
    const { selectedTab, formFields } = this.state;
    this.setState(
      {
        formFields: {
          ...formFields,
          [selectedTab]: { ...formFields[selectedTab], ...newFormFieldState },
        },
      },
      this.updateQueryParams,
    );
  };

  render() {
    const { scenariosState, strings } = this.props;
    const { selectedTab, formFields } = this.state;
    let { data } = scenariosState[selectedTab];
    const { queryForms, filterForms } = forms[selectedTab];
    const { metadata, metadataLoading, metadataError } =
      scenariosState.metadata;
    if (filterForms) {
      filterForms.forEach((key: string) => {
        const formValue =
          formFields[selectedTab] && formFields[selectedTab][key];
        data = data?.filter(
          (row) =>
            Number(formValue) === row[key] ||
            formValue === row[key] ||
            !formValue,
        );
      });
    }
    return (
      <StyledDiv>
        {metadataError && <Error />}
        {metadataLoading && <ScenariosSkeleton />}
        {!metadataError && !metadataLoading && (
          <div>
            <Heading
              title={strings.header_scenarios}
              subtitle={strings.scenarios_subtitle}
              info={`${formatTemplateToString(strings.scenarios_info, 4)}`}
              className="top-heading"
            />
            <Tabs value={selectedTab} onChange={this.handleChange}>
              {tabItems(strings).map((item) => (
                <Tab key={item.value} label={item.text} value={item.value} />
              ))}
            </Tabs>
            <div style={formFieldStyle}>
              {[...(queryForms || []), ...(filterForms || [])].map(
                (field, index) => (
                  <ScenariosFormField
                    key={field + selectedTab}
                    field={field}
                    index={index}
                    selectedTab={selectedTab}
                    updateFormFieldState={this.updateFormFieldStates}
                    formFieldState={
                      formFields[selectedTab] && formFields[selectedTab][field]
                    }
                    metadata={metadata}
                    className={
                      filterForms && filterForms.includes(field)
                        ? "filter"
                        : "query"
                    }
                    incrementTableKey={this.incrementTableKey}
                  />
                ),
              )}
            </div>
            {/* <Button
              variant="contained"
              onClick={this.getData}
              style={buttonStyle}
              // backgroundColor="rgba(220, 220, 220, 0.05)"
              // hoverColor="rgba(220, 220, 220, 0.2)"
              // icon={<ActionSearch />}
            >{strings.explorer_query_button}</Button> */}
            <Heading
              title={strings.explorer_results}
              subtitle={`${data?.filter(minSampleSize).length} ${strings.explorer_num_rows}`}
            />
            <Table
              key={selectedTab + this.tableKey}
              data={data.filter(minSampleSize)}
              columns={getColumns(selectedTab, metadata, strings)}
              loading={scenariosState[selectedTab].loading}
              paginated
            />
          </div>
        )}
      </StyledDiv>
    );
  }
}

const mapStateToProps = (state: any) => {
  const { scenariosItemTimings, scenariosLaneRoles, scenariosMisc, metadata } =
    state.app;

  return {
    scenariosState: {
      metadata: {
        metadata: metadata.data.scenarios,
        metadataLoading: metadata.loading,
        metadataError: metadata.error,
        data: [],
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
        data: reduceRows(groupByArray(scenariosMisc.data, "scenario")),
        loading: scenariosMisc.loading,
        error: scenariosMisc.error,
      },
    },
    strings: state.app.strings,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  itemTimings: (params: any) => dispatch(getScenariosItemTimings(params)),
  laneRoles: (params: any) => dispatch(getScenariosLaneRoles(params)),
  misc: (params: any) => dispatch(getScenariosMisc(params)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Scenarios),
);
