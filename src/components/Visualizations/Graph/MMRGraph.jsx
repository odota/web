import React from 'react';
import PropTypes from 'prop-types';
import strings from 'lang';
import {
  XAxis,
  YAxis,
  Tooltip,
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  Label, ResponsiveContainer, Brush,
} from 'recharts';
import constants from 'components/constants';
import styled from 'styled-components';

const StyledGraphArea = styled.div`
user-select: none;
`;

const filterZeroValues = function (column) {
  const c = column;
  c.solo_competitive_rank = c.solo_competitive_rank || null;
  c.competitive_rank = c.competitive_rank || null;
  return c;
};

const formatXTick = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};
const formatXTickDetailed = (time) => {
  const date = new Date(time);
  return `${date.toLocaleString()}`;
};

const MMRGraph = ({ columns }) => (
  <StyledGraphArea>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={columns.map(filterZeroValues)}
        margin={{
        top: 5, right: 30, left: 30, bottom: 5,
      }}
      >
        <XAxis dataKey="time" interval={49} tickFormatter={formatXTick}>
          <Label value={strings.th_time} position="insideTopRight" />
        </XAxis>
        <YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
        <CartesianGrid
          stroke="#505050"
          strokeWidth={1}
          opacity={0.5}
        />

        <Tooltip
          wrapperStyle={{ backgroundColor: constants.darkPrimaryColor, border: 'none' }}
          labelFormatter={formatXTickDetailed}
        />
        <Line
          dot={false}
          dataKey="solo_competitive_rank"
          stroke="#66BBFF"
          strokeWidth={2}
          name={strings.th_solo_mmr}
        />
        <Line
          dot={false}
          dataKey="competitive_rank"
          stroke="#FF4C4C"
          strokeWidth={2}
          name={strings.th_party_mmr}
        />
        <Legend verticalAlign="top" />
        <Brush dataKey="time" height={40} stroke={constants.primaryLinkColor} fill={constants.darkPrimaryColor} tickFormatter={formatXTick} />
      </LineChart>
    </ResponsiveContainer>
  </StyledGraphArea>
);

MMRGraph.propTypes = {
  columns: PropTypes.arrayOf().isRequired,
};

export default MMRGraph;
