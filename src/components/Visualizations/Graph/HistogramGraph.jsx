import React from 'react';
import PropTypes from 'prop-types';
import { hsvToRgb } from 'utility';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Cell, ResponsiveContainer,
} from 'recharts';
import strings from 'lang';
import { StyledTooltip } from './Styled';

const HistogramTooltipContent = ({ payload }) => {
  const data = (payload[0] || {}).payload;
  return (<StyledTooltip>
    <div>{`${data && data.x}`}</div>
    <div>{`${data && data.games} ${strings.th_matches}`}</div>
    <div>{`${data && (data.win / data.games * 100).toFixed(2)} ${strings.th_win}`}</div>
  </StyledTooltip>);
};
HistogramTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
};

const HistogramGraph = ({
  columns,
}) => (<ResponsiveContainer width="100%" height={400}>
  <BarChart
    height={400}
    data={columns}
    margin={{
      top: 5, right: 30, left: 30, bottom: 5,
    }}
  >
    <XAxis dataKey="x" interval={1}>
      <Label value="" position="insideTopRight" />
    </XAxis>
    <YAxis />
    <CartesianGrid
      stroke="#505050"
      strokeWidth={1}
      opacity={0.5}
    />

    <Tooltip content={<HistogramTooltipContent />} />
    <Bar
      dataKey="games"
    >
      {
        columns.map((entry) => {
          const { win, games } = entry;
          const percent = win / games;
          const adjustedVal = percent >= 0.5 ?
            percent + ((1 - percent) / 5) :
            percent - (percent / 5);
          const rgb = hsvToRgb(adjustedVal * (1 / 3), 0.9, 0.9);
          const color = `rgb(${Math.floor(rgb[0])}, ${Math.floor(rgb[1])}, ${Math.floor(rgb[2])})`;
          return <Cell fill={color} />;
        })
      }
    </Bar>
  </BarChart>
</ResponsiveContainer>
);

HistogramGraph.propTypes = {
  columns: PropTypes.arrayOf(),
};

export default HistogramGraph;
