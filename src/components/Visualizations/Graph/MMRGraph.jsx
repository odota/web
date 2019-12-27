import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import styled from 'styled-components';
import constants from '../../constants';

const StyledGraphArea = styled.div`
user-select: none;
`;

const filterZeroValues = column => ({
  ...column,
  solo_competitive_rank: column.solo_competitive_rank || null,
  competitive_rank: column.competitive_rank || null,
});

const formatXTick = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};
const formatXTickDetailed = (time) => {
  const date = new Date(time);
  return `${date.toLocaleString()}`;
};

const MMRGraph = ({ columns, strings }) => (
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
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(MMRGraph);
