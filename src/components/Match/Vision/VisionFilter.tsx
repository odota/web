import React from "react";
import { Checkbox } from "@mui/material";
import Table from "../../Table/Table";
import Heading from "../../Heading/Heading";

import PlayerThumb from "../PlayerThumb/PlayerThumb";
import config from "../../../config";

const data = [
  {
    type: "observer",
    image: (
      <img
        height="24"
        src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_observer.png`}
        alt="Observer ward"
      />
    ),
  },
  {
    type: "sentry",
    image: (
      <img
        height="24"
        src={`${config.VITE_IMAGE_CDN}/apps/dota2/images/dota_react/items/ward_sentry.png`}
        alt="Sentry ward"
      />
    ),
  },
];

type VisionFilterProps = {
  match: Match;
  parent: {
    state: VisionState;
    setPlayer: Function;
    setTeam: Function;
    setTypeWard: Function;
    checkedTypeWard: Function;
    onCheckAllWardsTeam: Function;
  };
  strings: Strings;
};

class VisionFilter extends React.Component<VisionFilterProps> {
  columns(index: number) {
    const { teams } = this.props.parent.state;
    const { strings } = this.props;
    return [
      {
        displayName: (
          <Checkbox
            checked={teams[index === 0 ? "radiant" : "dire"]}
            onChange={(event, checked) => {
              this.props.parent.setTeam(
                index === 0 ? "radiant" : "dire",
                checked,
              );
            }}
          />
        ),
        displayFn: (row: any) => row.image,
      },
      this.playerColumn(0 + index),
      this.playerColumn(1 + index),
      this.playerColumn(2 + index),
      this.playerColumn(3 + index),
      this.playerColumn(4 + index),
      {
        displayName: strings.chat_filter_all,
        displayFn: (row: any) => (
          <Checkbox
            checked={this.props.parent.checkedTypeWard(index, row.type)}
            onChange={() => {
              this.props.parent.setTypeWard(index, row.type);
            }}
          />
        ),
      },
    ];
  }

  playerColumn(playerNumber: number) {
    return {
      displayName: (
        <PlayerThumb {...this.props.match.players[playerNumber]} hideText />
      ),
      displayFn: (row: any) => (
        <Checkbox
          checked={
            this.props.parent.state.players[row.type as WardType][playerNumber]
          }
          onChange={(event, checked) => {
            this.props.parent.setPlayer(playerNumber, row.type, checked);
          }}
        />
      ),
    };
  }

  render() {
    const { strings } = this.props;
    return (
      <div>
        <Heading title={strings.general_radiant} />
        <Table data={data} columns={this.columns(0)} />
        <Heading title={strings.general_dire} />
        <Table data={data} columns={this.columns(5)} />
      </div>
    );
  }
}

export default VisionFilter;
