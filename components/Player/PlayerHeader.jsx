import React from 'react';
import PlayerName from './PlayerName';
import PlayerMMR from './PlayerMMR';
import PlayerRecord from './PlayerRecord';
import styles from './PlayerHeader.css';
import TabBar from '../TabBar';

// TODO - once I have internet, maybe we already have this info from constats
const getTabs = (playerId) => [{
  label: 'overview',
  route: `/players/${playerId}/overview`,
}, {
  label: 'matches',
  route: `/players/${playerId}/matches`,
}, {
  label: 'heroes',
  route: `/players/${playerId}/heroes`,
}];

export default ({ playerId }) => (
  <div>
    <div className={styles.container}>
      <PlayerName />
      <div className={styles.playerInfo}>
        <PlayerRecord />
        <PlayerMMR />
      </div>
    </div>
    <TabBar tabs={getTabs(playerId)} />
  </div>
);
