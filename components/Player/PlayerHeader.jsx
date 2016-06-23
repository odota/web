import React from 'react';
import PlayerName from './PlayerName';
import PlayerMMR from './PlayerMMR';
import PlayerRecord from './PlayerRecord';
import styles from './PlayerHeader.css';
import TabBar from '../TabBar';
import constants from '../../constants';

const getPlayerPages = (playerId) => Object.keys(constants.player_pages).map(
  (key) => {
    if (constants.player_pages[key].name.toLowerCase() === 'overview') {
      return { route: `/players/${playerId}/overview`, label: constants.player_pages[key].name };
    }
    return { route: `/players/${playerId}/${key}`, label: constants.player_pages[key].name };
  }
);

export default ({ playerId }) => (
  <div>
    <div className={styles.container}>
      <PlayerName />
      <div className={styles.playerInfo}>
        <PlayerRecord />
        <PlayerMMR />
      </div>
    </div>
    <TabBar tabs={getPlayerPages(playerId)} />
  </div>
);
