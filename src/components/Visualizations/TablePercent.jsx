import React from 'react';
import styles from './TablePercent.css';
import palette from '../palette.css';

export default ({ text, val }) => (
  <div style={{ position: 'relative' }}>
    <div>
      {text || val}
    </div>
    <div className={styles.TablePercent}>
      <div style={{ width: `${val}%`, backgroundColor: `${val >= 50 ? palette.green : palette.low}` }} />
      <div style={{ width: `${100 - val}%`, backgroundColor: palette.gray }} />
    </div>
  </div>
);
