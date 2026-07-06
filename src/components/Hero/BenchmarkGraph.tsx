import React from "react";
import { nanoid } from "nanoid";
import styled from "styled-components";
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import constants from "../constants";
import Grid from "../Visualizations/Graph/Grid";

const Wrapper = styled.div`
  box-sizing: border-box;
  flex: 1 1 100%;
  max-width: 33.333%;
  padding: 8px;

  @media screen and (max-width: ${constants.wrapTablet}) {
    max-width: 50%;
  }

  @media screen and (max-width: ${constants.wrapMobile}) {
    max-width: none;
  }
`;

const Title = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  margin: 24px 0;
  text-align: right;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
`;

const tooltipCursorStyle = {
  stroke: constants.colorBlueGray,
  strokeWidth: 2,
};

const tooltipWrapperStyle = {
  background: constants.almostBlack,
  border: 0,
};

const tooltipContentStyle = {
  fontFamily: constants.fontFamilyFuturistic,
  background: "transparent",
  border: 0,
};

const BenchmarkGraph = ({ data }: { data: any }) => {
  const graphId = nanoid();

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={data.data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient
              id={`colorGraph-${graphId}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="50%" stopColor={data.color} stopOpacity=".95" />
              <stop offset="100%" stopColor={data.color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <Grid />
          <XAxis
            dataKey="Percentage"
            tick={{
              fontFamily: constants.fontFamilySerif,
              fontSize: 13,
              fill: "#B0B0B0",
            }}
            tickFormatter={(value) => value?.toLocaleString()}
            axisLine={false}
            tickLine={false}
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
          />
          <Area
            dataKey="Value"
            name={data.title}
            stroke={data.color}
            strokeWidth="3"
            fill={`url(#colorGraph-${graphId})`}
          />
          <Tooltip
            wrapperStyle={tooltipWrapperStyle}
            contentStyle={tooltipContentStyle}
            cursor={tooltipCursorStyle}
          />
        </AreaChart>
      </ResponsiveContainer>
      <Title>{data.title}</Title>
    </Wrapper>
  );
};

export default BenchmarkGraph;
