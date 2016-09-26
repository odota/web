import React from 'react';
import styles from './FourOhFour.css';

export default () => (
  <div className={styles.container}>
    <img src="/assets/images/sad.gif" role="presentation" />
    <div className={styles.message}>
      The page you’re looking for can’t be found.
    </div>
    <div className={styles.FourOhFour}>
      error 404
    </div>
  </div>
);
