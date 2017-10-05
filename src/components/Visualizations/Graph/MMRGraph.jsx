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

// TODO add a tooltip
const MMRTooltipContent = ({ payload }) => (<div />);
MMRTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
};

// TODO add dates to x axis
const MMRGraph = ({ columns }) => (<LineChart
  width={1200}
  height={400}
  data={columns}
  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
>
  <XAxis dataKey="time" interval={4}>
    <Label value={strings.th_time} position="insideTopRight" />
  </XAxis>
  <YAxis />
  <CartesianGrid
    stroke="#505050"
    strokeWidth={1}
    opacity={0.5}
  />

  <Tooltip content={<MMRTooltipContent />} />
  <Line
    dot={false}
    dataKey="value"
    stroke="#66BBFF"
    strokeWidth={2}
    name={strings.th_solo_mmr}
  />
  <Line
    dot={false}
    dataKey="competitiveRank"
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
