import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import styles from './ProgressBar.css';

export default({ percent, height }) => (
  <div>
    <div className={styles.label} style={{ bottom: -height, marginTop: -height }}>
      {(percent * 100).toFixed(2)}%
    </div>
    <LinearProgress style={{ height }} mode="determinate" value={percent * 100} color="#FFD700" />
  </div>
);
