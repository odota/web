import React from 'react';
import { transformations } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

export default [{
  displayName: strings.th_category,
  field: 'category',
  sortFn: true,
  displayFn: transformations.category,
}, {
  displayName: strings.th_matches,
  field: 'matches',
  sortFn: 1,
  displayFn: transformations.matches,
}, {
  displayName: strings.th_win,
  field: 'winPercent',
  sortFn: 1,
  displayFn: (row, column, field) => <TablePercent val={Number(field.toFixed(1))} />,
}];
