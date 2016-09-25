import React, { Component } from 'react';
import c3 from 'c3';
import uuid from 'node-uuid';
import npmColor from 'color';

const Graph = ({ id }) => <div id={id} />;

// const bucketizeColumns = columns => {
//   const buckets = 40;
//   const bucketSize = buckets % columns.length;
//   let currentBucket = 0;
//   let currentItem = {
//     win: 0,
//     games: 0,
//   };
//   const newColumns = columns.reduce((newColumns, column) => {
//     if (currentBucket >= bucketSize) {
//       currentItem = {
//         win: currentItem.win / bucketSize,
//         games: currentItem.games / bucketSize,
//       };
//       newColumns.push(currentItem);
//       currentBucket = 0;
//       currentItem = {
//         win: 0,
//         games: 0,
//       };
//     }
//     currentItem = {
//       win: currentItem.win + column.win,
//       games: currentItem.games + column.games,
//     };
//     currentBucket++;
//     return newColumns;
//   }, []);
//   return newColumns;
// };

const buckets = 40;

const bucketizeColumns = (columns, xVals) => {
  const max = Math.max(...xVals);
  const bucketSize = ~~(max / buckets);
  const newXVals = [];
  let i = 0;
  for (i; i < buckets; i++) {
    newXVals.push(bucketSize * i);
  }
  i = 0;
  const newColumns = newXVals.map((val) => {
    const newObj = { win: 0, games: 0 };
    while (i < xVals.length && xVals[i] <= val) {
      newObj.win += columns[i].win;
      newObj.games += columns[i].games;
      i++;
    }
    i++;
    return newObj;
  });

  return {
    columnVals: newColumns,
    x: newXVals,
  };
};

class GraphWrapper extends Component {
  constructor() {
    super();
    this.id = `a-${uuid.v4()}`;
  }

  componentWillUpdate(nextProps) {
    const {
      columns,
      type,
      // yAxis,
      // xAxis,
      name,
      xVals,
    } = nextProps;
    let columnVals = [];
    let xCols = xVals;
    let yCols = columns;
    if (columns && columns.length > 40) {
      const buckets = bucketizeColumns(columns, xVals);
      yCols = buckets.columnVals;
      xCols = buckets.x;
    }
    if (yCols) {
      columnVals = yCols.map(column => column.games);
      c3.generate({
        bindto: `#${this.id}`,
        data: {
          x: 'x',
          columns: [
            ['x', ...xCols],
            [name, ...columnVals],
          ],
          color: (color, data) => {
            // const { index, value } = columns[data];
            // const wins = columns[index] && columns[index].win;
            // const newValue = ((wins * 100) / value).toFixed(2);
            // const h = Math.floor(120 * newValue);
            // console.log('data', data, color)
            if (data.index || data.index === 0) {
              const { index, value } = data;
              const wins = yCols[index] && yCols[index].win;
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
              const wins = yCols[index] && yCols[index].win;
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
