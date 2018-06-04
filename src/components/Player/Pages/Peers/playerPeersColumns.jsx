import React from 'react';
import { transformations } from '../../../../utility';
import { TableLink } from '../../../Table';

const avatarMatches = (playerId, strings) => [{
  displayName: strings.th_avatar,
  field: 'last_played',
  displayFn: transformations.player,
  sortFn: true,
}, {
  displayName: strings.th_games,
  tooltip: strings.tooltip_matches,
  field: 'matches',
  sortFn: row => row.with_games + row.against_games,
  relativeBars: true,
  displayFn: row => (
    <TableLink to={`/players/${playerId}/matches?included_account_id=${row.account_id}`}>{row.with_games + row.against_games}</TableLink>
  ),
}];

const matchesWith = strings => [{
  displayName: strings.th_with_games,
  tooltip: strings.tooltip_played_with,
  field: 'with_games',
  sortFn: true,
  relativeBars: true,
}];

const winsWith = strings => [{
  displayName: strings.th_with_win,
  tooltip: strings.tooltip_win_pct_with,
  field: 'with_win',
  sortFn: row => row.with_win / row.with_games,
  percentBars: true,
}];

const restColumns = strings => [{
  displayName: strings.th_against_games,
  tooltip: strings.tooltip_played_against,
  field: 'against_games',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_against_win,
  tooltip: strings.tooltip_win_pct_against,
  field: 'against_win',
  sortFn: row => row.against_win / row.against_games,
  percentBars: true,
}, {
  displayName: strings.th_gpm_with,
  field: 'with_gpm_sum',
  displayFn: row => (row.with_gpm_sum / row.with_games).toFixed(0),
  sortFn: row => row.with_gpm_sum / row.with_games,
  relativeBars: true,
}, {
  displayName: strings.th_xpm_with,
  field: 'with_xpm_sum',
  displayFn: row => (row.with_xpm_sum / row.with_games).toFixed(0),
  sortFn: row => row.with_xpm_sum / row.with_games,
  relativeBars: true,
}];

export const playerPeersOverviewColumns = (playerId, strings) => [
  ...avatarMatches(playerId, strings),
  ...winsWith(strings),
];

export const playerPeersColumns = (playerId, strings) => [
  ...avatarMatches(playerId, strings),
  ...matchesWith(strings),
  ...winsWith(strings),
  ...restColumns(strings),
];
