import React from 'react';
import { defaultSort, transformedSort } from './utility';
import { HOST_URL } from '../../../yasp.config';

const winPercentTransform = (list, field, property) => list[field][property] / list.games[property];

export default [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 1,
  displayFn: ({ field }) => (
    <div style={{ marginTop: 5 }}>
      <img src={`${HOST_URL}${field.display.img}`} style={{ height: 30 }} role="presentation" />
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
  displayFn: ({ field, row }) => `${(Math.ceil(10000 * ((field.display) / (row.games.display))) / 100).toFixed(2)}%`,
  sortFn: transformedSort.bind(null, winPercentTransform),
}];
