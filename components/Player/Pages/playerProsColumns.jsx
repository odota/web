import React from 'react';
import { TableLink, TablePercent } from '../../Table';
import { transformations, getPercentWin } from '../../../utility';

export default [{
  displayName: 'Player',
  field: 'account_id',
  width: 2,
  displayFn: row => <TableLink to={`/players/${row.account_id}`}>{row.name}</TableLink>,
  sortFn: true,
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 2,
  displayFn: transformations.last_played,
  sortFn: true,
}, {
  displayName: 'With',
  field: 'with_games',
  width: 2,
  sortFn: true,
}, {
  displayName: 'Win%',
  field: 'with_win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.win, row.games)} />,
  sortFn: (row) => (row.win / row.games),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 2,
  sortFn: true,
}, {
  displayName: 'Win%',
  field: 'against_win',
  width: 2,
  displayFn: (row) => <TablePercent val={getPercentWin(row.with_win, row.with_games)} />,
  sortFn: (row) => (row.with_win / row.with_games),
}];
