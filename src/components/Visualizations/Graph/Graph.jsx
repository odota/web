import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';

const Graph = ({ id }) => <div id={id} />;

class GraphWrapper extends Component {
  constructor() {
    super();
    this.id = uuid.v4();
  }

  componentWillUpdate(nextProps) {
    const {
      columns,
      type,
      yAxis,
      xAxis,
      name,
    } = nextProps;
    c3.generate({
      bindto: this.id,
      data: {
        columns: [
          [name, ...columns],
        ],
        types: { name: type },
      },
      axis: {
        y: yAxis,
        x: xAxis,
      },
    });
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
  name: string,
};

export default GraphWrapper;
