import React from 'react';
import npmColor from 'color';
import { Graph } from 'components/Visualizations';

const getXAxis = columns => columns.length > 0 && ({ tick: { values: [columns[0].x, columns[columns.length - 1].x] } });

const TrendGraph = ({ columns, name }) => (
  <Graph
    type="spline"
    columns={columns}
    name={name}
    color={npmColor().rgb(102, 187, 255).rgbString()}
    hidePoints
    xAxis={getXAxis(columns)}
  />
);

TrendGraph.propTypes = {
  columns: React.PropTypes.array,
};

export default TrendGraph;
