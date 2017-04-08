import React from 'react';
import PropTypes from 'prop-types';
import { Graph } from 'components/Visualizations';

// const getXAxis = columns => columns.length > 0 && ({ tick: { values: [columns[0].x, columns[columns.length - 1].x] } });

const TrendGraph = ({ columns, name, tooltip, onClick }) => (
  <Graph
    type="line"
    columns={columns}
    name={name}
    color="#66bbff"
    hidePoints
    yAxis={{
      tick: {
        format: d => Number(d.toFixed(2)),
      },
    }}
    tooltip={tooltip}
    onClick={onClick}
  />
);

TrendGraph.propTypes = {
  columns: PropTypes.arrayOf(),
  name: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func,
};

export default TrendGraph;
