import React from 'react';
import palette from 'components/palette.css';
import styles from './Percent.css';

export default ({ text, val }) => (
  <div style={{ position: 'relative' }}>
    <div>
      {text || val}
    </div>
    <div className={styles.TablePercent}>
      <div style={{ width: `${val}%`, backgroundColor: `${val >= 50 ? palette.green : palette.yelor}` }} />
      <div style={{ width: `${100 - val}%`, backgroundColor: palette.gray }} />
    </div>
  </div>
);
