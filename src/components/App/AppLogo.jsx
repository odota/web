import React from 'react';
import { Link } from 'react-router';
import strings from 'lang';
import styles from './App.css';

export default () => (
  <Link to="/" className={styles.AppLogo}>
    <big>
      {`<${strings.app_name}/>`}
    </big>
  </Link>
);
