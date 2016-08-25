import React from 'react';
import { API_HOST } from '../../config';
import styles from './PlayerHeader.css';

export default () => (
  <div
    className={styles.appBadge}
    style={{ backgroundImage: `url(/assets/logo.svg)` }}
  />
);
