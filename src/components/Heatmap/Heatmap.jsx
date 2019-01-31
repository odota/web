import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import h337 from 'heatmap.js';
import DotaMap from '../DotaMap';

/**
 * Adjust each x/y coordinate by the provided scale factor.
 * If max is provided, use that, otherwise, use local max of data.
 * Shift all values by the provided shift.
 * Returns the adjusted heatmap data.
 */
function scaleAndExtrema(points, scalef, max, shift) {
  // the max values should not deviate from the average by more than a factor of 25
  const maxValue = (points.reduce((a, b) => a + b.value, 0) / points.length) * 25;

  const newPoints = points.map(p => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: Math.min(p.value, maxValue) + shift,
  }));
  const vals = points.map(p => Math.min(p.value, maxValue));
  const localMax = Math.max(...vals);
  return {
    min: 0,
    max: max || localMax,
    data: newPoints,
  };
}

const drawHeatmap = ({
  points = [],
  width,
}, heatmap) => {
  // scale points by width/127 units to fit to size of map
  // offset points by 25 units to increase visibility
  const adjustedData = scaleAndExtrema(points, width / 127, null, 25);
  heatmap.setData(adjustedData);
};

class Heatmap extends Component {
  static propTypes = {
    width: PropTypes.number,
  }

  componentDidMount() {
    this.heatmap = h337.create({
      container: document.getElementById(this.id),
      radius: 15 * (this.props.width / 600),
    });
    drawHeatmap(this.props, this.heatmap);
  }
  componentDidUpdate() {
    drawHeatmap(this.props, this.heatmap);
  }

  id = `a-${nanoid()}`;

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.width,
        }}
        id={this.id}
      >
        <DotaMap width={this.props.width} maxWidth={this.props.width} />
      </div>);
  }
}

Heatmap.defaultProps = {
  width: 600,
};

export default Heatmap;
