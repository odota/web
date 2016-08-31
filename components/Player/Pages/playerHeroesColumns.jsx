import React from 'react';
import PercentContainer from '../../PercentContainer';
import { transformations } from '../../../utility';

export const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 2,
  displayFn: transformations.hero_id,
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 2,
  sortFn: 1,
  displayFn: transformations.last_played,
}, {
  displayName: 'Played',
  field: 'games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: (row) => <PercentContainer wins={row.win} games={row.games} />,
  sortFn: (row) => (row.win / row.games),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: (row) => <PercentContainer wins={row.with_win} games={row.with_games} />,
  sortFn: (row) => (row.with_win / row.with_games),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: (row) => <PercentContainer wins={row.against_win} games={row.against_games} />,
  sortFn: (row) => (row.against_win / row.against_games),
}];

export const playerHeroesColumns = [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];