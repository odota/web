import React from 'react';
import {
  defaultSort,
  transformedSort,
  winPercentTransform,
} from './utility';
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
  sortFn: defaultSort,
  displayFn: ({ field }) => (
    <div className="subText">{transformations.last_played({ field })}</div>),
}, {
  displayName: 'Played',
  field: 'games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.games} />,
  sortFn: transformedSort.bind(null, winPercentTransform('games')),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.with_games} />,
  sortFn: transformedSort.bind(null, winPercentTransform('with_games')),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field} games={row.against_games} />,
  sortFn: transformedSort.bind(null, winPercentTransform('against_games')),
}];

export default [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];

export { playerHeroesOverviewColumns };
