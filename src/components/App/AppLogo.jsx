import React from 'react';
import { Link } from 'react-router';
import strings from 'lang';
import styles from './App.css';

export default ({ size }) => (
  <Link to="/" className={styles.AppLogo}>
    <big style={{ fontSize: size }}>
      {`<${strings.app_name}/>`}
    </big>
  </Link>
);
