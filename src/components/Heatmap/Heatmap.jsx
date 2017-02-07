import React, {
  Component,
} from 'react';
import DotaMap from 'components/DotaMap';
import uuid from 'uuid';
import h337 from 'heatmap.js';

/**
 * Adjust each x/y coordinate by the provided scale factor.
 * If max is provided, use that, otherwise, use local max of data.
 * Shift all values by the provided shift.
 * Returns the adjusted heatmap data.
 */
function scaleAndExtrema(points, scalef, max, shift) {
  const newPoints = points.map(p => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: p.value + (shift || 0),
  }));
  const vals = points.map(p => p.value);
  const localMax = Math.max.apply(null, vals);
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
  // console.log(adjustedData);
  heatmap.setData(adjustedData);
};

class Heatmap extends Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentDidMount() {
    this.heatmap = h337.create({
      container: document.getElementById(this.id),
      radius: 15 * (this.props.width / 600),
    });
    drawHeatmap(this.props, this.heatmap);
  }
  componentWillUpdate(nextProps) {
    drawHeatmap(nextProps, this.heatmap);
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
        <DotaMap width={this.props.width} maxWidth={this.props.width} />
      </div>);
  }
}

Heatmap.defaultProps = {
  points: [],
  width: 600,
};

export default Heatmap;
