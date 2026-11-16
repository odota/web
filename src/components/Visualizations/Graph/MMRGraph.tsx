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
import useStrings from "../../../hooks/useStrings.hook";
import { rankTierToString } from "../../../utility";
import Grid from "./Grid";
import styles from "./MMRGraph.module.css";

const formatXTick = (time: number) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};

const formatYTick = (rank: number) => {
  return rankTierToString(rank).split(" ")[0];
};

const MMRGraph = ({ columns }: { columns: any[] }) => {
  const strings = useStrings();
  return (
    <div className={styles.graphArea}>
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
          <XAxis dataKey="time" tickFormatter={formatXTick} />
          <YAxis
            type="number"
            domain={[10, 80]}
            tickCount={8}
            tickFormatter={formatYTick}
          />
          <Grid />
          <Tooltip
            labelStyle={{ color: "black" }}
            labelFormatter={(time: number) => new Date(time).toDateString()}
            formatter={rankTierToString}
          />
          <Line
            dot={true}
            dataKey="rank_tier"
            stroke="#66BBFF"
            strokeWidth={2}
            name={strings.th_rank}
          />
          <Legend verticalAlign="bottom" />
          {/* <Brush
            dataKey="time"
            height={40}
            stroke={constants.primaryLinkColor}
            fill={constants.darkPrimaryColor}
            tickFormatter={formatXTick}
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MMRGraph;
