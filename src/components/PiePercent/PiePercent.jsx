import React from 'react';
import styles from './PiePercent.css';

export default ({ percent, color, negativeColor }) => (
  <svg viewBox="0 0 32 32" className={styles.pieChart} styles={{ color: negativeColor }}>
    <circle
      r="16" cx="16" cy="16"
      className={styles.pieInner}
      shapeRendering="crispEdges"
      style={{ strokeDasharray: `${percent} 100`, color }}
    />
  </svg>
);
