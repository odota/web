import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'uuid';
import strings from 'lang';

const Graph = ({ id, height = 320 }) => (
  <div style={{ height }} id={id} />
);

const generateGraph = ({
  columns = [],
  type,
  name,
  height = 320,
  colorFn,
  color,
  colors,
  formatFn,
  xAxis,
  yAxis,
  hidePoints,
  otherColumnNames,
  noX,
  tooltip,
  onClick,
}, id) => {
  if (columns) {
    const columnVals = columns.map(column => column.value);
    const configObject = {
      bindto: `#${id}`,
      data: {
        columns: [
          [name, ...columnVals],
        ],
        type,
        size: {
          height,
        },
        empty: { label: { text: strings.trends_no_data } },
      },
      axis: {
        x: xAxis,
        y: yAxis,
      },
      point: {
        show: !hidePoints,
      },
      line: {
        connectNull: true,
      },
    };
    if (!noX) {
      configObject.data.x = 'x';
      configObject.data.columns.push([
        'x',
        ...columns.map(column => column.x),
      ]);
    }
    // Copy over the other columns into the data columns
    if (otherColumnNames) {
      configObject.data.columns = [
        ...configObject.data.columns,
        ...otherColumnNames.map(column => [
          column.name,
          ...columns.map(col => col[column.property]),
        ]),
      ];
    }
    if (formatFn) {
      configObject.data.labels = {
        format: formatFn,
      };
    }
    if (colors) {
      configObject.data.colors = colors;
    } else if (colorFn || color) {
      configObject.data.color = colorFn || (() => color);
    }
    if (tooltip) {
      configObject.tooltip = tooltip;
    }
    if (onClick) {
      configObject.data = {
        ...configObject.data,
        selection: {
          // sets `cursor: pointer` on point
          enabled: true,
        },
        onclick: onClick,
      };
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

/*
const { string, number, arrayOf, shape, func, bool } = React.PropTypes;
GraphWrapper.propTypes = {
  columns: arrayOf(shape({
    x: number,
    value: number.isRequired,
  })).isRequired,
  xAxis: shape({
    tick: shape({
      values: arrayOf(number),
    }),
  }),
  hidePoints: bool,
  formatFn: func,
  colorFn: func,
  type: string.isRequired,
  name: string,
  height: number,
  noX: bool,
  otherColumnNames: arrayOf(shape({
    name: string.isRequired,
    property: string.isRequired,
  })),
};
*/

export default GraphWrapper;
