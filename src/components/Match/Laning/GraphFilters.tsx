/**
 * @file Graph Filters.
 * @description Controlled radio filters for chart grouping, roles, and physical lanes, hiding unused undetermined categories.
 */

import React from "react";
import { PhysicalLane } from "../../../types/matchResponse";
import useStrings from "../../../hooks/useStrings.hook";
import { Spacer } from "../../Spacer/Spacer";
import {
  getRoleLabels,
  GraphMetric,
  GraphGrouping,
  RoleSelection,
  LaneRole,
} from "./laning.utils";
import { RoleFilter, RoleOptions } from "./StyledGraph";

type GraphFiltersProps = {
  metric: GraphMetric;
  players: MatchPlayer[];
  playerRoles: Map<number, LaneRole>;
  groupBy: GraphGrouping;
  setGroupBy: (value: GraphGrouping) => void;
  lane: string;
  setLane: (value: string) => void;
  role: RoleSelection;
  setRole: (value: RoleSelection) => void;
};

/**
 * Renders radio controls for choosing a grouping mode and a lane or role.
 * Undetermined options appear only when a player lacks that classification.
 * @param props Current selections, player classifications, and selection callbacks.
 * @returns Controlled filters; selection state belongs to the parent graph.
 */
const GraphFilters = ({
  metric,
  players,
  playerRoles,
  groupBy,
  setGroupBy,
  lane,
  setLane,
  role,
  setRole,
}: GraphFiltersProps) => {
  const strings = useStrings();
  const roleLabels = getRoleLabels(strings);
  const hasUndeterminedRoles = players.some(
    (player) => !playerRoles.has(player.player_slot),
  );
  const laneLabels: Record<string, string> = {
    [PhysicalLane.Bottom]: strings.laning_bottom,
    [PhysicalLane.Middle]: strings.laning_mid,
    [PhysicalLane.Top]: strings.laning_top,
    [PhysicalLane.Jungle]: strings.laning_jungle,
  };
  const hasUndeterminedLanes = players.some(
    (player) => !laneLabels[String(player.lane)],
  );
  return (
    <>
      <RoleFilter>
        <legend>{strings.laning_group}</legend>
        <RoleOptions>
          {(["role", "lane"] as const).map((value) => (
            <label key={value}>
              <input
                type="radio"
                name={`laning-group-${metric}`}
                checked={groupBy === value}
                onChange={() => setGroupBy(value)}
              />
              {value === "role" ? strings.laning_role : strings.laning_lane}
            </label>
          ))}
        </RoleOptions>
      </RoleFilter>
      <Spacer variant="1" />
      {groupBy === "lane" ? (
        <RoleFilter>
          <legend>{strings.laning_filter_lane}</legend>
          <RoleOptions>
            {[
              ["all", strings.laning_all_lanes],
              ...Object.entries(laneLabels).filter(
                ([value]) => value !== String(PhysicalLane.Jungle),
              ),
              ["unknown", strings.laning_unknown_lane],
            ]
              .filter(([value]) => value !== "unknown" || hasUndeterminedLanes)
              .map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`laning-lane-${metric}`}
                    checked={lane === value}
                    onChange={() => setLane(value)}
                  />
                  {label}
                </label>
              ))}
          </RoleOptions>
        </RoleFilter>
      ) : (
        <RoleFilter>
          <legend>{strings.laning_filter_role}</legend>
          <RoleOptions>
            {(
              [
                ["all", strings.laning_all_roles],
                ...Object.entries(roleLabels),
                ["unknown", strings.laning_unknown_role],
              ] as [typeof role, string][]
            )
              .filter(([value]) => value !== "unknown" || hasUndeterminedRoles)
              .map(([value, label]) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={`laning-role-${metric}`}
                    value={value}
                    checked={role === value}
                    onChange={() => setRole(value)}
                  />
                  {label}
                </label>
              ))}
          </RoleOptions>
        </RoleFilter>
      )}
    </>
  );
};

export default GraphFilters;
