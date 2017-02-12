import React from 'react';
import { isRadiant, getTeamName } from 'utility';
import Heading from 'components/Heading';
import { IconRadiant, IconDire } from 'components/Icons';
import Table from 'components/Table';
import PicksBans from './Overview/PicksBans'; // Displayed only on `Overview` page
import styles from './Match.css';

const filterMatchPlayers = (players, team = '') =>
  players.filter(player =>
    ((team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === ''),
  ).sort((a, b) => a.player_slot - b.player_slot);

export default ({
  players = [],
  columns,
  heading = '',
  picksBans = [],
  radiantTeam = {},
  direTeam = {},
  summable = false,
}) => (
  <div>
    <Heading
      title={`${getTeamName(radiantTeam, true)} - ${heading}`}
      icon={<IconRadiant className={styles.iconRadiant} />}
    />
    <Table data={filterMatchPlayers(players, 'radiant')} columns={columns} summable={summable} />
    {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 0)} /> /* team 0 - radiant */}
    <Heading
      title={`${getTeamName(direTeam, false)} - ${heading}`}
      icon={<IconDire className={styles.iconDire} />}
    />
    <Table data={filterMatchPlayers(players, 'dire')} columns={columns} summable={summable} />
    {picksBans && <PicksBans data={picksBans.filter(pb => pb.team === 1)} /> /* team 1 - dire */}
  </div>
);
