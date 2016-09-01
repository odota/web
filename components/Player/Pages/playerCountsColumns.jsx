// import React from 'react';
// import { PercentContainer } from '../../ColumnComponents';
// import { API_HOST } from '../../../yasp.config';
import { transformations } from '../../../utility';

export default [{
  displayName: 'Hero',
  field: 'category',
  width: 2,
  displayFn: transformations.category,
}, {
  displayName: 'Last',
  field: 'matches',
  width: 2,
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: 'Last',
  field: 'winPercent',
  width: 2,
  sortFn: 1,
  displayFn: transformations.winPercent,
}];

  // displayName: 'Win %',
  // field: 'win',
  // width: 2,
  // displayFn: (row) => <PercentContainer wins={row.win} games={row.games} />,
  // sortFn: (row) => (row.win / row.games),
