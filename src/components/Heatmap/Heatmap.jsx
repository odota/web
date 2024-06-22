import React, { Component } from 'react';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';
import h337 from 'heatmap.js';
import DotaMap from '../DotaMap';

/**
 * Adjust each x/y coordinate by the provided scale factor.
 * If max is provided, use that, otherwise, use local max of data.
 * Returns the adjusted heatmap data.
 */
function scaleAndExtrema(points, scalef, max) {
  const newPoints = points.map(p => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: Math.sqrt(p.value),
  }));
  const vals = newPoints.map(p => p.value);
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
  const adjustedData = scaleAndExtrema(points, width / 127, null);
  heatmap.setData(adjustedData);
};

class Heatmap extends Component {
  id = `a-${nanoid()}`;

  static propTypes = {
    width: PropTypes.number,
    startTime: PropTypes.instanceOf(Date)
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

  render() {
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.width,
        }}
        id={this.id}
      >
        <DotaMap width={this.props.width} maxWidth={this.props.width} startTime={this.props.startTime} />
      </div>);
  }
}

Heatmap.defaultProps = {
  width: 600,
  startTime: null
};

export default Heatmap;
