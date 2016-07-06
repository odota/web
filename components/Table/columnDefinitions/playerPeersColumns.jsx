import React from 'react';
import {
  defaultSort,
  transformedSort,
  winPercentTransform,
} from './utility';
import { PercentContainer } from '../../ColumnComponents';
import { Link } from 'react-router';
import { YaspBadge } from '../../Player';

const getPlayerPicture = ({ field, row }) => (
  <div style={{ marginTop: 5 }}>
    <div>
      <img src={field.display} style={{ height: 30 }} role="presentation" />
      {row.last_login && row.last_login.value && <span style={{ marginLeft: 3 }}><YaspBadge /></span>}
    </div>
    {row.account_id.value ? <Link to={`/players/${row.account_id.value}`}>{row.personaname.value}</Link> : 'Anonymous'}
  </div>
);

export default [{
  displayName: 'Player',
  field: 'avatar',
  width: 1.5,
  sortFn: defaultSort,
  displayFn: getPlayerPicture,
}, {
  displayName: 'Last',
  field: 'last_played',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'With',
  field: 'with_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'with_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field.display} games={row.with_games.display} />,
  sortFn: transformedSort.bind(null, winPercentTransform('with_games')),
}, {
  displayName: 'Against',
  field: 'against_games',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Win %',
  field: 'against_win',
  width: 2,
  displayFn: ({ field, row }) => <PercentContainer wins={field.display} games={row.against_games.display} />,
  sortFn: transformedSort.bind(null, winPercentTransform('against_games')),
}];
