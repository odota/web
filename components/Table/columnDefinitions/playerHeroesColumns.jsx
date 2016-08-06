import React from 'react';
import { PercentContainer } from '../../ColumnComponents';
// import { API_HOST } from '../../../yasp.config';
import { transformations } from '../../../utility';

const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 2,
  sortFn: 'default',
  displayFn: ({ field }) => (
    <div className="subText">{transformations.last_played({ field })}</div>),
}, {
  displayName: 'Played',
  field: 'games',
  width: 1.5,
  sortFn: 'default',
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.games} />,
  sortFn: (a) => (a.win / a.games),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: 'default',
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.with_games} />,
  sortFn: (a) => (a.with_win / a.with_games),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: 'default',
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.against_games} />,
  sortFn: (a) => (a.against_win / a.against_games),
}];

export default [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];

export { playerHeroesOverviewColumns };
