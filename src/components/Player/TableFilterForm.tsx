import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import querystring from "querystring";
import { heroes, patch, region } from "dotaconstants";
import { toggleShowForm } from "../../actions/formActions";
import FormField from "../Form/FormField";
import constants from "../constants";
import config from "../../config";

const textFieldStyle = { width: 53, fontSize: 9, height: "auto" };

const getPeers = async (props: TableFilterFormProps, context: any) => {
  const resp = await fetch(
    `${config.VITE_API_HOST}/api/players/${props.playerId}/peers`,
  );
  if (resp.ok) {
    const json = await resp.json();
    context.setState({ peers: json });
  }
};

const setShowFormState = (props: TableFilterFormProps) => {
  if (Boolean(props.currentQueryString.substring(1)) !== props.showForm) {
    // If query string state has a filter, turn on the form
    props.toggleShowForm();
  }
};

type TableFilterFormProps = {
  currentQueryString: string;
  playerId: string;
  strings: Strings;
  showForm: boolean;
  toggleShowForm: Function;
} & RouterProps;

class TableFilterForm extends React.Component<
  TableFilterFormProps,
  { peers: any[] }
> {
  constructor(props: TableFilterFormProps) {
    super(props);
    this.state = {
      peers: [],
    };
  }

  componentDidMount() {
    setShowFormState(this.props);
    getPeers(this.props, this);
  }

  componentDidUpdate(nextProps: TableFilterFormProps) {
    if (nextProps.playerId !== this.props.playerId) {
      setShowFormState(nextProps);
      getPeers(nextProps, this);
    }
  }

  render() {
    const { currentQueryString, history, strings } = this.props;
    const formSelectionState = querystring.parse(
      currentQueryString.substring(1),
    );

    const heroList = Object.keys(heroes)
      .map((id) => ({
        label: heroes[id as keyof Heroes]?.localized_name,
        id: Number(id),
      }))
      .sort((a: any, b: any) => a.label?.localeCompare(b.label));

    const laneList = Object.keys(strings)
      .filter((str) => str.indexOf("lane_role_") === 0)
      .map((str) => str.substring("lane_role_".length))
      .map((id) => ({
        label: strings[`lane_role_${id}` as keyof Strings],
        id: Number(id),
      }));

    const patchList = patch
      .map((_patch, index) => ({
        label: _patch.name,
        id: index,
      }))
      .reverse();

    const modeList = Object.keys(strings)
      .filter((str) => str.indexOf("game_mode_") === 0)
      .map((str) => str.substring("game_mode_".length))
      .map((id) => ({
        label: strings[`game_mode_${id}` as keyof Strings],
        id: Number(id),
      }));

    const lobbyTypeList = Object.keys(strings)
      .filter((str) => str.indexOf("lobby_type_") === 0)
      .map((str) => str.substring("lobby_type_".length))
      .map((id) => ({
        label: strings[`lobby_type_${id}` as keyof Strings],
        id: Number(id),
      }));

    const regionList = Object.keys(region).map((id) => ({
      label: strings[`region_${id}` as keyof Strings],
      id: Number(id),
    }));

    const factionList = [
      {
        label: strings.general_radiant,
        id: 1,
      },
      {
        label: strings.general_dire,
        id: 0,
      },
    ];

    const resultList = [
      {
        label: strings.td_win,
        id: 1,
      },
      {
        label: strings.td_loss,
        id: 0,
      },
    ];

    const dateList = [
      {
        label: strings.filter_last_week,
        id: 7,
      },
      {
        label: strings.filter_last_month,
        id: 30,
      },
      {
        label: strings.filter_last_3_months,
        id: 90,
      },
      {
        label: strings.filter_last_6_months,
        id: 180,
      },
      {
        label: strings.filter_last_12_months,
        id: 360,
      },
    ];

    const significantList = [
      {
        label: strings.filter_significant_include,
        id: 0,
      },
    ];

    const gamesPlayedList = [
      {
        label: "5",
        id: 5,
      },
      {
        label: "10",
        id: 10,
      },
      {
        label: "15",
        id: 15,
      },
      {
        label: "20",
        id: 20,
      },
      {
        label: "25",
        id: 25,
      },
    ];

    const partySize = [
      {
        label: "1",
        id: 1,
      },
      {
        label: "2",
        id: 2,
      },
      {
        label: "3",
        id: 3,
      },
      {
        label: "4",
        id: 4,
      },
      {
        label: "5",
        id: 5,
      },
    ];

    const roleList = [
      {
        label: "Carry",
        id: 1,
      },
      {
        label: "Nuker",
        id: 2,
      },
      {
        label: "Initiator",
        id: 3,
      },
      {
        label: "Disabler",
        id: 4,
      },
      {
        label: "Durable",
        id: 5,
      },
      {
        label: "Escape",
        id: 6,
      },
      {
        label: "Support",
        id: 7,
      },
      {
        label: "Pusher",
        id: 8,
      },
      {
        label: "Jungler",
        id: 9,
      },
    ];

    const CustomFormField = (props: {
      label: string;
      name: string;
      dataSource: { label: string; id: number }[];
      strict?: boolean;
      limit?: number;
    }) => (
      <FormField
        formSelectionState={formSelectionState}
        history={history}
        textFieldStyle={textFieldStyle}
        size="small"
        width={220}
        {...props}
      />
    );

    // const isFilterApplied = Object.keys(formSelectionState).length > 0;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <CustomFormField
          name="hero_id"
          label={strings.filter_hero_id}
          dataSource={heroList}
          strict
          limit={1}
        />
        <CustomFormField
          name="is_radiant"
          label={strings.filter_is_radiant}
          dataSource={factionList}
          strict
          limit={1}
        />
        <CustomFormField
          name="win"
          label={strings.filter_win}
          dataSource={resultList}
          strict
          limit={1}
        />
        {/*             <CustomFormField
              name="role_id"
              label={strings.heading_lane_role}
              dataSource={roleList}
              strict
              limit={1}
            /> */}
        <CustomFormField
          name="lane_role"
          label={strings.filter_lane_role}
          dataSource={laneList}
          strict
          limit={1}
        />
        <CustomFormField
          name="patch"
          label={strings.filter_patch}
          dataSource={patchList}
          strict
          limit={1}
        />
        <CustomFormField
          name="game_mode"
          label={strings.filter_game_mode}
          dataSource={modeList}
          strict
          limit={1}
        />
        <CustomFormField
          name="lobby_type"
          label={strings.filter_lobby_type}
          dataSource={lobbyTypeList}
          strict
          limit={1}
        />
        <CustomFormField
          name="date"
          label={strings.filter_date}
          dataSource={dateList}
          strict
          limit={1}
        />
        <CustomFormField
          name="region"
          label={strings.filter_region}
          dataSource={regionList}
          strict
          limit={1}
        />
        <CustomFormField
          name="with_hero_id"
          label={strings.filter_with_hero_id}
          dataSource={heroList}
          strict
          limit={5}
        />
        <CustomFormField
          name="against_hero_id"
          label={strings.filter_against_hero_id}
          dataSource={heroList}
          strict
          limit={5}
        />
        <CustomFormField
          name="included_account_id"
          label={strings.filter_included_account_id}
          dataSource={this.state.peers.map((peer) => ({
            label: `${peer.personaname}`,
            id: peer.account_id,
          }))}
          limit={10}
        />
        <CustomFormField
          name="excluded_account_id"
          label={strings.filter_excluded_account_id}
          dataSource={this.state.peers.map((peer) => ({
            label: `${peer.personaname}`,
            id: peer.account_id,
          }))}
        />
        <CustomFormField
          name="significant"
          label={strings.filter_significant}
          dataSource={significantList}
          strict
          limit={1}
        />
        {/* <CustomFormField
              name="having"
              label={strings.explorer_having}
              dataSource={gamesPlayedList}
              strict
              limit={1}
            /> */}
        <CustomFormField
          name="party_size"
          label={strings.filter_party_size}
          dataSource={partySize}
          strict
          limit={1}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  showForm: state.app.form.show,
  currentQueryString: window.location.search,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  toggleShowForm: () => dispatch(toggleShowForm()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableFilterForm),
);
