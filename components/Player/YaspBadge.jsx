import React from 'react';
import { API_HOST } from '../../yasp.config';
import styles from './PlayerHeader.css';

export default () => (
  <div
    className={styles.yaspBadge}
    style={{ backgroundImage: `url(${API_HOST}/public/images/yasp-icon.svg)` }}
  />
);
