import React from 'react';
import npmColor from 'color';
import { Graph } from 'components/Visualizations';
import strings from 'lang';

const colorFn = columns => (color, data) => {
  if (data.index || data.index === 0) {
    const { index, value } = data;
    const wins = columns[index] && columns[index].win;
    if (!value) {
      return npmColor().rgb(255, 255, 255);
    }
    const percent = wins / value;
    const adjustedVal = percent >= 0.5 ?
      percent + ((1 - percent) / 5) :
      percent - (percent / 5);
    return npmColor().hsv((percent === 0.5 ? percent : adjustedVal) * 120, 90, 90).rgbString();
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

const HistogramGraph = ({ columns }) => (
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
