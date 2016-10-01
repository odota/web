// import React from 'react';
// import { PercentContainer } from 'components/ColumnComponents';
import React from 'react';
import { transformations } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

export default [{
  displayName: strings.th_category,
  field: 'category',
  width: 2,
  sortFn: true,
  displayFn: transformations.category,
}, {
  displayName: strings.th_matches,
  field: 'matches',
  width: 2,
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: strings.th_win,
  field: 'winPercent',
  width: 2,
  sortFn: 1,
  displayFn: (row, column, field) => <TablePercent val={Number(field.toFixed(1))} />,
}];

  // displayName: 'Win %',
  // field: 'win',
  // width: 2,
  // displayFn: (row) => <PercentContainer wins={row.win} games={row.games} />,
  // sortFn: (row) => (row.win / row.games),
