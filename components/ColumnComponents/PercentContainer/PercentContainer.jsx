import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
// import PiePercent from '../../PiePercent';
import styles from './PercentContainer.css';
import { getPercentWin } from '../../../utility';
// const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);


// the LinearProgress can be swapped for PiePercent if it turns out people prefer that
export default ({ wins, games }) => (
  <div className={styles.percentContainer}>
    <div className={styles.textContainer}>{getPercentWin(wins, games).toFixed(1)}</div>
    <LinearProgress
      style={{ height: 5 }}
      color={styles.lineColor}
      mode="determinate"
      value={getPercentWin(wins, games)}
      color={styles.progressColor}
    />
  </div>
);
