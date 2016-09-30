import React from 'react';
import { transformations, getPercentWin } from 'utility';
import { TableLink } from 'components/Table';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang/en';

export default [{
  displayName: strings.th_avatar,
  field: 'account_id',
  width: 2,
  displayFn: row => <TableLink to={`/players/${row.account_id}`}>{row.name}</TableLink>,
  sortFn: true,
}, {
  displayName: strings.th_last_played,
  tooltip: strings.last_played,
  field: 'last_played',
  width: 2,
  displayFn: transformations.last_played,
  sortFn: true,
}, {
  displayName: strings.th_with_games,
  tooltip: strings.played_with,
  field: 'with_games',
  width: 2,
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
  width: 2,
  sortFn: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.win_pct_against,
  field: 'against_win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.against_win, row.against_games)} />,
  sortFn: (row) => (row.against_win / row.against_games),
}];
