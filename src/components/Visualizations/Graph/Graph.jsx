import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';

const Graph = ({ id, height = 320 }) => (
  <div style={{ height }} id={id} />
);

const generateGraph = ({
  columns,
  type,
  name,
  height = 320,
  colorFn,
  color,
  formatFn,
  xAxis,
  hidePoints,
}, id) => {
  if (columns && columns.length > 0) {
    const columnVals = columns.map(column => column.value);
    const xVals = columns.map(column => column.x);
    const configObject = {
      bindto: `#${id}`,
      data: {
        x: 'x',
        columns: [
          ['x', ...xVals],
          [name, ...columnVals],
        ],
        type,
        size: {
          height,
        },
      },
      axis: {
        x: xAxis,
      },
      point: {
        show: !hidePoints,
      },
    };
    if (formatFn) {
      configObject.data.labels = {
        format: formatFn,
      };
    }
    if (colorFn || color) {
      configObject.data.color = colorFn || (() => color);
    }
    c3.generate(configObject);
  }
};

class GraphWrapper extends Component {
  componentWillMount() {
    this.id = `a-${uuid.v4()}`;
  }

  componentDidMount() {
    generateGraph(this.props, this.id);
  }

  componentWillUpdate(nextProps) {
    generateGraph(nextProps, this.id);
  }

  render() {
    return <Graph id={this.id} height={this.props.height} />;
  }
}

const { string, number, arrayOf, shape, func, bool } = React.PropTypes;
GraphWrapper.propTypes = {
  columns: arrayOf(shape({
    x: number.isRequired,
    value: number.isRequired,
  })),
  xAxis: shape({
    tick: shape({
      values: arrayOf(number),
    }),
  }),
  hidePoints: bool,
  formatFn: func,
  colorFn: func,
  type: string,
  name: string,
  height: number,
};

export default GraphWrapper;
