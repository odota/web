// import React from 'react';
// import { PercentContainer } from '../../ColumnComponents';
import React from 'react';
import { transformations } from 'utility';
import PercentContainer from '../../PercentContainer';

export default [{
  displayName: 'Category',
  field: 'category',
  width: 2,
  displayFn: transformations.category,
}, {
  displayName: 'Matches',
  field: 'matches',
  width: 2,
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: 'Win %',
  field: 'winPercent',
  width: 2,
  sortFn: 1,
  displayFn: (row, column, field) => <PercentContainer percent={field.toFixed(1)} />,
}];

  // displayName: 'Win %',
  // field: 'win',
  // width: 2,
  // displayFn: (row) => <PercentContainer wins={row.win} games={row.games} />,
  // sortFn: (row) => (row.win / row.games),
