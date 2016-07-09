import React from 'react';
// import PiePercent from '../../PiePercent';
import styles from './PercentContainer.css';
import LinearProgress from 'material-ui/LinearProgress';

const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

export default ({ wins, games }) => (
  <div className={styles.percentContainer}>
    <div className={styles.textContainer}>{getPercentWin(wins, games).toFixed(1)}</div>
    <LinearProgress style={{ height: 5 }} color={styles.lineColor} mode="determinate" value={getPercentWin(wins, games)} />
  </div>
);
