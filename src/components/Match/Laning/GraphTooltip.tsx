/**
 * @file Graph Tooltip.
 * @description Displays hovered hero values and optional role, lane, or team comparisons for Net Worth and Levels charts.
 */

import { formatTemplateToString } from "../../../utility";
import React from "react";
import config from "../../../config";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { heroes } from "dotaconstants";
import useStrings from "../../../hooks/useStrings.hook";
import constants from "../../constants";
import { getHeroLevel } from "../../Visualizations/Graph/data";
import { getLaningRoles, LaneRole, getRoleLabels } from "./laning.utils";

import { LaningTooltip, TooltipColumns, TooltipDifferences, DifferenceRow, DifferenceValue, TeamIndicator, TooltipTeamTotals } from "./StyledGraph";

/**
 * Displays hovered hero values, optional team totals, and role or lane advantages.
 * Team totals use the full roster at the hovered minute, regardless of filtering.
 * Positive differences favor Radiant; negative differences favor Dire.
 * @param props Recharts hover data, full player roster, metric, and visibility options.
 * @returns Tooltip content, or null when inactive or without hover data.
 */
const GraphTooltip = ({
  active,
  label,
  payload,
  players,
  metric,
  lanePlayers,
  showTeamTotals = true,
  teamTotalsEnabled = true,
  showAdvantageSummary = true,
}: {
  active?: boolean;
  label?: string;
  payload?: any[];
  players: MatchPlayer[];
  metric: "networth" | "levels";
  lanePlayers?: MatchPlayer[];
  showTeamTotals?: boolean;
  teamTotalsEnabled?: boolean;
  showAdvantageSummary?: boolean;
}) => {
  const strings = useStrings();
  const roleLabels = getRoleLabels(strings);
  const radiantRoles = getLaningRoles(players, true);
  const direRoles = getLaningRoles(players, false);
  const differences = (Object.keys(roleLabels) as LaneRole[]).flatMap((role) => {
    const radiant = radiantRoles[role];
    const dire = direRoles[role];
    if(!radiant || !dire) return [];
    const radiantValue = payload?.find(
      (entry) => entry.dataKey === heroes[radiant.hero_id]?.localized_name,
    )?.value;
    const direValue = payload?.find(
      (entry) => entry.dataKey === heroes[dire.hero_id]?.localized_name,
    )?.value;
    if(!Number.isFinite(radiantValue) || !Number.isFinite(direValue)) return [];
    return [{ role, difference: radiantValue - direValue }];
  });
  /**
   * Adds hovered values for one side of the selected lane.
   * @param isRadiant Which team’s visible players to total.
   * @returns The combined value, or null if the team or a value is missing.
   */
  const laneTotal = (isRadiant: boolean) => {
    const team = lanePlayers?.filter((player) => player.isRadiant === isRadiant);
    if(!team?.length) return null;
    const values = team.map((player) => payload?.find(
      (entry) => entry.dataKey === heroes[player.hero_id]?.localized_name,
    )?.value);
    return values.every((value) => Number.isFinite(value))
      ? values.reduce((sum, value) => sum + value, 0) : null;
  };
  const radiantTotal = laneTotal(true);
  const direTotal = laneTotal(false);
  const laneDifference = radiantTotal !== null && direTotal !== null
    ? radiantTotal - direTotal : null;
  // Read the full roster, rather than the filtered tooltip payload, for team totals.
  const hoveredMinute = label?.match(/^(\d+):00$/)?.[1];
  /**
   * Calculates full-team totals independently of the visible hero filter.
   * Gold is summed directly; XP is converted to each hero’s level before summing.
   * @param isRadiant Which team to total.
   * @returns The hovered minute’s total, or null without five valid player values.
   */
  const teamTotal = (isRadiant: boolean): number | null => {
    if (hoveredMinute === undefined) return null;
    const minute = Number(hoveredMinute);
    const team = players.filter((player) => player.isRadiant === isRadiant);
    const field = metric === "networth" ? "gold_t" : "xp_t";
    if (team.length !== 5 || team.some((player) => !Number.isFinite(player[field]?.[minute]))) {
      return null;
    }
    return team.reduce((total, player) => {
      const value = player[field][minute];
      return total + (metric === "levels" ? getHeroLevel(value) : value);
    }, 0);
  };
  const radiantTeamTotal = teamTotal(true);
  const direTeamTotal = teamTotal(false);
  const totalDifference = radiantTeamTotal !== null && direTeamTotal !== null
    ? radiantTeamTotal - direTeamTotal : null;
  const teamTotals = (
        <TooltipTeamTotals $left>
          <h4>{(metric === "networth" ? strings.laning_team_networth : strings.laning_team_level_totals)}</h4>
          {showAdvantageSummary && <DifferenceRow>
            <span>{strings.laning_difference}</span>
            {totalDifference === null ? <span>{strings.laning_unavailable}</span> : (
              <DifferenceValue $difference={totalDifference}>
                {totalDifference !== 0 && "+"}{Math.abs(totalDifference).toLocaleString("en-US")} {(metric === "networth" ? strings.laning_gold : Math.abs(totalDifference) === 1 ? strings.laning_level : strings.laning_levels)}
              </DifferenceValue>
            )}
          </DifferenceRow>}
          {[true, false].map((isRadiant) => {
            const total = isRadiant ? radiantTeamTotal : direTeamTotal;
            return (
              <DifferenceRow key={String(isRadiant)}>
                <TeamIndicator $isRadiant={isRadiant}>
                  {isRadiant ? strings.general_radiant : strings.general_dire}
                </TeamIndicator>
                <span>
                  {total === null ? strings.laning_unavailable : `${total.toLocaleString("en-US")} ${(metric === "networth" ? strings.laning_gold : strings.laning_levels)}`}
                </span>
              </DifferenceRow>
            );
          })}
        </TooltipTeamTotals>
  );
  const hideBreakdown = showTeamTotals;
  if (!active || !payload?.length) return null;
  return (
    <LaningTooltip>
      <div className="label"><AccessTimeIcon aria-hidden="true" />{label}</div>
      <TooltipColumns>
        {showTeamTotals && teamTotalsEnabled && teamTotals}
        {showAdvantageSummary && !hideBreakdown && <div>
        {lanePlayers ? (
          <TooltipDifferences $left>
            <h4>{strings.laning_lane_totals}</h4>
            <DifferenceRow>
              <span>{strings.general_radiant}</span>
              <span>{radiantTotal?.toLocaleString() ?? strings.laning_unavailable} {radiantTotal !== null && (metric === "networth" ? strings.laning_gold : strings.laning_levels)}</span>
            </DifferenceRow>
            <DifferenceRow>
              <span>{strings.general_dire}</span>
              <span>{direTotal?.toLocaleString() ?? strings.laning_unavailable} {direTotal !== null && (metric === "networth" ? strings.laning_gold : strings.laning_levels)}</span>
            </DifferenceRow>
            <DifferenceRow>
              <span>{laneDifference === null || laneDifference === 0 ? strings.laning_advantage : formatTemplateToString(strings.laning_leads, { team: laneDifference > 0 ? strings.general_radiant : strings.general_dire })}</span>
              {laneDifference === null ? <span>{strings.laning_unavailable}</span> : (
                <DifferenceValue $difference={laneDifference}>
                  {laneDifference !== 0 && "+"}{Math.abs(laneDifference).toLocaleString()}{" "}
                  {metric === "networth" ? strings.laning_gold : Math.abs(laneDifference) === 1 ? strings.laning_level : strings.laning_levels}
                </DifferenceValue>
              )}
            </DifferenceRow>
          </TooltipDifferences>
        ) : differences.length > 0 && (
          <TooltipDifferences $left>
            <h4>{strings.laning_advantage}</h4>
            {differences.map(({ role, difference }) => (
              <DifferenceRow key={role}>
                <span>{roleLabels[role]}</span>
                <DifferenceValue $difference={difference}>
                  {difference !== 0 && "+"}
                  {Math.abs(difference).toLocaleString()}{" "}
                  {metric === "networth"
                    ? strings.laning_gold
                    : Math.abs(difference) === 1 ? strings.laning_level : strings.laning_levels}
                </DifferenceValue>
              </DifferenceRow>
            ))}
          </TooltipDifferences>
        )}
        </div>}
        <div>
          {payload
            ?.slice()
            .sort((a, b) => b.value - a.value)
            ?.map((data, i) => {
              const player = players.find(
                (entry) => heroes[entry.hero_id]?.localized_name === data.dataKey,
              );
              const hero = player && heroes[player.hero_id];
              return (
                <div
                  key={i}
                  className={`data ${player?.isRadiant ? "isRadiant" : "isDire"}`}
                  style={{ borderLeft: `3px solid ${data.color}` }}
                >
                  {hero && (
                    <img
                      src={config.VITE_IMAGE_CDN + hero.icon}
                      alt={hero.localized_name}
                      width={18}
                      height={18}
                      style={{ verticalAlign: "middle", marginRight: 6 }}
                    />
                  )}
                  {typeof data.value === "number" ? data.value.toLocaleString("en-US") : data.value}

                </div>
              );
            })}
        </div>
      </TooltipColumns>
    </LaningTooltip>
  );
};

export default GraphTooltip;
