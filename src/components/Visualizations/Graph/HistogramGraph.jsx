import React from 'react';
import { Graph } from 'components/Visualizations';
import strings from 'lang';
import { hsvToRgb } from 'utility';

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

HistogramGraph.propTypes = {
  columns: React.PropTypes.arrayOf(),
};

export default HistogramGraph;
