import React from 'react';
import nanoid from 'nanoid';
import h337 from 'heatmap.js';
import DotaMap from '../DotaMap';

type PointArray = { x: number; y: number; value: number }[];
/**
 * Adjust each x/y coordinate by the provided scale factor.
 * If max is provided, use that, otherwise, use local max of data.
 * Returns the adjusted heatmap data.
 */
function scaleAndExtrema(
  points: PointArray,
  scalef: number,
  max: number | null,
) {
  const newPoints = points.map((p) => ({
    x: Math.floor(p.x * scalef),
    y: Math.floor(p.y * scalef),
    value: Math.sqrt(p.value),
  }));
  const vals = newPoints.map((p) => p.value);
  const localMax = Math.max(...vals);
  return {
    min: 0,
    max: max || localMax,
    data: newPoints,
  };
}

const drawHeatmap = (
  { points = [], width }: { points: PointArray; width: number },
  heatmap: any,
) => {
  // scale points by width/127 units to fit to size of map
  const adjustedData = scaleAndExtrema(points, width / 127, null);
  heatmap.setData(adjustedData);
};

class Heatmap extends React.Component<{
  points: PointArray;
  width: number;
  startTime: number;
}> {
  id = `a-${nanoid()}`;
  heatmap: h337.Heatmap<string, string, string> | undefined = undefined;
  static defaultProps = {
    width: 600,
    startTime: null,
  };

  componentDidMount() {
    this.heatmap = h337.create({
      container: document.getElementById(this.id)!,
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
        <DotaMap
          width={this.props.width}
          maxWidth={this.props.width}
          startTime={this.props.startTime}
        />
      </div>
    );
  }
}

export default Heatmap;
