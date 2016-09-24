import React from 'react';
import { transformations, getPercentWin } from 'utility';
import { TablePercent } from '../../Visualizations';

export const playerHeroesOverviewColumns = [{
  displayName: 'Hero',
  field: 'hero_id',
  width: 3.1,
  displayFn: transformations.hero_id,
  sortFn: (row) => (row.last_played),
}, {
  displayName: 'mp',
  field: 'games',
  width: 1,
  sortFn: true,
}, {
  displayName: 'Win %',
  field: 'win',
  width: 2,
  displayFn: (row) => (<TablePercent val={getPercentWin(row.win, row.games)} />),
  sortFn: (row) => (row.win / row.games),
}];

const restColumns = [{
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win with %',
  field: 'with_win',
  width: 2,
  displayFn: (row) => (<TablePercent val={getPercentWin(row.with_win, row.with_games)} />),
  sortFn: (row) => (row.with_win / row.with_games),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: 'Win against %',
  field: 'against_win',
  width: 2,
  displayFn: (row) => (<TablePercent val={getPercentWin(row.against_win, row.against_games)} />),
  sortFn: (row) => (row.against_win / row.against_games),
}];

export const playerHeroesColumns = [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];
