import React from 'react';
import { Link } from 'react-router';
import { transformations, getPercentWin } from 'utility';
import { TablePercent } from 'components/Visualizations';
import { AppBadge } from 'components/Player';
import strings from 'lang';

const getPlayerPicture = (row, col, field) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <img src={field} style={{ height: 30 }} role="presentation" />
      {row.last_login && row.last_login && <span style={{ marginLeft: 3 }}><AppBadge /></span>}
    </div>
    {row.account_id ? <Link to={`/players/${row.account_id}/overview`}>{row.personaname}</Link> : 'Anonymous'}
  </div>
);

export default [{
  displayName: strings.th_avatar,
  field: 'avatar',
  width: 1.5,
  sortFn: (row) => (row.personaname.toLowerCase()),
  displayFn: getPlayerPicture,
}, {
  displayName: strings.th_last_played,
  tooltip: strings.last_played,
  field: 'last_played',
  width: 1.5,
  sortFn: true,
  displayFn: transformations.last_played,
}, {
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
