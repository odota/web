import React from 'react';
import PropTypes from 'prop-types';
// import strings from 'lang';
import { hsvToRgb } from 'utility';
import {
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Cell,
} from 'recharts';

/*
const colorFn = columns => (color, data) => {
  if (data.index || data.index === 0) {
    const {
      index,
      value,
    } = data;
    const wins = columns[index] && columns[index].win;
    if (!value) {
      return '#FFFFFF';
    }
    const percent = wins / value;
    const adjustedVal = percent >= 0.5 ?
      percent + ((1 - percent) / 5) :
      percent - (percent / 5);
    const rgb = hsvToRgb(adjustedVal * (1 / 3), 0.9, 0.9);
    return `rgb(${Math.floor(rgb[0])}, ${Math.floor(rgb[1])}, ${Math.floor(rgb[2])})`;
  }
  return color;
};

const formatFn = columns => (value, id, index) => {
  if (!value) {
    return '';
  }
  const wins = columns[index] && columns[index].win;
  const newValue = Number(((wins * 100) / value).toFixed(1));
  return `${newValue}%`;
};

const HistogramGraph = ({
  columns,
}) => (
  <Graph
    type="bar"
    columns={columns.map(column => ({
      x: column.x,
      value: column.games,
    }))}
    name={strings.th_matches}
    colorFn={colorFn(columns)}
    formatFn={formatFn(columns)}
  />
);
*/

// TODO add tooltips
const HistogramTooltipContent = ({ payload }) => (<div />);
HistogramTooltipContent.propTypes = {
  payload: PropTypes.arrayOf({}),
};

const HistogramGraph = ({
  columns,
}) => (<BarChart
  width={1200}
  height={400}
  data={columns}
  margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
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

  <Tooltip content={<HistogramTooltipContent />} /> <Bar
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
        console.log(color);
        return <Cell fill={color} />;
      })
    } </Bar> </BarChart>
);

HistogramGraph.propTypes = {
  columns: PropTypes.arrayOf(),
};

export default HistogramGraph;
