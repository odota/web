import React from 'react';
import { transformations, getPercentWin } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

export const playerHeroesOverviewColumns = [{
  displayName: strings.th_hero_id,
  tooltip: strings.tooltip_hero_id,
  field: 'hero_id',
  displayFn: transformations.hero_id,
  sortFn: row => row.last_played,
}, {
  displayName: strings.th_games,
  tooltip: strings.tooltip_played_as,
  field: 'games',
  sortFn: true,
}, {
  displayName: strings.th_win,
  tooltip: strings.tooltip_win_pct_as,
  field: 'win',
  displayFn: row => <TablePercent val={getPercentWin(row.win, row.games)} />,
  sortFn: row => row.win / row.games,
}];

const restColumns = [{
  displayName: strings.th_with_games,
  tooltip: strings.tooltip_played_with,
  field: 'with_games',
  sortFn: true,
}, {
  displayName: strings.th_with_win,
  tooltip: strings.tooltip_win_pct_with,
  field: 'with_win',
  displayFn: row => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: row => row.with_win / row.with_games,
}, {
  displayName: strings.th_against_games,
  tooltip: strings.tooltip_played_against,
  field: 'against_games',
  sortFn: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.tooltip_win_pct_against,
  field: 'against_win',
  displayFn: row => <TablePercent val={getPercentWin(row.against_win, row.against_games)} />,
  sortFn: row => row.against_win / row.against_games,
}];

export const playerHeroesColumns = [
  ...playerHeroesOverviewColumns,
  ...restColumns,
];
