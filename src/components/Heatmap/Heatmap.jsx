import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  const ctx = heatmap.current.getContext('2d');
  ctx.clearRect(0, 0, heatmap.current.width, heatmap.current.height);

  adjustedData.data.forEach((p) => {
    ctx.beginPath();
    ctx.filter = `blur(4px)`;

    const sizeModifier = Math.max(75 * (1-(p.value / adjustedData.max)), 40);

    ctx.arc(p.x, p.y, width / sizeModifier, 0, 2 * Math.PI);
    
    const redValue = Math.floor(255 * (p.value / adjustedData.max));
    const greenValue = Math.floor(255 * (1 - (p.value / adjustedData.max)));
    const alphaValue = (p.value / adjustedData.max) - ((p.value / adjustedData.max) * .35);

    ctx.fillStyle = `rgba(${redValue}, ${greenValue}, 0, ${alphaValue})`;
    ctx.fill();
  })

  // blur whole heatmap
  ctx.drawImage(heatmap.current, 0, 0);
  // heatmap.setData(adjustedData);
};

class Heatmap extends Component {
  // ref for container
  containerRef = React.createRef();
  heatmapCanvas = React.createRef();

  static propTypes = {
    width: PropTypes.number,
    startTime: PropTypes.instanceOf(Date)
  }

  componentDidMount() {
    drawHeatmap(this.props, this.heatmapCanvas);
  }
  componentDidUpdate() {
    drawHeatmap(this.props, this.heatmapCanvas);
  }

  render() {
    return (
      <div
        ref={this.containerRef}
        style={{
          width: this.props.width,
          height: this.props.width,
          position: 'relative',
        }}
        id={this.id}
      >
        <DotaMap width={this.props.width} maxWidth={this.props.width} startTime={this.props.startTime} />
        <canvas style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', }} width={this.props.width} height={this.props.width} ref={this.heatmapCanvas} />
      </div>);
  }
}

Heatmap.defaultProps = {
  width: 600,
  startTime: null
};

export default Heatmap;
