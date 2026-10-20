/**
 * @file Match Graph.
 * @description Routes match metrics to full-duration charts and implements player-history and team-advantage graphs.
 */

import React, { useState } from "react";
import { RoleCaption } from "../../Match/Laning/StyledGraph";
import AdvantageGraphTooltip from "./AdvantageGraphTooltip";
import HeroLegendLabel from "./HeroLegendLabel";
import PlayerGraphTooltip from "./PlayerGraphTooltip";
import PlayerMetricGraph from "../../Match/Laning/Graph";
import {
  ReferenceArea,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { heroes, player_colors as playerColors } from "dotaconstants";
import Heading from "../../Heading/Heading";
import constants from "../../constants";
import { StyledRadiant, StyledDire, StyledHolder } from "./Styled";
import useStrings from "../../../hooks/useStrings.hook";
import { Spacer } from "../../Spacer/Spacer";
import Grid from "./Grid";
import { getHeroLevel } from "./data";
import LaningPhaseCaption from "./LaningPhaseCaption";

/**
 * Formats a minute index as a chart timestamp.
 * @param minutes Elapsed whole minutes.
 * @returns A label such as "10:00".
 */
const formatGraphTime = (minutes: number) => `${minutes}:00`;

/**
 * Builds synchronized gold/XP advantage points through the match duration.
 * @param match Match with duration in seconds and minute-indexed radiant_gold_adv
 * and radiant_xp_adv arrays. Positive entries favor Radiant; negative entries favor Dire.
 * The fixture's radiant_gold_adv[10] is -6407, a Dire lead of 6,407 gold.
 * @returns Timestamped series values, or an empty array without both histories.
 */
const generateDiffData = (match: Match) => {
  const radiantGoldAdv = match.radiant_gold_adv;
  const radiantXpAdv = match.radiant_xp_adv;
  const data: any[] = [];
  if (radiantGoldAdv && radiantXpAdv) {
    radiantXpAdv.forEach((rXpAdv, index) => {
      if (index <= Math.floor(match.duration / 60)) {
        data.push({ time: index, rXpAdv, rGoldAdv: radiantGoldAdv[index] });
      }
    });
  }
  return data;
};

/**
 * Renders Radiant-relative gold and XP advantages over the full match.
 * @param props Match with team advantage histories.
 * @returns The chart with selectable series and a styled tooltip, or null without histories.
 */
const XpNetworthGraph = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  if (!match.radiant_gold_adv || !match.radiant_xp_adv) {
    return null;
  }
  const matchData = generateDiffData(match);
  const maxY =
    Math.ceil(
      Math.max(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000,
    ) * 5000;
  const minY =
    Math.floor(
      Math.min(...match.radiant_gold_adv, ...match.radiant_xp_adv) / 5000,
    ) * 5000;
  return (
    <StyledHolder>
      <StyledRadiant>The {strings.general_radiant}</StyledRadiant>
      <StyledDire>The {strings.general_dire}</StyledDire>
      <Heading
        title={strings.heading_graph_difference}
        // buttonLabel={config.VITE_ENABLE_GOSUAI ? strings.gosu_default : null}
        // buttonTo={`${sponsorURL}Graphs`}
        // buttonIcon={sponsorIcon}
      />
      <Spacer variant="1" />
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
          <ReferenceArea y1={0} y2={maxY} fill="rgba(102, 187, 106, 0.12)" />
          <ReferenceArea y1={0} y2={minY} fill="rgba(255, 76, 76, 0.12)" />
          <XAxis
            dataKey="time"
            tickFormatter={formatGraphTime}
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 10,
              fill: constants.colorGreyMuted,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minY, maxY]}
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 10,
              fill: constants.colorGreyMuted,
            }}
            tickFormatter={(value) => value?.toLocaleString()}
            axisLine={false}
            tickLine={false}
          />
          <ReferenceLine y={0} stroke="#505050" strokeWidth={2} opacity={1} />
          <Grid />
          <Tooltip
            content={<AdvantageGraphTooltip />}
            position={{ y: 10 }}
            wrapperStyle={{ zIndex: 1000 }}
            reverseDirection={{ x: true, y: false }}
            allowEscapeViewBox={{ x: false, y: true }}
          />
          <Line
            dot={false}
            dataKey="rXpAdv"
            strokeOpacity={
              !selectedSeries || selectedSeries === "rXpAdv" ? 1 : 0.25
            }
            stroke={constants.colorGraphBlue}
            strokeWidth={selectedSeries === "rXpAdv" ? 2 : 1}
            name={strings.heading_graph_xp}
          />
          <Line
            dot={false}
            dataKey="rGoldAdv"
            strokeOpacity={
              !selectedSeries || selectedSeries === "rGoldAdv" ? 1 : 0.25
            }
            stroke={constants.colorGraphYellow}
            strokeWidth={selectedSeries === "rGoldAdv" ? 2 : 1}
            name={strings.heading_graph_gold}
          />
          <Legend
            onClick={(entry) => {
              const series = String(entry.dataKey);
              setSelectedSeries((current) =>
                current === series ? null : series,
              );
            }}
            wrapperStyle={{
              fontFamily: constants.fontFamilyFuturistic,
              fontSize: 11,
              cursor: "pointer",
              color: constants.colorGreyMuted,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      <RoleCaption>{strings.laning_series_legend_hint}</RoleCaption>
    </StyledHolder>
  );
};

type PlayersGraphProps = {
  match: Match;
  type: string;
  strings: Strings;
};

class PlayersGraph extends React.Component<
  PlayersGraphProps,
  { hoverHero: string | null; selectedHero: string | null }
> {
  constructor(props: PlayersGraphProps) {
    super(props);
    this.state = {
      hoverHero: null,
      selectedHero: null,
    };
  }

  /**
   * Temporarily emphasizes the series under the pointer in the legend.
   */
  handleMouseEnter = (o: any) => {
    this.setState({
      hoverHero: o.dataKey,
    });
  };

  /**
   * Clears temporary legend emphasis while preserving a clicked selection.
   */
  handleMouseLeave = () => {
    this.setState({
      hoverHero: null,
    });
  };

  /**
   * Toggles persistent hero emphasis for the clicked legend entry.
   */
  handleLegendClick = (entry: { dataKey?: unknown }) => {
    const hero = String(entry.dataKey);
    this.setState((state) => ({
      selectedHero: state.selectedHero === hero ? null : hero,
    }));
  };

  render() {
    const { match, type, strings } = this.props;
    const { hoverHero, selectedHero } = this.state;
    const focusedHero = hoverHero ?? selectedHero;

    const dataKey = `${type === "levels" ? "xp" : type}_t` as keyof MatchPlayer;
    const timeline = match.players.reduce<number[]>((longest, player) => {
      const samples = player[dataKey];
      return Array.isArray(samples) && samples.length > longest.length
        ? samples
        : longest;
    }, []);
    if (timeline.length) {
      const lastMinute = Math.floor(match.duration / 60);
      // One entry per minute through the match duration, containing the formatted time
      // and each hero's stat value (or level for the levels graph), keyed by hero name.
      const matchData = timeline.slice(0, lastMinute + 1).map(
        // Use the array index as the minute; the timeline value itself is unused.
        (_: number, minute: number) => {
          const dataPoint: Record<string, string | number | undefined> = {
            time: formatGraphTime(minute),
          };

          // Add each hero's stat at this minute. For the levels graph, convert XP to a level;
          // for other graph types, use the stat value directly.
          match.players.forEach((player) => {
            const hero = heroes[player.hero_id] || {};
            const value = player[dataKey]?.[minute];
            dataPoint[hero.localized_name] =
              type === "levels" && typeof value === "number"
                ? getHeroLevel(value)
                : value;
          });

          return dataPoint;
        },
      );

      return (
        <StyledHolder>
          <Heading title={strings[`heading_graph_${type}` as keyof Strings]} />
          <Spacer variant="1" />
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
                mirror
                tick={{
                  fontFamily: constants.fontFamilySerif,
                  fontSize: 10,
                  fill: constants.colorGreyMuted,
                }}
                tickFormatter={(value) => value?.toLocaleString()}
                axisLine={false}
                tickLine={false}
              />
              <Grid />
              <Tooltip
                content={<PlayerGraphTooltip players={match.players} />}
                position={{ y: 10 }}
                wrapperStyle={{ zIndex: 1000 }}
                reverseDirection={{ x: true, y: false }}
                allowEscapeViewBox={{ x: false, y: true }}
              />
              {match.players.map((player) => {
                const hero = heroes[player.hero_id] || {};
                const playerColor =
                  playerColors[
                    player.player_slot as unknown as keyof typeof playerColors
                  ];
                const isSelected =
                  heroes[player.hero_id] &&
                  focusedHero === heroes[player.hero_id].localized_name;
                const opacity = !focusedHero || isSelected ? 1 : 0.25;
                const stroke = isSelected ? 2 : 1;
                return (
                  <Line
                    key={player.player_slot}
                    dot={false}
                    dataKey={hero.localized_name}
                    stroke={playerColor}
                    strokeWidth={stroke}
                    strokeOpacity={opacity}
                    name={hero.localized_name}
                  />
                );
              })}
              <Legend
                formatter={(name) => (
                  <HeroLegendLabel
                    name={String(name)}
                    players={match.players}
                  />
                )}
                onClick={this.handleLegendClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                wrapperStyle={{
                  fontFamily: constants.fontFamilyFuturistic,
                  fontSize: 11,
                  cursor: "pointer",
                  color: constants.colorGreyMuted,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
          <RoleCaption>{strings.laning_level_legend_hint}</RoleCaption>
          {type === "levels" && <LaningPhaseCaption match={match} />}
        </StyledHolder>
      );
    }

    return null;
  }
}

const MatchGraph = ({
  type,
  match,
  width = 1200,
}: {
  type: string;
  match: Match;
  width?: number;
}) => {
  const strings = useStrings();
  if (type === "networth" || type === "levels") {
    return (
      <PlayerMetricGraph
        key={`${match.match_id}-${type}`}
        match={match}
        metric={type}
        maxMinute={Math.floor(match.duration / 60)}
      />
    );
  }
  if (type === "difference") {
    return (
      <XpNetworthGraph
        match={match}
        // width={width}
        // strings={strings}
        // sponsorURL={sponsorURL}
        // sponsorIcon={sponsorIcon}
      />
    );
  } else if (
    type === "gold" ||
    type === "xp" ||
    type === "lh" ||
    type === "hero_damage" ||
    type === "hero_healing" ||
    type === "camps_stacked"
  ) {
    return <PlayersGraph type={type} match={match} strings={strings} />;
  }
  return null;
};

export default MatchGraph;
