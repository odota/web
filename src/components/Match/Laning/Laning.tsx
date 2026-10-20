/**
 * @file Laning.
 * @description Composes the laning summary, player table, hero comparison, team shares, charts, and selected-player heatmap.
 */

import { formatTemplate, formatTemplateToString, unpackPositionData } from "../../../utility";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { IconRadiant, IconDire } from "../../Icons";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { MetricSummary } from "./StyledHeroComparison";
import config from "../../../config";
import { player_colors as playerColors } from "dotaconstants";
import useStrings from "../../../hooks/useStrings.hook";
import { LaningPage, PageSection, SummaryStats, SummaryTeam, SummaryLevels, SummaryResult, SummaryBreakdown, UltimateSummary, HeatmapContainer, TableCaption } from "./StyledLaning";
import Heading from "../../Heading/Heading";
import Heatmap from "../../Heatmap/Heatmap";
import Table from "../../Table/Table";
import mcs from "../matchColumns";
import { getPlayerIdentity, getPlayerRoles, hasGraphData, getRoleLabels, getLaningRoles } from "./laning.utils";
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
  const roles = getPlayerRoles(match.players);
  const tableData = match.players.map((player) => {
    const role = roles.get(player.player_slot);
    const xp = player.xp_t?.[10];
    return {
      ...player,
      laning_role: role ? roleLabels[role] : undefined,
      net_worth_ten: player.gold_t?.[10],
      level_ten: Number.isFinite(xp) ? getHeroLevel(xp) : undefined,
    };
  }).sort((first, second) => first.isRadiant !== second.isRadiant
    ? first.isRadiant ? -1 : 1
    : first.lane - second.lane);
  const columns = mcs(strings).laningColumns({ selectedPlayer }, setSelectedPlayer);

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
   * Formats a gold total using the active language’s unit or unavailable message.
   * @param value Total gold or null.
   * @returns Display-ready net worth text.
   */
  const formatNetWorth = (value: number | null) =>
    value === null ? strings.laning_unavailable : `${value.toLocaleString()} ${strings.laning_gold}`;

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
  /**
   * Formats a level total with a localized unit or unavailable message.
   * @param value Combined levels or null.
   * @returns Display-ready level text.
   */
  const formatLevels = (value: number | null) =>
    value === null ? strings.laning_unavailable : `${value} ${(value === 1 ? strings.laning_level : strings.laning_levels)}`;

  const renderTeam = (radiant: boolean) => <SummaryTeam $radiant={radiant}>
    {radiant ? <IconRadiant width="16" height="16" /> : <IconDire width="16" height="16" />}
    {radiant ? strings.general_radiant : strings.general_dire}
  </SummaryTeam>;

  const renderSummaryPlayer = (player: MatchPlayer) => {
    const identity = getPlayerIdentity(player, strings);
    return <span className="summary-hero" style={{ color: playerColors[player.player_slot as unknown as keyof typeof playerColors] }}>
      {identity.icon && <img src={config.VITE_IMAGE_CDN + identity.icon} alt="" width={20} height={20} />}
      {identity.playerName}
    </span>;
  };

  /**
   * Compares the first recorded level-six minute for opposing core roles.
   * Timing is approximate because XP histories have one value per minute.
   * @param role Core role to compare across teams.
   * @returns A localized first-to-six result, tie, or explanation of unavailable data.
   */
  const getLevelSixSummary = (role: "midlane" | "carry" | "offlane") => {
    const roleName = <strong className="summary-keyword">{roleLabels[role]}</strong>;
    const radiantMid = getLaningRoles(match.players, true)[role];
    const direMid = getLaningRoles(match.players, false)[role];
    if (!radiantMid || !direMid) {
      return formatTemplate(strings.laning_role_six_unknown, { role: roleName });
    }
    /**
     * Finds the first level-six-or-higher entry within the summary window.
     * @param player Player whose XP history is inspected.
     * @returns The minute index, or -1 when no qualifying entry is found.
     */
    const firstLevelSix = (player: MatchPlayer) => {
      const samples = player.xp_t?.slice(0, summaryMinute + 1) ?? [];
      return samples.findIndex((xp) => Number.isFinite(xp) && getHeroLevel(xp) >= 6);
    };
    const radiantMinute = firstLevelSix(radiantMid);
    const direMinute = firstLevelSix(direMid);
    if (radiantMinute < 0 && direMinute < 0) {
      return formatTemplate(strings.laning_role_six_neither, { role: roleName, minute: summaryMinute, player: renderSummaryPlayer(radiantMid), opponent: renderSummaryPlayer(direMid) });
    }
    if (radiantMinute === direMinute) {
      return formatTemplate(strings.laning_role_six_tie, {
        player: renderSummaryPlayer(radiantMid), opponent: renderSummaryPlayer(direMid),
        role: roleName, time: <span className="summary-time"><AccessTimeIcon aria-hidden="true" />{radiantMinute}:00</span>,
      });
    }
    const radiantFirst = radiantMinute >= 0 && (direMinute < 0 || radiantMinute < direMinute);
    const winner = radiantFirst ? radiantMid : direMid;
    const minute = radiantFirst ? radiantMinute : direMinute;
    const other = radiantFirst ? direMid : radiantMid;
    const otherSamples = other.xp_t?.slice(0, minute + 1) ?? [];
    if (
      otherSamples.length !== minute + 1 ||
      Array.from({ length: minute + 1 }, (_, index) => otherSamples[index])
        .some((xp) => !Number.isFinite(xp))
    ) {
      return formatTemplate(strings.laning_role_six_missing, { role: roleName });
    }
    return formatTemplate(strings.laning_role_six_first, {
      team: renderTeam(radiantFirst),
      role: roleName,
      player: renderSummaryPlayer(winner),
      time: <span className="summary-time"><AccessTimeIcon aria-hidden="true" />{minute}:00</span>,
    });
  };

  const levelSixSummaries = (["midlane", "carry", "offlane"] as const).map((role) => ({
    role,
    text: getLevelSixSummary(role),
  }));
  return (
    <LaningPage>
      <PageSection aria-label={strings.laning_summary}>
        <Heading title={strings.laning_summary} />
        <TableCaption>{formatTemplateToString(strings.laning_summary_time, { minute: summaryMinute })}</TableCaption>
        <SummaryResult $winner={netWorthDifference === null || netWorthDifference === 0 ? "tie" : netWorthDifference > 0 ? "radiant" : "dire"}>
          <h3>
            {netWorthDifference === null ? strings.laning_unavailable : netWorthDifference === 0
              ? strings.laning_summary_even
              : formatTemplate(strings.laning_summary_winner, { team: renderTeam(netWorthDifference > 0) }).map((part, index) => (
                <span key={index}>{part}</span>
              ))}
          </h3>
          {netWorthDifference !== null && (
            <p><strong className="summary-gold-lead">
              <img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />
              +{formatNetWorth(Math.abs(netWorthDifference))}
            </strong></p>
          )}
          {levelDifference !== null && (
            <p>
              <SummaryLevels className="summary-level-lead"><TrendingUpIcon aria-hidden="true" />
                +{formatLevels(Math.abs(levelDifference))}
              </SummaryLevels>
            </p>
          )}
          {netWorthDifference !== null && netWorthDifference !== 0 && levelDifference !== null && (
            <p className="summary-narrative">{formatTemplate((Math.sign(netWorthDifference) === Math.sign(levelDifference) || levelDifference === 0 ? strings.laning_summary_phase_result : strings.laning_summary_phase_split), {
                team: renderTeam(netWorthDifference > 0),
                gold: <strong className="summary-gold-lead"><img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />{formatNetWorth(Math.abs(netWorthDifference))}</strong>,
                levels: <SummaryLevels><TrendingUpIcon aria-hidden="true" />{Math.abs(levelDifference).toLocaleString()} {strings.laning_combined}</SummaryLevels>,
                minute: <span className="summary-minute"><AccessTimeIcon aria-hidden="true" />{summaryMinute}</span>,
              }).map((part, index) => <span className="summary-phrase" key={index}>{part}</span>)}</p>
          )}
        </SummaryResult>
        <SummaryBreakdown>
          <summary><ExpandMoreIcon fontSize="small" />{strings.laning_summary_breakdown}</summary>
          <SummaryStats $metric="gold" $advantageFirst={netWorthDifference !== null && netWorthDifference < 0}>
            <div>
              <dt>
                {netWorthDifference === null || netWorthDifference === 0
                  ? strings.laning_difference
                  : formatTemplate(strings.laning_team_advantage, { team: renderTeam(netWorthDifference > 0) })}
              </dt>
              <dd>
                <img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />
                <span>{netWorthDifference !== null && netWorthDifference !== 0 ? "+" : ""}{formatNetWorth(netWorthDifference === null ? null : Math.abs(netWorthDifference))}</span>
              </dd>
            </div>
            <div>
              <dt>{renderTeam(true)}</dt>
              <dd><img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />{formatNetWorth(radiantNetWorth)}</dd>
            </div>
            <div>
              <dt>{renderTeam(false)}</dt>
              <dd><img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} />{formatNetWorth(direNetWorth)}</dd>
            </div>
          </SummaryStats>
          <SummaryStats $metric="levels" $advantageFirst={levelDifference !== null && levelDifference < 0}>
            <div>
              <dt>
                {levelDifference === null || levelDifference === 0
                  ? strings.laning_level_difference
                  : formatTemplate(strings.laning_team_level_advantage, { team: renderTeam(levelDifference > 0) })}
              </dt>
              <dd>
                <TrendingUpIcon aria-hidden="true" />
                <span>{levelDifference !== null && levelDifference !== 0 ? "+" : ""}{formatLevels(levelDifference === null ? null : Math.abs(levelDifference))}</span>
              </dd>
            </div>
            <div>
              <dt>{formatTemplate(strings.laning_team_levels, { team: renderTeam(true) })}</dt>
              <dd><SummaryLevels><TrendingUpIcon aria-hidden="true" />{formatLevels(radiantLevels)}</SummaryLevels></dd>
            </div>
            <div>
              <dt>{formatTemplate(strings.laning_team_levels, { team: renderTeam(false) })}</dt>
              <dd><SummaryLevels><TrendingUpIcon aria-hidden="true" />{formatLevels(direLevels)}</SummaryLevels></dd>
            </div>
          </SummaryStats>
          <UltimateSummary>
            <h3>{strings.laning_ultimate_heading}</h3>
            <MetricSummary>
              <ul>{levelSixSummaries.map(({ role, text }) => text && (
                <li key={role}><div className="summary-item"><span>{text}</span></div></li>
              ))}</ul>
            </MetricSummary>
          </UltimateSummary>
        </SummaryBreakdown>

      </PageSection>
      <PageSection aria-label={strings.heading_laning}>
        <Heading title={strings.heading_laning} />
        <Table
          data={tableData}
          columns={columns}
          keyFn={(player: MatchPlayer) => player.player_slot}
        />
        <TableCaption>
          {strings.laning_heatmap_hint}
        </TableCaption>
      </PageSection>
      <PageSection aria-label={strings.laning_hero_comparison}>
        <HeroComparison match={match} />
      </PageSection>
      <PageSection aria-label={strings.laning_team_share_heading}>
        <NetWorthShare match={match} />
      </PageSection>
      {hasGraphData(match, "networth", 10) && (
      <PageSection aria-label={strings.heading_graph_networth}>
        <Graph
          match={match}
          selectedPlayer={selectedPlayer}
          metric="networth"
        />
      </PageSection>
      )}
      {hasGraphData(match, "levels", 10) && (
      <PageSection aria-label={strings.heading_graph_levels}>
        <Graph
          match={match}
          selectedPlayer={selectedPlayer}
          metric="levels"
        />
      </PageSection>
      )}
      <PageSection aria-label={strings.th_map}>
        <Heading
          title={strings.th_map}
        />
        <HeatmapContainer>
          <Heatmap
            width={400}
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
    </LaningPage>
  );
};

export default Laning;
