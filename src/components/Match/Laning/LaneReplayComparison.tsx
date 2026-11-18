import { LeadValue } from "../../Visualizations/Graph/TooltipEntryGap";
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
import styles from "./RoleComparison.module.css";


/** Physical lane matchups, ordered top to bottom from Radiant’s perspective. */
const lanes: { label: string; radiant: LaneRole[]; dire: LaneRole[]; matchup: string }[] = [
  { label: "Top Lane", radiant: ["offlane", "softSupport"], dire: ["carry", "hardSupport"], matchup: "Offlane + Soft Support vs Carry + Hard Support" },
  { label: "Mid Lane", radiant: ["midlane"], dire: ["midlane"], matchup: "Midlane vs Midlane" },
  { label: "Bottom Lane", radiant: ["carry", "hardSupport"], dire: ["offlane", "softSupport"], matchup: "Carry + Hard Support vs Offlane + Soft Support" },
];

/**
 * Formats a difference using the shared green lead indicator.
 * A positive difference represents Radiant; zero is neutral.
 * @param value Radiant total minus Dire total, or null when unavailable.
 * @returns An absolute lead badge, neutral zero, or an em dash.
 */
const renderDifference = (value: number | null, percent: number | null) => value === null ? "—" : value === 0 ? <span style={{ color: constants.textColorSecondary }}>0 <span className="stat-percentage"><LeadValue style={{ fontSize: "inherit" }}>0% more</LeadValue></span></span> : <LeadValue>
  {formatStat(Math.abs(value))} <span className="stat-percentage"><LeadValue style={{ fontSize: "inherit" }}>{percent?.toFixed(0)}% more</LeadValue></span>
</LeadValue>;

type LaneStat = {
  label: string;
  icon: React.ReactNode;
  radiant: number | null;
  dire: number | null;
};

/**
 * Displays both teams' totals and highlights the team with the advantage.
 * Higher totals are favored except for deaths, where fewer is better.
 * @param props.label Statistic name.
 * @param props.icon Icon displayed alongside each total.
 * @param props.radiant Radiant total, or null when unavailable.
 * @param props.dire Dire total, or null when unavailable.
 * @example
 * // Radiant leads by 8 last hits, or 40% of the two teams' average.
 * <LaneStatRow label="Last hits" icon={<TooltipMetricIcon metric="lh" />} radiant={24} dire={16} />
 */
const LaneStatRow = ({ label, icon, radiant, dire }: LaneStat) => {
  const strings = useStrings();
  const delta = radiant !== null && dire !== null ? radiant - dire : null;
  const average = radiant !== null && dire !== null ? (Math.abs(radiant) + Math.abs(dire)) / 2 : null;
  const percent = delta === null || average === null ? null : average === 0 ? 0 : Math.abs(delta) / average * 100;
  const advantage = delta === null || label !== "Deaths" ? delta : -delta;

  return (
    <tr>
      <td><strong>{label}</strong></td>
      {[radiant, dire].map((value, side) => (
        <td key={side}>
          <div className="stat-comparison">
            <span className="stat-original"><strong>{formatStat(value)}</strong>{icon}</span>
            {advantage !== null && (side === 0 ? advantage > 0 : advantage < 0) && (
              <span className="stat-difference" title={strings.laning_percentage_difference_hint}>
                {renderDifference(advantage, percent)}
              </span>
            )}
          </div>
        </td>
      ))}
    </tr>
  );
};

type LaneStatsTableProps = {
  radiantPlayers: React.ReactNode;
  direPlayers: React.ReactNode;
  rows: LaneStat[];
};

/**
 * Displays both lane lineups and compares their totals for each statistic.
 * @param props.radiantPlayers Player labels for the Radiant lineup.
 * @param props.direPlayers Player labels for the Dire lineup.
 * @param props.rows Statistics in display order. A null team total indicates missing data.
 * @example
 * <LaneStatsTable
 *   radiantPlayers={<span>Radiant carry</span>}
 *   direPlayers={<span>Dire offlaner</span>}
 *   rows={[{ label: "Last hits", icon: <TooltipMetricIcon metric="lh" />, radiant: 24, dire: 16 }]}
 * />
 */
const LaneStatsTable = ({ radiantPlayers, direPlayers, rows }: LaneStatsTableProps) => {
  const strings = useStrings();

  return (
    <TeamTable className="replay-comparison-table">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th />
              <th>
                <SummaryTeam $radiant><IconRadiant width="16" height="16" />{strings.general_radiant}</SummaryTeam>
              </th>
              <th>
                <SummaryTeam $radiant={false}><IconDire width="16" height="16" />{strings.general_dire}</SummaryTeam>
              </th>
            </tr>
            <tr>
              <th>{strings.th_players}</th>
              <th>{radiantPlayers}</th>
              <th>{direPlayers}</th>
            </tr>
          </thead>
          <tbody>{rows.map((row) => <LaneStatRow key={row.label} {...row} />)}</tbody>
        </table>
      </div>
    </TeamTable>
  );
};

type LaneResultProps = {
  laneLabel: string;
  goldDifference: number | null;
  levelDifference: number | null;
};

/**
 * Describes the lane result using the net worth leader and their combined level difference.
 * @param props.laneLabel Display name of the lane.
 * @param props.goldDifference Radiant gold minus Dire gold. Zero indicates a tie, and null indicates an unavailable result.
 * @param props.levelDifference Radiant combined levels minus Dire combined levels, or null when unavailable.
 * @example
 * // English output: Radiant won the top lane with a net worth advantage of 1,200 gold
 * // and a combined levels advantage of 2 combined levels
 * <LaneResult laneLabel="Top Lane" goldDifference={1200} levelDifference={-2} />
 * @example
 * <LaneResult laneLabel="Mid Lane" goldDifference={0} levelDifference={1} />
 * @example
 * <LaneResult laneLabel="Bottom Lane" goldDifference={null} levelDifference={null} />
 */
const LaneResult = ({ laneLabel, goldDifference, levelDifference }: LaneResultProps) => {
  const strings = useStrings();
  const laneName = laneLabel.toLowerCase();
  if (goldDifference === null) return <>The {laneName} result is unavailable</>;
  if (goldDifference === 0) return <>The {laneName} was tied</>;

  const radiantWon = goldDifference > 0;
  const levelDisadvantage = levelDifference !== null && (radiantWon ? levelDifference < 0 : levelDifference > 0);

  return (
    <>
      <SummaryTeam $radiant={radiantWon}>
        {radiantWon ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}
        {radiantWon ? strings.general_radiant : strings.general_dire}
      </SummaryTeam>
      {" won the "}{laneName} with a net worth advantage of{" "}
      <span style={{ color: constants.golden, fontWeight: 600, whiteSpace: "nowrap", display: "inline-flex", alignItems: "center", gap: 5 }}>
        {formatStat(Math.abs(goldDifference))}
        <img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />
        {strings.laning_gold}
      </span>
      {" and a combined levels "}{levelDisadvantage ? "disadvantage" : "advantage"} of{" "}
      <SummaryLevels>
        {formatStat(levelDifference === null ? null : Math.abs(levelDifference))}
        <TrendingUpIcon aria-hidden="true" />
        {strings.laning_combined}
      </SummaryLevels>
    </>
  );
};

type LaneResultSummaryProps = LaneResultProps & { minute: number };

/**
 * Displays the snapshot timestamp and the lane result as a punctuated sentence.
 * @param props.minute Snapshot minute displayed as minute:00.
 * @param props.laneLabel Display name of the lane.
 * @param props.goldDifference Radiant gold minus Dire gold, or null when unavailable.
 * @param props.levelDifference Radiant combined levels minus Dire combined levels, or null when unavailable.
 * @example
 * // English output shows 10:00 followed by "The mid lane was tied."
 * <LaneResultSummary minute={10} laneLabel="Mid Lane" goldDifference={0} levelDifference={1} />
 */
const LaneResultSummary = ({ minute, ...result }: LaneResultSummaryProps) => {
  return (
    <ReplaySummary aria-label="Lane comparison summary">
      <div className="summary-time">
        <AccessTimeIcon aria-hidden="true" sx={{ fontSize: 16, color: constants.colorBlue }} />
        {minute}:00
      </div>
      <span><LaneResult {...result} />.</span>
    </ReplaySummary>
  );
};

type LaneMatchupTogglesProps = {
  laneIndex: number;
  onSelect: (index: number) => void;
};

const LaneMatchupToggles = ({ laneIndex, onSelect }: LaneMatchupTogglesProps) => {
  const roleLabels = getRoleLabels(useStrings());
  const rolePositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };

  const renderRoles = (roles: LaneRole[]) => (
    <span className={styles.laneRoles}>
      {roles.map((role, index) => (
        <React.Fragment key={role}>
          {index > 0 && <span>+</span>}
          <span className={styles.laneRole}>
            <span className={styles.laneRoleIcon} aria-hidden="true" style={{ backgroundPosition: `${rolePositions[role]}% center` }} />
            {roleLabels[role]}
          </span>
        </React.Fragment>
      ))}
    </span>
  );

  return (
    <ComparisonToggles
      exclusive
      value={laneIndex}
      onChange={(_, index: number | null) => { if (index !== null) onSelect(index); }}
      aria-label="Lane matchup"
    >
      {lanes.map(({ label, radiant, dire }, index) => (
        <ToggleButton key={label} value={index}>
          <span className={styles.matchupLabel}>
            <small className={styles.laneLabel}>{label}</small>
            <span className={styles.matchupRoles}>
              <span>{renderRoles(radiant)}</span>
              <small className={styles.matchupSeparator}>vs</small>
              <span>{renderRoles(dire)}</span>
            </span>
          </span>
        </ToggleButton>
      ))}
    </ComparisonToggles>
  );
};

type LaneSnapshotTogglesProps = {
  intervals: number[];
  minute: number | undefined;
  onSelect: (minute: number) => void;
};

const LaneSnapshotToggles = ({ intervals, minute, onSelect }: LaneSnapshotTogglesProps) => (
  <ComparisonToggles
    exclusive
    value={minute ?? null}
    onChange={(_, value: number | null) => { if (value !== null) onSelect(value); }}
    aria-label="Lane comparison time"
  >
    {intervals.map((value) => (
      <ToggleButton key={value} value={value}>
        <AccessTimeIcon aria-hidden="true" className={styles.laneSnapshotIcon} />
        {value}:00
      </ToggleButton>
    ))}
  </ComparisonToggles>
);

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
  const renderPlayers = (side: number) => <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12 }}>{groups[side].map((player, index) => {
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
    <LaneMatchupToggles laneIndex={laneIndex} onSelect={setLaneIndex} />
    <LaneSnapshotToggles intervals={intervals} minute={minute} onSelect={setSelectedMinute} />
    {minute === undefined ? (
      <TableCaption>{strings.laning_unavailable}</TableCaption>
    ) : (
      <LaneStatsTable
        radiantPlayers={renderPlayers(0)}
        direPlayers={renderPlayers(1)}
        rows={metrics.map(({ label, read }) => ({
          label,
          icon: metricIcon(label),
          radiant: sum(0, read),
          dire: sum(1, read),
        }))}
      />
    )}
    {minute !== undefined && (
      <LaneResultSummary
        laneLabel={lane.label}
        minute={minute}
        goldDifference={difference((player) => getStatAtMinute(player, "gold_t", minute))}
        levelDifference={difference((player) => getLevelAtMinute(player, minute))}
      />
    )}
  </>;
};
export default LaneReplayComparison;
