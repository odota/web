import React from 'react';
import { PercentContainer } from '../../ColumnComponents';
import { Link } from 'react-router';
import { YaspBadge } from '../../Player';
import { transformations } from '../../../utility';

const getPlayerPicture = (row, col, field) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <img src={field} style={{ height: 30 }} role="presentation" />
      {row.last_login && row.last_login && <span style={{ marginLeft: 3 }}><YaspBadge /></span>}
    </div>
    {row.account_id ? <Link to={`/players/${row.account_id}/overview`}>{row.personaname}</Link> : 'Anonymous'}
  </div>
);

export default [{
  displayName: 'Player',
  field: 'avatar',
  width: 1.5,
  sortFn: (row) => (row.personaname.toLowerCase()),
  displayFn: getPlayerPicture,
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 1.5,
  sortFn: 'default',
  displayFn: transformations.last_played,
}, {
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: 'default',
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
  sortFn: 'default',
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: (row) => <PercentContainer wins={row.against_win} games={row.against_games} />,
  sortFn: (row) => (row.against_win / row.against_games),
}];
