import React from 'react';
import { Link } from 'react-router';
import { APP_NAME } from 'config';
import styles from './App.css';

export default ({ size }) => (
  <Link to="/" className={styles.AppLogo}>
    <big style={{ fontSize: size }}>
      {`<${APP_NAME}/>`}
    </big>
  </Link>
);
