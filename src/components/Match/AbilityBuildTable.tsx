import React from "react";
import { isRadiant, getTeamName } from "../../utility";
import { IconRadiant, IconDire } from "../Icons";
import Heading from "../Heading/Heading";
import Table from "../Table/Table";
import { Spacer } from "../Spacer/Spacer";

const filterMatchPlayers = (players: MatchPlayer[], team = "") =>
  players
    .filter(
      (player) =>
        (team === "radiant" && isRadiant(player.player_slot)) ||
        (team === "dire" && !isRadiant(player.player_slot)) ||
        team === "",
    )
    .sort((a, b) => a.player_slot - b.player_slot);

const AbilityBuildTable = ({
  players = [],
  columns,
  heading = "",
  radiantTeam = {},
  direTeam = {},
  summable = false,
}: {
  players: MatchPlayer[];
  columns: any[];
  heading: string;
  radiantTeam: any;
  direTeam: any;
  summable?: boolean;
}) => (
  <div>
    <Heading
      title={`${getTeamName(radiantTeam, true)} - ${heading}`}
      icon={<IconRadiant />}
    />
    <Spacer variant="1" />
    <Table
      data={filterMatchPlayers(players, "radiant")}
      columns={columns}
      summable={summable}
    />
    <Heading
      title={`${getTeamName(direTeam, false)} - ${heading}`}
      icon={<IconDire />}
    />
    <Spacer variant="1" />
    <Table
      data={filterMatchPlayers(players, "dire")}
      columns={columns}
      summable={summable}
    />
  </div>
);

export default AbilityBuildTable;
