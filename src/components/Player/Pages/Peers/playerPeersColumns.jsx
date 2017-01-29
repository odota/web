import React from 'react';
import { TableLink } from 'components/Table';
import { getPercentWin, transformations } from 'utility';
import { TablePercent } from 'components/Visualizations';
import strings from 'lang';

const avatarMatches = playerId => [{
  displayName: strings.th_avatar,
  field: 'last_played',
  displayFn: transformations.player,
  sortFn: true,
}, {
  displayName: strings.th_matches,
  tooltip: strings.tooltip_matches,
  field: 'matches',
  sortFn: row => row.with_games + row.against_games,
  displayFn: row => (
    <TableLink to={`/players/${playerId}/matches?included_account_id=${row.account_id}`}>{row.with_games + row.against_games}</TableLink>
  ),
}];

const matchesWith = [{
  displayName: strings.th_with_games,
  tooltip: strings.tooltip_played_with,
  field: 'with_games',
  sortFn: true,
}];

const winsWith = [{
  displayName: strings.th_with_win,
  tooltip: strings.tooltip_win_pct_with,
  field: 'with_win',
  displayFn: row => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: row => row.with_win / row.with_games,
}];

const restColumns = [{
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

export const playerPeersOverviewColumns = playerId => [
  ...avatarMatches(playerId),
  ...winsWith,
];

export const playerPeersColumns = playerId => [
  ...avatarMatches(playerId),
  ...matchesWith,
  ...winsWith,
  ...restColumns,
];
