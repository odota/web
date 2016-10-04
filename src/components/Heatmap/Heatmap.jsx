import React, {
  Component,
} from 'react';
import uuid from 'node-uuid';
import h337 from 'heatmap.js';

/**
 * Adjust each x/y coordinate by the provided scale factor.
 * If max is provided, use that, otherwise, use local max of data.
 * Shift all values by the provided shift.
 * Returns the adjusted heatmap data.
 */
function scaleAndExtrema(points, scalef, max, shift) {
  const newPoints = [];
  points.forEach((p) => {
    newPoints.push({
      x: Math.floor(p.x * scalef),
      y: Math.floor(p.y * scalef),
      value: p.value + (shift || 0),
    });
  });
  const vals = points.map((p) => p.value);
  const localMax = Math.max.apply(null, vals);
  return {
    min: 0,
    max: max || localMax,
    data: newPoints,
  };
}

const drawHeatmap = ({
  points = [],
  width = 600,
}, id) => {
  if (points && points.length) {
    const heatmap = h337.create({
      container: document.getElementById(id),
      radius: 15 * (width / 600),
    });
    // scale points by width/127 units to fit to size of map
    // offset points by 25 units to increase visibility
    const adjustedData = scaleAndExtrema(points, width / 127, null, 25);
    // console.log(adjustedData);
    heatmap.setData(adjustedData);
    /*
    heatmap.setData({
      max: 5,
      data: [{ x: 10, y: 15, value: 5}]
    });
    */
  }
};

class Heatmap extends Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }
  componentDidMount() {
    drawHeatmap(this.props, this.id);
  }
  componentWillUpdate(nextProps) {
    drawHeatmap(nextProps, this.id);
  }

  render() {
    return (
      <div
        id={this.id}
        style={{
          position: 'relative',
          top: 0,
          left: 0,
          width: 600,
        }}
      >
        <img width={600} src={'/assets/images/map.png'} role={'presentation'} />
      </div>);
  }
}

export default Heatmap;
