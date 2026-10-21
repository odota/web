/**
 * @file Lane Replay Comparison.
 * @description Compares Radiant and Dire lane groups at early-game snapshots.
 */

import React, { useState } from "react";
import { ToggleButton } from "@mui/material";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import BlockIcon from "@mui/icons-material/Block";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { player_colors as playerColors } from "dotaconstants";
import config from "../../../config";
import constants from "../../constants";
import { IconRadiant, IconDire } from "../../Icons";
import useStrings from "../../../hooks/useStrings.hook";
import { getLaningRoles, getPlayerIdentity, getStatAtMinute, getLevelAtMinute, formatStat, getRoleLabels, LaneRole } from "./laning.utils";
import { getReplayKDA } from "./replay.utils";
import { TeamTable } from "./LaningTable";
import { TableCaption, SummaryTeam, SummaryLevels, ReplaySummary } from "./StyledLaning";
import { ComparisonToggles } from "./RoleComparison";


/** Physical lane matchups, ordered top to bottom from Radiant’s perspective. */
const lanes: { label: string; radiant: LaneRole[]; dire: LaneRole[]; matchup: string }[] = [
  { label: "Top Lane", radiant: ["offlane", "softSupport"], dire: ["carry", "hardSupport"], matchup: "Offlane + Soft Support vs Carry + Hard Support" },
  { label: "Mid Lane", radiant: ["midlane"], dire: ["midlane"], matchup: "Midlane vs Midlane" },
  { label: "Bottom Lane", radiant: ["carry", "hardSupport"], dire: ["offlane", "softSupport"], matchup: "Carry + Hard Support vs Offlane + Soft Support" },
];

/**
 * Displays lane selectors, cumulative team statistics, differences, and a result summary.
 * Snapshots use completed two-minute checkpoints up to minute ten. Short matches
 * fall back to their latest checkpoint; matches under two minutes show no statistics.
 * Lane totals require every assigned player and sample. Levels are summed per hero,
 * and the summary winner is determined by the gold_t difference.
 * @param props Component properties.
 * @param props.match Match roster, duration in seconds, and minute-indexed histories.
 * @returns Lane comparison controls, statistics table, and summary card.
 */
const LaneReplayComparison = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [laneIndex, setLaneIndex] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(10);
  const intervals = [2, 4, 6, 8, 10].filter((minute) => minute * 60 <= match.duration);
  const minute = intervals.includes(selectedMinute) ? selectedMinute : intervals[intervals.length - 1];
  const lane = lanes[laneIndex];
  const roleLabels = getRoleLabels(strings);
  const rolePositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };
  /**
   * Renders localized role names with aligned sprite icons and plus separators.
   * @param roles Ordered roles belonging to one side of the lane.
   * @returns Wrapping role labels that keep each icon beside its name.
   */
  const renderRoles = (roles: LaneRole[]) => <span style={{ display: "inline-flex", alignItems: "center", flexWrap: "wrap", justifyContent: "center", gap: 4 }}>{roles.map((role, index) => <React.Fragment key={role}>{index > 0 && <span>+</span>}<span style={{ display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}><span className="role-icon" aria-hidden="true" style={{ backgroundPosition: `${rolePositions[role]}% center` }} />{roleLabels[role]}</span></React.Fragment>)}</span>;
  const metricIcons: Record<string, string> = { Gold: "gold", "Last hits": "lh", "Combined levels": "levels", XP: "xp", Kills: "hero_damage", Deaths: "hero_damage", Assists: "hero_damage" };
  /**
   * Selects the display icon for a table statistic.
   * @param label Metric label used by the table.
   * @returns The deny icon or the shared metric icon.
   */
  const metricIcon = (label: string) => label === "Denies" ? <BlockIcon aria-hidden="true" sx={{ fontSize: 16, color: constants.colorRed, verticalAlign: "middle", mr: 0.5 }} /> : <TooltipMetricIcon metric={metricIcons[label]} />;
  const groups = [lane.radiant, lane.dire].map((roles, side) => {
    const players = getLaningRoles(match.players, side === 0);
    return roles.map((role) => players[role]);
  });
  /**
   * Totals a statistic only when every lane member has a value.
   * @param side Group index: zero for Radiant, one for Dire.
   * @param read Reads the selected statistic; null indicates missing data.
   * @returns Combined value, or null for an undetermined role or missing sample.
   */
  const sum = (side: number, read: (player: MatchPlayer) => number | null): number | null => {
    const values = groups[side].map((player) => player ? read(player) : null);
    return values.every((value) => value !== null) ? values.reduce<number>((total, value) => total + value!, 0) : null;
  };
  /**
   * Renders horizontal player identities with hero icons and player-slot colors.
   * @param side Group index: zero for Radiant, one for Dire.
   * @returns Player labels, including unavailable placeholders for missing roles.
   */
  const renderPlayers = (side: number) => <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>{groups[side].map((player, index) => {
    if (!player) return <div key={index}>{strings.laning_unavailable}</div>;
    const identity = getPlayerIdentity(player, strings);
    return <div key={player.player_slot} className="player-identity" style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
      {identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt={identity.heroName} width={24} height={24} />}
      <span style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>{identity.playerName}</span>
    </div>;
  })}</div>;
  const metrics = minute === undefined ? [] : [
    { label: "Gold", read: (p: MatchPlayer) => getStatAtMinute(p, "gold_t", minute) },
    { label: "Last hits", read: (p: MatchPlayer) => getStatAtMinute(p, "lh_t", minute) },
    { label: "Denies", read: (p: MatchPlayer) => getStatAtMinute(p, "dn_t", minute) },
    { label: "Combined levels", read: (p: MatchPlayer) => getLevelAtMinute(p, minute) },
    { label: "XP", read: (p: MatchPlayer) => getStatAtMinute(p, "xp_t", minute) },
    { label: "Kills", read: (p: MatchPlayer) => getReplayKDA(p, minute)[0] },
    { label: "Deaths", read: (p: MatchPlayer) => getReplayKDA(p, minute)[1] },
    { label: "Assists", read: (p: MatchPlayer) => getReplayKDA(p, minute)[2] },
  ];
  /**
   * Formats a signed difference using the leading team's crest and color.
   * A positive difference represents Radiant; zero is neutral.
   * @param value Radiant total minus Dire total, or null when unavailable.
   * @returns An absolute lead badge, neutral zero, or an em dash.
   */
  const renderDifference = (value: number | null) => value === null ? "—" : value === 0 ? <span style={{ color: constants.textColorSecondary }}>0</span> : <SummaryTeam $radiant={value > 0}>
    {value > 0 ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}+{formatStat(Math.abs(value))}
  </SummaryTeam>;
  /**
   * Calculates the signed difference between complete lane totals.
   * @param read Reads one player's statistic at the active snapshot.
   * @returns Radiant minus Dire, or null if either total is unavailable.
   */
  const difference = (read: (player: MatchPlayer) => number | null) => {
    const radiant = sum(0, read);
    const dire = sum(1, read);
    return radiant !== null && dire !== null ? radiant - dire : null;
  };
  return <>
    <ComparisonToggles exclusive value={laneIndex} onChange={(_, value: number | null) => { if (value !== null) setLaneIndex(value); }} aria-label="Lane matchup">
      {lanes.map((entry, index) => <ToggleButton key={entry.label} value={index}><span className="matchup-label"><small className="lane-label">{entry.label}</small><span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}><span>{renderRoles(entry.radiant)}</span><small style={{ color: constants.textColorSecondary, fontSize: 10 }}>vs</small><span>{renderRoles(entry.dire)}</span></span></span></ToggleButton>)}
    </ComparisonToggles>
    <ComparisonToggles exclusive value={minute ?? null} onChange={(_, value: number | null) => { if (value !== null) setSelectedMinute(value); }} aria-label="Lane comparison time">
      {intervals.map((value) => <ToggleButton key={value} value={value}><AccessTimeIcon aria-hidden="true" sx={{ fontSize: 14, color: constants.colorBlue }} />{value}:00</ToggleButton>)}
    </ComparisonToggles>
    {minute === undefined ? <TableCaption>{strings.laning_unavailable}</TableCaption> : <TeamTable><div className="table-scroll"><table>
      <thead><tr><th /><th><SummaryTeam $radiant><IconRadiant width="16" height="16" />{strings.general_radiant}</SummaryTeam></th><th><SummaryTeam $radiant={false}><IconDire width="16" height="16" />{strings.general_dire}</SummaryTeam></th><th>{strings.laning_difference}</th><th title={strings.laning_percentage_difference_hint}>{strings.laning_difference_percent}</th></tr><tr><th>{strings.th_players}</th><th>{renderPlayers(0)}</th><th>{renderPlayers(1)}</th><th /><th /></tr></thead>
      <tbody>{metrics.map(({ label, read }) => {
        const values = [sum(0, read), sum(1, read)];
        const delta = values[0] !== null && values[1] !== null ? values[0] - values[1] : null;
        const average = values[0] !== null && values[1] !== null ? (Math.abs(values[0]) + Math.abs(values[1])) / 2 : null;
        const percent = delta === null || average === null ? null : average === 0 ? 0 : Math.abs(delta) / average * 100;
        return <tr key={label}><td>{metricIcon(label)}{label}</td><td>{metricIcon(label)}{formatStat(values[0])}</td><td>{metricIcon(label)}{formatStat(values[1])}</td><td>{renderDifference(delta)}</td><td>{percent === null ? "—" : delta === 0 ? <span style={{ color: constants.textColorSecondary }}>0%</span> : <SummaryTeam $radiant={delta! > 0}>{delta! > 0 ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}{percent.toFixed(1)}%</SummaryTeam>}</td></tr>;
      })}</tbody>
    </table></div></TeamTable>}
    {minute !== undefined && (() => {
      const goldDifference = difference((player) => getStatAtMinute(player, "gold_t", minute));
      const levelDifference = difference((player) => getLevelAtMinute(player, minute));
      const radiantWon = goldDifference !== null && goldDifference > 0;
      return <ReplaySummary aria-label="Lane comparison summary">
        <div className="summary-time"><AccessTimeIcon aria-hidden="true" sx={{ fontSize: 16, color: constants.colorBlue }} />{minute}:00</div>
        <span>The {lane.label.toLowerCase()} {goldDifference === null ? "result is unavailable" : goldDifference === 0 ? "was tied" : <>was won by <SummaryTeam $radiant={radiantWon}>{radiantWon ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}{radiantWon ? strings.general_radiant : strings.general_dire}</SummaryTeam></>} with a net worth difference of <span style={{ color: constants.golden, fontWeight: 600, whiteSpace: "nowrap" }}><TooltipMetricIcon metric="gold" />{formatStat(goldDifference === null ? null : Math.abs(goldDifference))}</span> and a combined levels difference of <SummaryLevels><TrendingUpIcon aria-hidden="true" />{formatStat(levelDifference === null ? null : Math.abs(levelDifference))}</SummaryLevels>.</span>
      </ReplaySummary>;
    })()}
  </>;
};
export default LaneReplayComparison;
