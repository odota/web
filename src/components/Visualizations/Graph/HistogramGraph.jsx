import React from 'react';
import { Graph } from 'components/Visualizations';
import strings from 'lang';

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
function hsvToRgb(h, s, v) {
  let r;
  let g;
  let b;

  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = v * (1 - s);
  const q = v * (1 - (f * s));
  const t = v * (1 - ((1 - f) * s));

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = v; g = t; b = p;
  }

  return [r * 255, g * 255, b * 255];
}

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
