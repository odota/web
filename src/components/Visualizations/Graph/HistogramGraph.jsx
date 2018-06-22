import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { hsvToRgb } from '../../../utility';
import { StyledTooltip } from './Styled';

const HistogramTooltipContent = ({ payload, xAxisLabel = '', strings }) => {
  const data = payload && payload[0] && payload[0].payload;
  return (
    <StyledTooltip>
      <div>{`${data && data.x} ${xAxisLabel}`}</div>
      <div>{`${data && data.games} ${strings.th_matches}`}</div>
      <div>{`${data && (data.win / data.games * 100).toFixed(2)} ${strings.th_win}`}</div>
    </StyledTooltip>);
};
HistogramTooltipContent.propTypes = {
  payload: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string,
  strings: PropTypes.shape({}),
};

const graphHeight = 400;

const HistogramGraph = ({
  columns, xAxisLabel = '', strings,
}) => (
  <ResponsiveContainer width="100%" height={graphHeight}>
    <BarChart
      height={graphHeight}
      data={columns}
      margin={{
      top: 0, right: 0, left: 0, bottom: 0,
    }}
    >
      <XAxis dataKey="x" interval={1}>
        <Label value="" position="insideTopRight" />
      </XAxis>
      <YAxis />
      <CartesianGrid
        stroke="rgba(255, 255, 255, .2)"
        strokeWidth={1}
        opacity={0.5}
      />

      <Tooltip content={<HistogramTooltipContent xAxisLabel={xAxisLabel} strings={strings} />} cursor={{ fill: 'rgba(255, 255, 255, .35)' }} />
      <Bar
        dataKey="games"
      >
        {
          columns.map((entry) => {
            const { win, games, x } = entry;
            const percent = win / games;
            const adjustedVal = percent >= 0.5 ?
              percent + ((1 - percent) / 5) :
              percent - (percent / 5);
            const rgb = hsvToRgb(adjustedVal * (1 / 3), 0.9, 0.9);
            const stroke = `rgba(${Math.floor(rgb[0])}, ${Math.floor(rgb[1])}, ${Math.floor(rgb[2])}, .8)`;
            const color = `rgba(${Math.floor(rgb[0])}, ${Math.floor(rgb[1])}, ${Math.floor(rgb[2])}, .5)`;
            return <Cell fill={color} stroke={stroke} strokeWidth="2" key={x} />;
          })
        }
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

HistogramGraph.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  xAxisLabel: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  strings: state.app.strings,
});

export default connect(mapStateToProps)(HistogramGraph);
