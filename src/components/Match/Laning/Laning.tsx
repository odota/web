/**
 * @file Laning.
 * @description Composes the laning summary, player table, hero comparison, team shares, charts, and selected-player heatmap.
 */

import { formatTemplate, unpackPositionData } from "../../../utility";
import React, { useState } from "react";
import LayersIcon from "@mui/icons-material/Layers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BoltIcon from "@mui/icons-material/Bolt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { IconRadiant, IconDire } from "../../Icons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import config from "../../../config";
import { player_colors as playerColors } from "dotaconstants";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";
import { LaningPage, PageSection, SummaryTeam, SummaryResult, UltimateSummary, HeatmapContainer, HeatmapPlayers } from "./StyledLaning";
import Heading from "../../Heading/Heading";
import Heatmap from "../../Heatmap/Heatmap";
import LaningEvents from "./LaningEvents";
import MatchGraph from "../../Visualizations/Graph/MatchGraph";
import RoleComparison from "./RoleComparison";
import LastHitsTable from "./LastHitsTable";
import LaningTable, { TeamTable } from "./LaningTable";
import TooltipMetricIcon from "../../Visualizations/Graph/TooltipMetricIcon";
import { hasGraphData, getPlayerIdentity, getRoleLabels, getLaningRoles, getPlayerRoles, getLevelAtMinute, getStatAtMinute, LaneRole } from "./laning.utils";
import Graph from "./Graph";

import NetWorthShare from "./NetWorthShare";
import HeroComparison from "./HeroComparison";


import { getHeroLevel } from "../../Visualizations/Graph/data";

type LaningProps = {
  match: Match;
};

/**
 * Renders the laning summary, player table, hero comparison, team shares, and charts.
 * The selected table player controls the heatmap and chart emphasis.
 * @param props Match data used for minute-ten comparisons and early-game summaries.
 * @returns The complete laning page.
 */
const Laning = ({ match }: LaningProps) => {
  const strings = useStrings();
  const [selectedPlayer, setSelectedPlayer] = useState(0);

  const roleLabels = getRoleLabels(strings);
  const playerRoles = getPlayerRoles(match.players);
  const roleIconPositions = { carry: 0, midlane: 25, offlane: 50, softSupport: 75, hardSupport: 100 };

  const summaryMinute = Math.min(10, Math.floor(match.duration / 60));
  /**
   * Totals one team’s gold at the summary minute.
   * @param isRadiant Team to inspect.
   * @returns Total gold, or null unless all five players have a finite value.
   */
  const getTeamNetWorth = (isRadiant: boolean): number | null => {
    const team = match.players.filter((player) => player.isRadiant === isRadiant);
    if (team.length !== 5 || team.some((player) => !Number.isFinite(player.gold_t?.[summaryMinute]))) {
      return null;
    }
    return team.reduce((total, player) => total + player.gold_t[summaryMinute], 0);
  };
  const radiantNetWorth = getTeamNetWorth(true);
  const direNetWorth = getTeamNetWorth(false);
  const netWorthDifference = radiantNetWorth !== null && direNetWorth !== null
    ? radiantNetWorth - direNetWorth
    : null;
  /**
   * Totals individual hero levels at the summary minute.
   * @param isRadiant Team to inspect.
   * @returns Combined levels, or null unless all five players have valid XP.
   */
  const getTeamLevels = (isRadiant: boolean): number | null => {
    const team = match.players.filter((player) => player.isRadiant === isRadiant);
    if (
      team.length !== 5 ||
      team.some((player) => !Number.isFinite(player.xp_t?.[summaryMinute]))
    ) {
      return null;
    }
    return team.reduce(
      (total, player) => total + getHeroLevel(player.xp_t[summaryMinute]),
      0,
    );
  };
  const radiantLevels = getTeamLevels(true);
  const direLevels = getTeamLevels(false);
  const levelDifference = radiantLevels !== null && direLevels !== null
    ? radiantLevels - direLevels
    : null;
  const getTeamName = (radiant: boolean) => (radiant ? match.radiant_team?.name : match.dire_team?.name)?.trim() || (radiant ? strings.general_radiant : strings.general_dire);
  const renderTeam = (radiant: boolean) => <SummaryTeam $radiant={radiant}>
    {radiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}
    {getTeamName(radiant)}
  </SummaryTeam>;

  const renderSummaryPlayer = (player: MatchPlayer, role?: React.ReactNode, showTeam = true, showHeroName = false) => {
    const identity = getPlayerIdentity(player, strings);
    const playerRole = playerRoles.get(player.player_slot);
    return <span className="summary-hero" style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>
      {showTeam && <span className="summary-team-icon" title={getTeamName(player.isRadiant)} aria-label={getTeamName(player.isRadiant)}>
        {player.isRadiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}
      </span>}
      {playerRole && <span className="summary-role-icon" aria-hidden="true" style={{ display: "inline-block", width: 20, height: 20, flexShrink: 0, backgroundImage: 'url("/assets/images/dota2/role-icons.png")', backgroundSize: "500% auto", backgroundRepeat: "no-repeat", backgroundPosition: `${roleIconPositions[playerRole]}% center` }} />}
      {role && <strong className="summary-keyword">{role}</strong>}
      {identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={20} height={20} />}
      <span>{showHeroName ? identity.heroName : identity.playerName}</span>
    </span>;
  };

  const renderSummaryTime = (minute: number) => <span className="summary-time"><AccessTimeIcon aria-hidden="true" />{minute}:00</span>;
  return (
    <LaningPage>
      <PageSection aria-label={strings.laning_summary}>
        <Heading title={strings.laning_summary} />
        <SummaryResult $winner={netWorthDifference === null || netWorthDifference === 0 ? "tie" : netWorthDifference > 0 ? "radiant" : "dire"}>
          <div className="result-heading">
            <h3>{netWorthDifference === null ? strings.laning_unavailable : netWorthDifference === 0
              ? strings.laning_summary_even
              : formatTemplate(strings.laning_summary_winner, { team: renderTeam(netWorthDifference > 0) })}</h3>
            <span className="result-time"><AccessTimeIcon aria-hidden="true" />{summaryMinute}:00</span>
          </div>
          <div className="result-deltas">
            {[
              { key: "gold", label: strings.laning_summary_gold_lead, delta: netWorthDifference, icon: <img src="/assets/images/dota2/gold.png" alt="" width={24} height={24} /> },
              { key: "levels", label: strings.laning_summary_combined_levels, delta: levelDifference, icon: <TrendingUpIcon aria-hidden="true" /> },
            ].map(({ key, label, delta, icon }) => {
              return <div className={`result-delta delta-${key}`} key={key}>
                <span className="delta-label">{icon}{label}</span>
                <strong>{delta === null ? "—" : `${delta === 0 ? "" : "+"}${Math.abs(delta).toLocaleString()}`}</strong>
                <span className="delta-context">{delta === null ? strings.laning_unavailable : delta === 0 ? strings.laning_tied : renderTeam(delta > 0)}</span>
              </div>;
            })}
          </div>
        </SummaryResult>
        <UltimateSummary className="themed-summary" aria-label="Lane advantages">
          <h3>Lane Advantages <span className="section-time">{renderSummaryTime(summaryMinute)}</span></h3>
          {(() => {
            const lanes = [
              { name: "Top Lane", radiant: ["offlane", "softSupport"], dire: ["carry", "hardSupport"] },
              { name: "Mid Lane", radiant: ["midlane"], dire: ["midlane"] },
              { name: "Bottom Lane", radiant: ["carry", "hardSupport"], dire: ["offlane", "softSupport"] },
            ] satisfies { name: string; radiant: LaneRole[]; dire: LaneRole[] }[];
            const metrics = [
              { label: "Net worth advantage", icon: "gold", read: (player: MatchPlayer) => getStatAtMinute(player, "gold_t", summaryMinute) },
              { label: "Combined levels advantage", icon: "levels", read: (player: MatchPlayer) => getLevelAtMinute(player, summaryMinute) },
            ];
            return <div className="lane-advantage-cards">{lanes.map((lane) => <div className="lane-advantage-card" key={lane.name}>
              <h4>{lane.name}</h4>
              <div className="lane-metrics">{metrics.map(({ label, icon, read }) => {
                const total = (radiant: boolean) => {
                  const roles = getLaningRoles(match.players, radiant);
                  const values = (radiant ? lane.radiant : lane.dire).map((role) => roles[role] ? read(roles[role]!) : null);
                  return values.every((value) => value !== null) ? values.reduce<number>((sum, value) => sum + value!, 0) : null;
                };
                const radiant = total(true);
                const dire = total(false);
                const delta = radiant !== null && dire !== null ? radiant - dire : null;
                return <div className={`lane-metric lane-metric-${icon}`} key={icon}>
                  <span className="lane-metric-label"><TooltipMetricIcon metric={icon} />{label}</span>
                  <strong>{delta === null ? "—" : `${delta === 0 ? "" : "+"}${Math.abs(delta).toLocaleString()}`}</strong>
                  <span className="lane-metric-team">{delta === null ? strings.laning_unavailable : delta === 0 ? strings.laning_tied : renderTeam(delta > 0)}</span>
                </div>;
              })}</div>
            </div>)}</div>;

          })()}
        </UltimateSummary>
        <UltimateSummary className="level-six-timings themed-summary">
          <h3>{strings.laning_ultimate_heading}<span className="section-time">{renderSummaryTime(summaryMinute)}</span></h3>
          <TeamTable className="replay-comparison-table level-six-table"><div className="table-scroll"><table>
            <thead><tr><th scope="col">Timestamp</th>{(["midlane", "carry", "offlane", "softSupport", "hardSupport"] as const).map((role) => <th scope="col" key={role}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="role-icon" aria-hidden="true" style={{ backgroundPosition: `${roleIconPositions[role]}% center` }} />{roleLabels[role]}</span></th>)}</tr></thead>
            <tbody>{(() => {
              const roles = ["midlane", "carry", "offlane", "softSupport", "hardSupport"] as const;
              const snapshots = [true, false].flatMap((radiant) => roles.map((role) => {
                const player = getLaningRoles(match.players, radiant)[role];
                const samples = player?.xp_t?.slice(0, summaryMinute + 1) ?? [];
                const minute = samples.findIndex((xp) => Number.isFinite(xp) && getHeroLevel(xp) >= 6);
                const complete = samples.length === summaryMinute + 1 && Array.from(samples).every((xp) => Number.isFinite(xp));
                return { role, player, radiant, minute, complete };
              }));
              const timestamps = [...new Set(snapshots.filter(({ minute }) => minute >= 0).map(({ minute }) => minute))].sort((a, b) => a - b);
              const rows = [
                ...timestamps.map((minute) => ({ key: String(minute), label: renderSummaryTime(minute), entries: snapshots.filter((entry) => entry.minute === minute) })),
                { key: "not-reached", label: <span title={`Level six not reached by ${summaryMinute}:00`}>—</span>, entries: snapshots.filter(({ player, minute, complete }) => player && minute < 0 && complete) },
                { key: "unavailable", label: <span>{strings.laning_unavailable}</span>, entries: snapshots.filter(({ player, minute, complete }) => !player || (minute < 0 && !complete)) },
              ];
              return rows.filter(({ entries }) => entries.length).map(({ key, label, entries }) => <tr key={key}>
                <th scope="row">{label}</th>
                {roles.map((role) => <td key={role} className="level-six-summary" style={{ whiteSpace: "normal" }}>
                  {entries.filter((entry) => entry.role === role).map(({ player, radiant }) => <div key={String(radiant)}>
                    {player ? renderSummaryPlayer(player) : renderTeam(radiant)}
                  </div>)}
                </td>)}
              </tr>);
            })()}</tbody>
          </table></div></TeamTable>
        </UltimateSummary>
        <UltimateSummary className="themed-summary laning-activity" aria-label="Laning activity">
          <h3>Laning Activity <span className="section-time">{renderSummaryTime(summaryMinute)}</span></h3>
          <TeamTable className="replay-comparison-table"><div className="table-scroll"><table>
            <thead><tr><th /><th>{renderTeam(true)}</th><th>{renderTeam(false)}</th></tr></thead>
            <tbody>{[
              { label: "Camps stacked", icon: <LayersIcon aria-hidden="true" sx={{ fontSize: 18, color: constants.colorLavenderMuted }} />, read: (player: MatchPlayer): number | null => {
                const value = player.camps_stacked_t?.[summaryMinute];
                return typeof value === "number" && Number.isFinite(value) ? value : null;
              } },
              { label: "Wards bought", icon: <VisibilityIcon aria-hidden="true" sx={{ fontSize: 18, color: constants.golden }} />, read: (player: MatchPlayer): number | null => Array.isArray(player.purchase_log)
                ? player.purchase_log.filter((entry) => Number.isFinite(entry.time) && entry.time <= summaryMinute * 60).reduce((count, entry) => count + (entry.key === "ward_dispenser" ? 2 : ["ward_observer", "ward_sentry"].includes(entry.key) ? 1 : 0), 0) : null },
              { label: "Runes taken", icon: <BoltIcon aria-hidden="true" sx={{ fontSize: 18, color: constants.colorBlue }} />, read: (player: MatchPlayer): number | null => Array.isArray(player.runes_log)
                ? player.runes_log.filter((entry) => Number.isFinite(entry.time) && entry.time >= 0 && entry.time <= summaryMinute * 60).length : null },
            ].map(({ label, icon, read }) => <tr key={label}><td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{icon}{label}</span></td>{[true, false].map((radiant) => {
              const team = match.players.filter((player) => player.isRadiant === radiant);
              const values = team.map(read);
              const total = team.length === 5 && values.every((value) => value !== null) ? values.reduce<number>((sum, value) => sum + value!, 0) : null;
              return <td key={String(radiant)}><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>{icon}<strong>{total === null ? strings.laning_unavailable : total.toLocaleString()}</strong></span></td>;
            })}</tr>)}</tbody>
          </table></div></TeamTable>
        </UltimateSummary>
      </PageSection>
      <PageSection aria-label={strings.heading_laning}>
        <Heading className="laning-heading" title={strings.laning_phase} subtitle={<span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: constants.colorWhite, fontWeight: 700 }}><span aria-hidden="true">·</span><AccessTimeIcon aria-hidden="true" style={{ fill: constants.colorBlue }} />10:00</span>} />
        <LaningTable match={match} />
      </PageSection>
      <PageSection aria-label={strings.th_map}>
        <Heading
          title={strings.th_map}
        />
        <HeatmapContainer>
          <HeatmapPlayers>
            {[true, false].map((radiant) => <fieldset key={String(radiant)}>
              <legend>{renderTeam(radiant)}</legend>
              {match.players.filter((player) => player.isRadiant === radiant).map((player) => {
                const identity = getPlayerIdentity(player, strings);
                return <label key={player.player_slot}>
                  <input type="radio" name="laning-map-player" checked={selectedPlayer === player.player_slot} onChange={() => setSelectedPlayer(player.player_slot)} />
                  {identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt={identity.heroName} width={24} height={24} />}
                  {identity.playerName}
                </label>;
              })}
            </fieldset>)}
          </HeatmapPlayers>
          <Heatmap
            width={480}
            startTime={match.start_time}
            points={unpackPositionData(
              (
                match.players.find(
                  (player) => player.player_slot === selectedPlayer,
                ) || {}
              ).lane_pos,
            )}
          />
        </HeatmapContainer>
      </PageSection>
      <LaningEvents match={match} />
      <RoleComparison match={match} />
      <PageSection aria-label={strings.laning_hero_comparison}>
        <HeroComparison match={match} />
      </PageSection>
      <PageSection aria-label={strings.laning_team_share_heading}>
        <NetWorthShare match={match} />
      </PageSection>
      {hasGraphData(match, "networth", 10) && (
      <PageSection className="laning-chart-section" aria-label={strings.heading_graph_networth}>
        <Graph
          match={match}
          selectedPlayer={selectedPlayer}
          metric="networth"
        />
      </PageSection>
      )}
      {hasGraphData(match, "levels", 10) && (
      <PageSection className="laning-chart-section" aria-label={strings.heading_graph_levels}>
        <Graph
          match={match}
          selectedPlayer={selectedPlayer}
          metric="levels"
        />
      </PageSection>
      )}
      {hasGraphData(match, "lh", 10) && (
        <PageSection className="laning-chart-section" aria-label={strings.heading_last_hits}>
          <MatchGraph match={match} type="lh" maxMinute={10} />
        </PageSection>
      )}
      <LastHitsTable match={match} />
    </LaningPage>
  );
};

export default Laning;
