import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import {
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import constants from '../constants';

const Wrapper = styled.div`
  box-sizing: border-box;
  flex: 1 1 100%;
  max-width: 33.333%;
  padding: 16px 8px;

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
  margin-top: 8px;
  text-align: center;
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

const BenchmarkGraph = ({ data }) => (
  <Wrapper>
    <ResponsiveContainer width="100%" height={250}>
      <AreaChart
        data={data.data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="rgba(255, 255, 255, .1)" strokeDasharray="0" />
        <XAxis dataKey="Percentage" />
        <YAxis />
        <Area dataKey="Value" stroke={constants.colorBlue} fill={constants.colorBlueMuted} />
        <Tooltip wrapperStyle={tooltipWrapperStyle} cursor={tooltipCursorStyle} />
      </AreaChart>
    </ResponsiveContainer>
    <Title>{data.title}</Title>
  </Wrapper>
);

BenchmarkGraph.propTypes = {
  data: propTypes.shape({}).isRequired,
};

export default BenchmarkGraph;
