import React from 'react';
import PlayerName from './PlayerName';
import PlayerMMR from './PlayerMMR';
import PlayerRecord from './PlayerRecord';
import styles from './PlayerHeader.css';

export default () => (
  <div className={styles.container}>
    <PlayerName />
    <div>
      <PlayerRecord />
      <PlayerMMR />
    </div>
  </div>
);
