import React from 'react';
import styles from './TablePercent.css';

export default ({ text, val }) => (
  <div style={{ position: 'relative' }}>
    <div>
      {text || val}
    </div>
    <div className={styles.TablePercent}>
      <div style={{ width: `${val}%`, backgroundColor: `${val >= 50 ? styles.green : styles.low}` }} />
      <div style={{ width: `${100 - val}%`, backgroundColor: styles.neutral }} />
    </div>
  </div>
);
