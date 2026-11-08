/**
 * @file Graph.
 * @description Shows how each hero’s net worth or level changes over time. Filter by lane or role, select heroes in the legend, and save your tooltip preferences.
 */

import { heroes, player_colors as playerColors } from "dotaconstants";
import React, { useState } from "react";
import { Switch } from "@mui/material";
import { TooltipTotalToggle, RoleCaption, NoMatchingPlayers } from "./StyledGraph";
import HeroLegendLabel from "../../Visualizations/Graph/HeroLegendLabel";
import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useStrings from "../../../hooks/useStrings.hook";
import { localStorageKeys } from "../../../utility";
import useLocalStorageBoolean from "../../../hooks/useLocalStorageBoolean";
import Heading from "../../Heading/Heading";
import { Spacer } from "../../Spacer/Spacer";
import constants from "../../constants";
import Grid from "../../Visualizations/Graph/Grid";
import { StyledHolder } from "../../Visualizations/Graph/Styled";
import LaningPhaseCaption from "../../Visualizations/Graph/LaningPhaseCaption";
import { GraphMetric, GraphGrouping, RoleSelection, getPlayerRoles, filterGraphPlayers, buildGraphData } from "./laning.utils";
import GraphTooltip from "./GraphTooltip";
import GraphFilters from "./GraphFilters";
import GraphCaption from "./GraphCaption";


type GraphProps = {
  match: Match;
  selectedPlayer?: number;
  maxMinute?: number;
  metric: GraphMetric;
};

/**
 * Renders a player net worth or level chart with role/lane filtering and legend selection.
 * Tooltip preferences are persisted in localStorage. The timeline defaults to ten minutes;
 * the Graphs page supplies the full match duration instead.
 * @param props Match data, metric, optional selected player, and inclusive minute limit.
 * @returns The interactive chart, or null when no timeline data is available.
 */
const Graph = ({ selectedPlayer, match, metric, maxMinute = 10 }: GraphProps) => {
  const strings = useStrings();
  const [showAdvantageSummary, setShowAdvantageSummary] = useLocalStorageBoolean(localStorageKeys.graphTooltipAdvantage);
  const [showTooltipTeamTotals, setShowTooltipTeamTotals] = useLocalStorageBoolean(
    metric === "networth" ? localStorageKeys.graphTooltipTeamNetWorth : localStorageKeys.graphTooltipTeamLevels,
  );
  const [focusedHeroSelection, setFocusedHeroSelection] = useState<string | null>(null);
  const [hoverHero, setHoverHero] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<GraphGrouping>("role");
  const [lane, setLane] = useState("all");
  const [role, setRole] = useState<RoleSelection>("all");
  const { players } = match;
  const playerRoles = getPlayerRoles(players);
  const visiblePlayers = filterGraphPlayers(players, playerRoles, groupBy, lane, role);
  const matchData = buildGraphData(match, visiblePlayers, metric, maxMinute);
  if(!matchData.length) return null;

  return (
    <StyledHolder>
      <Heading
        title={
          metric === "networth"
            ? strings.heading_graph_networth
            : strings.heading_graph_levels
        }
      />
      <GraphFilters
        metric={metric} players={players} playerRoles={playerRoles}
        groupBy={groupBy} setGroupBy={setGroupBy}
        lane={lane} setLane={setLane} role={role} setRole={setRole}
      />
      <TooltipTotalToggle>
        <Switch
          size="small"
          checked={showAdvantageSummary}
          onChange={(event) => setShowAdvantageSummary(event.target.checked)}
        />
        {strings.laning_show_tooltip_advantage}
      </TooltipTotalToggle>
      <TooltipTotalToggle>
          <Switch
            size="small"
            checked={showTooltipTeamTotals}
            onChange={(event) => setShowTooltipTeamTotals(event.target.checked)}
          />
          {(metric === "networth" ? strings.laning_show_tooltip_networth : strings.laning_show_tooltip_levels)}
      </TooltipTotalToggle>
      <GraphCaption match={match} metric={metric} groupBy={groupBy}
        lane={lane} role={role} visiblePlayers={visiblePlayers} />
      <Spacer variant="1" />
      {visiblePlayers.length === 0 && (
        <NoMatchingPlayers>{strings.laning_empty}</NoMatchingPlayers>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={matchData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="time"
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 10,
              fill: constants.colorGreyMuted,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={metric === "networth" ? (value: number) => value.toLocaleString("en-US") : undefined}
            allowDecimals={metric !== "levels"}
            mirror
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 10,
              fill: constants.colorGreyMuted,
            }}
            axisLine={false}
            tickLine={false}
          />
          <Grid />
          <Tooltip
            position={{ y: 10 }}
            content={
              <GraphTooltip
                players={players}
                metric={metric}
                showAdvantageSummary={showAdvantageSummary}
                teamTotalsEnabled={showTooltipTeamTotals}
                showTeamTotals={groupBy === "role" ? role === "all" : lane === "all"}
                lanePlayers={groupBy === "lane" ? visiblePlayers : undefined}
              />
            }
            wrapperStyle={{ zIndex: 1000 }}
            reverseDirection={{ x: true, y: false }}
            allowEscapeViewBox={{ x: false, y: true }}
          />
          {visiblePlayers.map((player) => {
            const hero = heroes[player.hero_id] || {};
            const playerColor =
              playerColors[
              player.player_slot as unknown as keyof typeof playerColors
              ];
            const focusedHero = hoverHero ?? focusedHeroSelection;
            const isSelected = focusedHero
              ? focusedHero === hero.localized_name
              : selectedPlayer === player.player_slot;
            const opacity = !focusedHero || focusedHero === hero.localized_name ? 1 : 0.25;
            const stroke = isSelected ? 2 : 1;
            return (
              <Line
                dot={false}
                type={metric === "levels" ? "stepAfter" : "linear"}
                dataKey={hero.localized_name}
                key={hero.localized_name}
                stroke={playerColor}
                strokeWidth={stroke}
                strokeOpacity={opacity}
                name={hero.localized_name}
              />
            );
          })}
          <Legend
            onClick={(entry) => {
              const hero = String(entry.dataKey);
              setFocusedHeroSelection((current) => current === hero ? null : hero);
            }}
            onMouseEnter={(entry) => setHoverHero(String(entry.dataKey))}
            onMouseLeave={() => setHoverHero(null)}
            formatter={(name) => <HeroLegendLabel name={String(name)} players={visiblePlayers} />}
            wrapperStyle={{
              fontFamily: constants.fontFamilyFuturistic,
              cursor: "pointer",
              fontSize: 11,
              color: constants.colorGreyMuted,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <RoleCaption>{strings.laning_level_legend_hint}</RoleCaption>
      {metric === "levels" && <LaningPhaseCaption match={match} />}
    </StyledHolder>
  );
};

export default Graph;
