import React from 'react';
import { transformations, getPercentWin } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

export const playerHeroesOverviewColumns = [{
  displayName: strings.th_hero,
  tooltip: strings.hero_id,
  field: 'hero_id',
  width: 3.1,
  displayFn: transformations.hero_id,
  sortFn: (row) => (row.last_played),
}, {
  displayName: strings.th_games,
  tooltip: strings.played_as,
  field: 'games',
  width: 1,
  sortFn: true,
}, {
  displayName: strings.th_win,
  tooltip: strings.win_pct_as,
  field: 'win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.win, row.games)} />,
  sortFn: (row) => (row.win / row.games),
}];

const restColumns = [{
  displayName: strings.th_with_games,
  tooltip: strings.played_with,
  field: 'with_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: strings.th_with_win,
  tooltip: strings.win_pct_with,
  field: 'with_win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: (row) => (row.with_win / row.with_games),
}, {
  displayName: strings.th_against_games,
  tooltip: strings.played_against,
  field: 'against_games',
  width: 1.5,
  sortFn: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.win_pct_against,
  field: 'against_win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.against_win, row.against_games)} />,
  sortFn: (row) => (row.against_win / row.against_games),
}];

export const playerHeroesColumns = [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];
