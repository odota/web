import { heroes, player_colors as playerColors } from 'dotaconstants';
import React from 'react';
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { getHeroIconUrlFromHeroKey } from '../../../utility';
import Heading from '../../Heading';
import {
  StyledCustomizedTooltip,
  StyledHolder,
} from '../../Visualizations/Graph/Styled';
import useStrings from '../../../hooks/useStrings.hook';

const formatGraphTime = (minutes: number) => `${minutes}:00`;

// asdf
const CustomizedTooltip = ({
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
  return <StyledCustomizedTooltip>
    <div className="label">{label}</div>
    {payload
      ?.sort((a, b) => b.value - a.value)
      ?.map((data, i) => (
        <div
          key={i}
          className={`data ${origOrderMap[data.dataKey] < 5 && 'isRadiant'}`}
          style={{ borderLeft: `8px solid ${data.color}` }}
        >
          {data.dataKey}: {data.value}
        </div>
      ))}
  </StyledCustomizedTooltip>;
};

const CustomizedDot = (props: {
  cx?: number;
  cy?: number;
  payload?: any;
  killsLog: any[];
}) => {
  const { cx, cy, payload, killsLog } = props;

  const kills = killsLog.filter((l) => {
    const t = (l.time - (l.time % 60)) / 60;
    return formatGraphTime(t) === payload.time;
  });

  if (kills.length > 0) {
    return (
      <svg
        x={(cx ?? 0) - 16}
        y={(cy ?? 0) - 16 * kills.length}
        width={32}
        height={32 * kills.length}
      >
        {kills.map((k, i) => (
          <image
            key={i}
            cx={16}
            y={32 * i}
            width={32}
            height={32}
            href={getHeroIconUrlFromHeroKey(k.key)}
          />
        ))}
      </svg>
    );
  }

  return <svg />;
};

type GraphProps = {
  match: Match;
  selectedPlayer: number;
};

const Graph = (props: GraphProps) => {
  const strings = useStrings();
  const { selectedPlayer, match } = props;
  const matchData: any[] = [];
  const { players } = match;

  if (players[0] && players[0].cs_t) {
    players[0].lh_t.forEach((value, index) => {
      if (index <= Math.floor(match.duration / 60)) {
        const obj: Record<string, any> = { time: formatGraphTime(index) };
        players.forEach((player) => {
          const hero = heroes[player.hero_id] || {};
          obj[hero.localized_name] = player.cs_t[index];
        });
        matchData.push(obj);
      }
    });

    return (
      <StyledHolder>
        <Heading title={strings.heading_graph_cs} />
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
            <XAxis dataKey="time" />
            <YAxis mirror />
            <CartesianGrid stroke="#505050" strokeWidth={1} opacity={0.5} />

            <Tooltip content={<CustomizedTooltip />} />
            {match.players.map((player) => {
              const hero = heroes[player.hero_id] || {};
              const playerColor =
                playerColors[
                  player.player_slot as unknown as keyof typeof playerColors
                ];
              const isSelected = selectedPlayer === player.player_slot;
              const opacity = isSelected ? 1 : 0.25;
              const stroke = isSelected ? 4 : 2;
              return (
                <Line
                  dot={
                    isSelected ? (
                      <CustomizedDot killsLog={player.kills_log} />
                    ) : (
                      false
                    )
                  }
                  dataKey={hero.localized_name}
                  key={hero.localized_name}
                  stroke={playerColor}
                  strokeWidth={stroke}
                  strokeOpacity={opacity}
                  name={hero.localized_name}
                />
              );
            })}
            <Legend />
            <Brush endIndex={12} height={20} />
          </LineChart>
        </ResponsiveContainer>
      </StyledHolder>
    );
  }

  return null;
};

export default Graph;
