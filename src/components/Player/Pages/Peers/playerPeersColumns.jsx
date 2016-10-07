import React from 'react';
import { getPercentWin } from 'utility';
import { TablePercent, TablePlayer } from 'components/Visualizations';
import strings from 'lang';

export default [{
  displayName: strings.th_avatar,
  field: 'last_played',
  displayFn: row => <TablePlayer row={row} />,
  sortFn: true,
}, {
  displayName: strings.th_with_games,
  tooltip: strings.played_with,
  field: 'with_games',
  sortFn: true,
}, {
  displayName: strings.th_with_win,
  tooltip: strings.win_pct_with,
  field: 'with_win',
  displayFn: row => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: row => row.with_win / row.with_games,
}, {
  displayName: strings.th_against_games,
  tooltip: strings.played_against,
  field: 'against_games',
  sortFn: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.win_pct_against,
  field: 'against_win',
  displayFn: row => <TablePercent val={getPercentWin(row.against_win, row.against_games)} />,
  sortFn: row => row.against_win / row.against_games,
}];
