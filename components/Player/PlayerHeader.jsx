import React from 'react';
import PlayerName from './PlayerName';
import PlayerMMR from './PlayerMMR';
import PlayerRecord from './PlayerRecord';
import styles from './PlayerHeader.css';

export default ({ playerId }) => (
  <div>
    <div className={styles.container}>
      <PlayerName playerId={playerId} />
      <div className={styles.playerInfo}>
        <PlayerRecord playerId={playerId} />
        <PlayerMMR playerId={playerId} />
      </div>
    </div>
  </div>
);
