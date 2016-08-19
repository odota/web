import React from 'react';
import { API_HOST } from '../../config';
import styles from './PlayerHeader.css';

export default () => (
  <div
    className={styles.Badge}
    style={{ backgroundImage: `url(${API_HOST}/public/images/yasp-icon.svg)` }}
  />
);
