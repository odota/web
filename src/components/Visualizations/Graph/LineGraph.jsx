import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';
import npmColor from 'color';

const Graph = ({ id, height = 320 }) => (
  <div style={{ height }} id={id} />
);

const colorByPercent = columns => (color, data) => {
  if (data.index || data.index === 0) {
    const { index, value } = data;
    const wins = columns[index] && columns[index].win;
    if (!value) {
      return npmColor().rgb(255, 255, 255);
    }
    const percent = wins / value;
    const adjustedVal = percent >= 0.5 ?
      percent + ((1 - percent) / 5) :
      percent - (percent / 5);
    return npmColor().hsv((percent === 0.5 ? percent : adjustedVal) * 120, 90, 90).rgbString();
  }
  return color;
};

const getLabels = (columns) => ({
  format: (value, id, index) => {
    if (!value) {
      return '';
    }
    const wins = columns[index] && columns[index].win;
    const newValue = Number(((wins * 100) / value).toFixed(1));
    return `${newValue}%`;
  },
});

const getColumns = (xVals, columnVals, name) => [
  ['x', ...xVals],
  [name, ...columnVals],
];

const generateGraph = ({ values, columns, type, name, height = 320, winsGraph }, id) => {
  if (columns && columns.length > 0) {
    const columnVals = columns.map(column => column.value);
    const xVals = columns.map(column => column.x);
    const configObject = {
      bindto: `#${id}`,
      data: {
        x: 'x',
        columns: getColumns(xVals, columnVals, name),
        color: () => npmColor().rgb(102, 187, 255).rgbString(),
        type,
        size: {
          height,
        },
      },
      axis: {
        x: {
          tick: {
            values: [xVals[0], xVals[xVals.length - 1]],
          },
        },
      },
      point: {
        show: false,
      },
    };
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

const { array, string, object, number } = React.PropTypes;
GraphWrapper.propTypes = {
  columns: array,
  type: string,
  yAxis: object,
  xAxis: object,
  name: string,
  height: number,
};

export default GraphWrapper;
