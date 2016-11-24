import React from 'react';
import { isRadiant } from 'utility';
import strings from 'lang';
import Heading from 'components/Heading';
import { IconRadiant, IconDire } from 'components/Icons';
import Table from 'components/Table';
import PicksBans from './Overview/PicksBans';
import styles from './Match.css';

const filterMatchPlayers = (players, team = '') => players.filter(player => (
  (team === 'radiant' && isRadiant(player.player_slot)) || (team === 'dire' && !isRadiant(player.player_slot)) || team === ''),
).sort((a, b) => a.player_slot - b.player_slot);

export default ({
  match,
  columns,
  heading = '',
}) => (
  <div>
    <Heading
      title={match.radiant_team ? match.radiant_team.name : `${strings.general_radiant} ${heading}`}
      icon={<IconRadiant className={styles.iconRadiant} />}
    />
    <Table data={filterMatchPlayers(match.players, 'radiant')} columns={columns} />
    <PicksBans data={match.picks_bans && match.picks_bans.filter(pb => pb.team === 0)} matchId={match.match_id} />
    <Heading
      title={match.dire_team ? match.dire_team.name : `${strings.general_dire} ${heading}`}
      icon={<IconDire className={styles.iconDire} />}
    />
    <Table data={filterMatchPlayers(match.players, 'dire')} columns={columns} />
    <PicksBans data={match.picks_bans && match.picks_bans.filter(pb => pb.team === 1)} matchId={match.match_id} />
  </div>
);
