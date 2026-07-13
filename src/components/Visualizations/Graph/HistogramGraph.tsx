import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatGraphValueData, getPercentileColor } from "../../../utility";
import { StyledTooltip, TooltipLabel, HistogramTooltipDiv } from "./Styled";
import Grid from "./Grid";
import useStrings from "../../../hooks/useStrings.hook";
import constants from "../../constants";

const formatPercent = (percentile: number) => (percentile * 100)?.toFixed(2);

const HistogramTooltipContent = ({
  payload,
  xAxisLabel = "",
  histogramName,
}: {
  payload?: any;
  xAxisLabel?: string;
  histogramName?: string;
}) => {
  const strings = useStrings();
  const data = payload && payload[0] && payload[0].payload;
  const winratePercentile = data && data?.games > 0 && data?.win / data?.games;
  const winratePercent = formatPercent(winratePercentile);
  const numWins = data?.win;
  const numLosses = data?.games - data?.win;
  const color = getPercentileColor(winratePercentile);
  return (
    <StyledTooltip>
      <TooltipLabel>
        {`${formatGraphValueData(data && data.x, histogramName)} ${xAxisLabel} ${histogramName || ""}`}
      </TooltipLabel>
      <HistogramTooltipDiv
        fontSize="medium"
        color={color}
      >{`${winratePercent} ${strings.th_win}`}</HistogramTooltipDiv>
      <HistogramTooltipDiv>{`${data && data.games} ${strings.th_matches}`}</HistogramTooltipDiv>
      <HistogramTooltipDiv>
        {numWins} {strings.th_wins}
      </HistogramTooltipDiv>
      <HistogramTooltipDiv>
        {numLosses} {strings.th_losses}
      </HistogramTooltipDiv>
    </StyledTooltip>
  );
};

const graphHeight = 400;

const HistogramGraph = ({
  columns,
  xAxisLabel = "",
  histogramName,
}: {
  columns: any[];
  xAxisLabel?: string;
  histogramName?: string;
}) => (
  <ResponsiveContainer width="100%" height={graphHeight}>
    <BarChart
      height={graphHeight}
      data={columns}
      margin={{
        top: 20,
        right: 40,
        left: 20,
        bottom: 20,
      }}
      barCategoryGap="18%"
    >
      <XAxis
        dataKey="x"
        interval={1}
        tickFormatter={(val) => formatGraphValueData(val, histogramName)}
        tick={{
          fontFamily: constants.fontFamilyFuturistic,
          fontSize: constants.fontSizeSmall,
          fill: constants.colorGreyMuted,
        }}
        axisLine={false}
        tickLine={false}
      >
        <Label value="" position="insideTopRight" />
      </XAxis>
      <YAxis
        tick={{
          fontFamily: constants.fontFamilyFuturistic,
          fontSize: constants.fontSizeSmall,
          fill: constants.colorGreyMuted,
        }}
        tickFormatter={(value) => value?.toLocaleString()}
        axisLine={false}
        tickLine={false}
      />
      <Grid />
      <Tooltip
        content={
          <HistogramTooltipContent
            xAxisLabel={xAxisLabel}
            histogramName={histogramName}
          />
        }
        cursor={{ fill: "rgba(255, 255, 255, .35)" }}
      />
      <Bar dataKey="games" radius={[4, 4, 0, 0]} animationDuration={700}>
        {columns.map((entry) => {
          const { win, games, x } = entry;
          const percent = win / games;
          const color = getPercentileColor(percent);
          return <Cell fill={color} stroke={color} strokeWidth="2" key={x} />;
        })}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export default HistogramGraph;
