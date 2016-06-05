import React from 'react';
import { HOST_URL } from '../../yasp.config';
import styles from './PlayerHeader.css';

export default () => (
  <div className={styles.yaspBadge} style={{ backgroundImage: `url(${HOST_URL}/public/images/yasp-icon.svg)` }} />
);
