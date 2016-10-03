import React from 'react';
import { Link } from 'react-router';
import { APP_NAME } from 'config';
import styles from './App.css';

export default () => (
  <Link to="/" className={styles.AppLogo}>
    <big>
      {`<${APP_NAME}/>`}
    </big>
  </Link>
);
