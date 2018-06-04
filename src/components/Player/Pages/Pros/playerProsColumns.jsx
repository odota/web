import React from 'react';
import { transformations } from '../../../../utility';
import { TableLink } from '../../../Table';

export default (playerId, strings) => [{
  displayName: strings.th_avatar,
  field: 'last_played',
  displayFn: transformations.player,
  sortFn: true,
}, {
  displayName: strings.th_matches,
  tooltip: strings.tooltip_matches,
  field: 'with_games',
  sortFn: row => row.with_games + row.against_games,
  relativeBars: true,
  displayFn: row => (
    <TableLink to={`/players/${playerId}/matches?included_account_id=${row.account_id}`}>{row.with_games + row.against_games}</TableLink>
  ),
}, {
  displayName: strings.th_with_games,
  tooltip: strings.tooltip_played_with,
  field: 'with_games',
  sortFn: true,
  relativeBars: true,
}, {
  displayName: strings.th_with_win,
  tooltip: strings.tooltip_win_pct_with,
  field: 'with_win',
  sortFn: row => row.with_win / row.with_games,
  percentBars: true,
}, {
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
}];
