import React from 'react';
import { defaultSort, transformedSort } from './utility';

const winPercentTransform = (list, field, property) => list[field][property] / list.games[property];

const overviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.5,
  displayFn: ({ field }) => (
    <div style={{ marginTop: 5 }}>
      <img src={field.display} style={{ height: 30 }} role="presentation" />
    </div>
  ),
}, {
  displayName: 'Played',
  field: 'games',
  width: 1,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 1,
  displayFn: ({ field, row }) => `${(field / row.games).toFixed(2)}`,
  sortFn: transformedSort.bind(winPercentTransform),
}];

export { overviewColumns };
