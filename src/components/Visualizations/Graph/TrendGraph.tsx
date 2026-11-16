import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";
import { heroes } from "dotaconstants";
import { formatSeconds, fromNow, formatGraphValueData } from "../../../utility";
import constants from "../../constants";
import HeroImage from "../HeroImage";
import useStrings from "../../../hooks/useStrings.hook";
import Grid from "./Grid";
import styles from "./TrendGraph.module.css";

const TrendTooltipContent = ({
  payload,
  name,
}: {
  payload?: any[];
  name: string;
}) => {
  const strings = useStrings();
  const data = payload && payload[0] && payload[0].payload;
  if (data) {
    const hero = heroes[data.hero_id as keyof Heroes] || {};
    const trendStr = strings[`heading_${name}` as keyof Strings];
    const unit = data.name === "win_rate" ? "%" : "";
    return (
      <div>
        <div className={styles.tooltipWrapper}>
          <div className={styles.value}>
            {data.name === "win_rate" ? "" : strings.trends_tooltip_average}
            {` ${trendStr}: ${formatGraphValueData(Number(data.value.toFixed(2)), name)}${unit}`}
          </div>
          <div className={styles.match}>
            <div>
              <div>
                <span className={data.win ? styles.win : styles.loss}>
                  {data.win ? strings.td_win : strings.td_loss}
                </span>
                <span
                  className={styles.time}
                >{` ${fromNow(data.start_time)}`}</span>
              </div>
              <div>
                {strings[`game_mode_${data.game_mode}` as keyof Strings]}
              </div>
              <div>{formatSeconds(data.duration)}</div>
              {data.name === "win_rate" || name === "duration" ? (
                ""
              ) : (
                <div className={styles.matchValue}>
                  {`${trendStr}: ${formatGraphValueData(Number(data.independent_value.toFixed(2)), name)}${unit}`}
                </div>
              )}
            </div>
            <div className={styles.hero}>
              <HeroImage id={String(hero.id)} className={styles.heroImg} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const TrendGraph = ({ columns, name }: { columns: any[]; name: string }) => {
  const strings = useStrings();
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={columns}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <XAxis
          interval={49}
          tick={{
            fontFamily: constants.fontFamilySerif,
            fontSize: 13,
            fill: "#B0B0B0",
          }}
          tickFormatter={(value) => value?.toLocaleString()}
          axisLine={false}
          tickLine={false}
        >
          <Label value="" position="insideTopRight" />
        </XAxis>
        <YAxis
          domain={["auto", "auto"]}
          width={50}
          tick={{
            fontFamily: constants.fontFamilySerif,
            fontSize: 13,
            fill: "#B0B0B0",
          }}
          tickFormatter={(value) => value?.toLocaleString()}
          axisLine={false}
          tickLine={false}
        />
        <Grid />
        <Tooltip content={<TrendTooltipContent name={name} />} />
        <Line
          dot={false}
          dataKey="value"
          stroke="#66BBFF"
          strokeWidth={2}
          name={strings[`heading_${name}` as keyof Strings]}
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TrendGraph;
