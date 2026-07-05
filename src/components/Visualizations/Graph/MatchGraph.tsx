import React from "react";
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
import {
  StyledTooltip,
  StyledTooltipTeam,
  StyledRadiant,
  StyledDire,
  StyledHolder,
  GoldSpan,
  XpSpan,
  StyledTooltipTime,
  StyledTooltipNetworthLineEntry,
  StyledCustomizedTooltip,
  TooltipLabel,
  TooltipLineEntry,
  TooltipLineEntryHeroName,
  TooltipLineEntryValue,
} from "./Styled";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import { Spacer } from "../../Spacer/Spacer";
import Grid from "./Grid";

const formatGraphTime = (minutes: number) => `${minutes}:00`;

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

const PlayerGraphTooltip = ({
  label,
  payload,
}: {
  label?: string;
  payload?: any[];
}) => {
  const origOrderMap: Record<string, number> = {};
  payload?.forEach((p, i) => {
    origOrderMap[p.dataKey] = i;
  });
  const descendingOrder = payload?.sort((a, b) => {
    return b.value - a.value;
  });
  return (
    <StyledCustomizedTooltip>
      <TooltipLabel>{label}</TooltipLabel>
      {descendingOrder?.map((data, i) => (
        <TooltipLineEntry
          key={i}
          className={`data ${origOrderMap[data.dataKey] < 5 ? "isRadiant" : "isDire"}`}
          color={data.color}
        >
          <TooltipLineEntryHeroName color={data.color}>
            {data.dataKey}
          </TooltipLineEntryHeroName>
          <TooltipLineEntryValue>
            {data.value?.toLocaleString()}
          </TooltipLineEntryValue>
        </TooltipLineEntry>
      ))}
    </StyledCustomizedTooltip>
  );
};

const XpTooltipContent = ({ payload }: { payload?: any[] }) => {
  const strings = useStrings();
  try {
    const data = payload && payload[0] && payload[0].payload;
    const { rXpAdv, rGoldAdv, time } = data;
    return (
      <StyledTooltip>
        <StyledTooltipTime>
          <span>{`${formatGraphTime(time)}`}</span>
        </StyledTooltipTime>
        <StyledTooltipNetworthLineEntry>
          <StyledTooltipTeam
            color={
              rGoldAdv > 0 ? constants.colorSuccess : constants.colorDanger
            }
          >
            {rGoldAdv > 0 ? strings.general_radiant : strings.general_dire}
          </StyledTooltipTeam>
          <GoldSpan>
            {Math.abs(rGoldAdv)?.toLocaleString()} {strings.heading_graph_gold}
          </GoldSpan>
        </StyledTooltipNetworthLineEntry>
        <br />
        <StyledTooltipNetworthLineEntry>
          <StyledTooltipTeam
            color={rXpAdv > 0 ? constants.colorSuccess : constants.colorDanger}
          >
            {rXpAdv > 0 ? strings.general_radiant : strings.general_dire}
          </StyledTooltipTeam>
          <XpSpan>
            {Math.abs(rXpAdv)?.toLocaleString()} {strings.heading_graph_xp}
          </XpSpan>
        </StyledTooltipNetworthLineEntry>
      </StyledTooltip>
    );
  } catch (e) {
    return null;
  }
};

const XpNetworthGraph = ({ match }: { match: Match }) => {
  const strings = useStrings();
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
              fontSize: 12,
              fill: constants.colorGreyMuted,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[minY, maxY]}
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 12,
              fill: constants.colorGreyMuted,
            }}
            tickFormatter={(value) => value?.toLocaleString()}
            axisLine={false}
            tickLine={false}
          />
          <ReferenceLine y={0} stroke="#505050" strokeWidth={2} opacity={1} />
          <Grid />
          <Tooltip content={<XpTooltipContent />} />
          <Line
            dot={false}
            dataKey="rXpAdv"
            stroke={constants.colorGraphBlue}
            strokeWidth={2}
            name={strings.heading_graph_xp}
          />
          <Line
            dot={false}
            dataKey="rGoldAdv"
            stroke={constants.colorGraphYellow}
            strokeWidth={2}
            name={strings.heading_graph_gold}
          />
          <Legend
            wrapperStyle={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 13,
              color: constants.colorGreyMuted,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
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
  { hoverHero: any }
> {
  constructor(props: PlayersGraphProps) {
    super(props);
    this.state = {
      hoverHero: null,
    };
  }

  handleMouseEnter = (o: any) => {
    this.setState({
      hoverHero: o.dataKey,
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hoverHero: null,
    });
  };

  render() {
    const { match, type, strings } = this.props;
    const { hoverHero } = this.state;

    const matchData: any[] = [];
    if (
      match.players &&
      match.players[0] &&
      match.players[0][`${type}_t` as keyof MatchPlayer]
    ) {
      match.players[0][`${type}_t` as keyof MatchPlayer].forEach(
        (value: number, index: number) => {
          if (index <= Math.floor(match.duration / 60)) {
            const obj: Record<string, any> = { time: formatGraphTime(index) };
            match.players.forEach((player) => {
              const hero = heroes[player.hero_id] || {};
              obj[hero.localized_name] =
                player[`${type}_t` as keyof MatchPlayer][index];
            });
            matchData.push(obj);
          }
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
                  fontSize: 12,
                  fill: constants.colorGreyMuted,
                }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                mirror
                tick={{
                  fontFamily: constants.fontFamilySerif,
                  fontSize: 12,
                  fill: constants.colorGreyMuted,
                }}
                tickFormatter={(value) => value?.toLocaleString()}
                axisLine={false}
                tickLine={false}
              />
              <Grid />
              <Tooltip content={<PlayerGraphTooltip />} />
              {match.players.map((player) => {
                const hero = heroes[player.hero_id] || {};
                const playerColor =
                  playerColors[
                    player.player_slot as unknown as keyof typeof playerColors
                  ];
                const isSelected =
                  heroes[player.hero_id] &&
                  hoverHero === heroes[player.hero_id].localized_name;
                const opacity = !hoverHero || isSelected ? 1 : 0.25;
                const stroke = isSelected ? 4 : 2;
                return (
                  <Line
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
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                wrapperStyle={{
                  fontFamily: constants.fontFamilySerif,
                  fontSize: 13,
                  color: constants.colorGreyMuted,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
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
  } else if (type === "gold" || type === "xp" || type === "lh") {
    return <PlayersGraph type={type} match={match} strings={strings} />;
  }
  return null;
};

export default MatchGraph;
