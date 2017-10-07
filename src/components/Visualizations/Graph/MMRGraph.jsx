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
  Label,
} from 'recharts';
import constants from 'components/constants';

const formatXTick = (time) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() + 1}`;
};

const MMRGraph = ({ columns }) => (<LineChart
  width={1200}
  height={400}
  data={columns}
  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
>
  <XAxis dataKey="time" interval={49} tickFormatter={formatXTick}>
    <Label value={strings.th_time} position="insideTopRight" />
  </XAxis>
  <YAxis />
  <CartesianGrid
    stroke="#505050"
    strokeWidth={1}
    opacity={0.5}
  />

  <Tooltip
    wrapperStyle={{ backgroundColor: constants.darkPrimaryColor, border: 'none' }}
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
  <Legend />
</LineChart>
);

MMRGraph.propTypes = {
  columns: PropTypes.arrayOf().isRequired,
};

export default MMRGraph;
