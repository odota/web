import React from 'react';
import PiePercent from '../../PiePercent';
import styles from './PercentContainer.css';

const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

export default ({ wins, games }) => (
  <div className={styles.percentContainer}>
    <span className={styles.textContainer}>{getPercentWin(wins, games).toFixed(1)}</span>
    <span>
      <PiePercent percent={getPercentWin(wins, games)} />
    </span>
  </div>
);
