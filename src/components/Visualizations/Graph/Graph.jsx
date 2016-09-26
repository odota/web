import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';
import npmColor from 'color';

const Graph = ({ id }) => <div id={id} />;

class GraphWrapper extends Component {
  constructor() {
    super();
    this.id = `a-${uuid.v4()}`;
  }

  componentWillUpdate(nextProps) {
    const {
      columns,
      type,
      name,
      xVals,
    } = nextProps;
    if (columns) {
      const columnVals = columns.map(column => column.games);
      c3.generate({
        bindto: `#${this.id}`,
        data: {
          x: 'x',
          columns: [
            ['x', ...xVals],
            [name, ...columnVals],
          ],
          color: (color, data) => {
            if (data.index || data.index === 0) {
              const { index, value } = data;
              const wins = columns[index] && columns[index].win;
              if (!value) {
                return npmColor().rgb(255, 255, 255);
              }
              const percent = wins / value;
              return npmColor().hsv(percent * 120, 80, 80).rgbString();
            }
            return color;
          },
          type,
          labels: {
            format: (value, id, index) => {
              if (!value) {
                return '';
              }
              const wins = columns[index] && columns[index].win;
              const newValue = Number(((wins * 100) / value).toFixed(1));
              return `${newValue}%`;
            },
          },
        },
      });
    }
  }

  render() {
    return <Graph id={this.id} />;
  }
}

const { array, string, object } = React.PropTypes;
GraphWrapper.propTypes = {
  columns: array,
  type: string,
  yAxis: object,
  xAxis: object,
  xVals: array,
  name: string,
};

export default GraphWrapper;
