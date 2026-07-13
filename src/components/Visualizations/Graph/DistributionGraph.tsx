import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  ComposedChart,
  Label,
  ResponsiveContainer,
} from "recharts";
import { StyledTooltip, BinName, NumPlayers, Percentile } from "./Styled";
import Grid from "./Grid";
import useStrings from "../../../hooks/useStrings.hook";
import constants from "../../constants";

const DistributionTooltipContent = ({
  payload,
  array,
}: {
  payload?: any;
  array: any[];
}) => {
  const strings = useStrings();
  const data = payload && payload[0] && payload[0].payload;
  const total = array.length ? array[array.length - 1].cumulative_sum : 0;
  return (
    <StyledTooltip>
      <BinName>{data && data.bin_name}</BinName>
      <NumPlayers>
        {data && data.count?.toLocaleString()} {strings.th_players}
      </NumPlayers>
      <Percentile>
        {data && ((data.cumulative_sum / total) * 100).toFixed(2)}{" "}
        {strings.th_percentile}
      </Percentile>
    </StyledTooltip>
  );
};

const DistributionGraph = ({
  data,
  xTickInterval,
}: {
  data: any[];
  xTickInterval: number | null;
}) => {
  if (data && data.length) {
    return (
      <ResponsiveContainer width="100%" height={600}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 40,
            left: 20,
            bottom: 20,
          }}
          barCategoryGap="18%"
        >
          <XAxis
            dataKey="bin_name"
            interval={xTickInterval || 4}
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
            width={50}
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 13,
              fill: "#B0B0B0",
            }}
            tickFormatter={(value) => value?.toLocaleString()}
            axisLine={false}
            tickLine={false}
            yAxisId="left"
            orientation="left"
            stroke="#1393f9"
          />
          <YAxis
            width={50}
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 13,
              fill: "#B0B0B0",
            }}
            tickFormatter={(value) => value?.toLocaleString()}
            axisLine={false}
            tickLine={false}
            yAxisId="right"
            orientation="right"
            stroke="#4cffc0"
          />
          <Grid />
          <Tooltip
            content={<DistributionTooltipContent array={data} />}
            contentStyle={{
              background: "#222",
              border: "1px solid #444",
              borderRadius: 8,
            }}
          />
          <Bar
            dataKey="count"
            yAxisId="left"
            fill="#6366F1"
            radius={[4, 4, 0, 0]}
            animationDuration={700}
          />
          <Line
            dataKey="cumulative_sum"
            yAxisId="right"
            stroke="#FBBF24"
            strokeWidth={3}
            type="monotone"
            dot={false}
            activeDot={{ r: 5 }}
            animationDuration={700}
            style={{
              filter: "drop-shadow(0 0 5px rgba(255,215,0,.5))",
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }
  return null;
};

export default DistributionGraph;
