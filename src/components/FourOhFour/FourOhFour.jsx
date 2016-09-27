import React from 'react';
import styles from './FourOhFour.css';
import strings from 'lang/en.json';

export default () => (
  <div className={styles.container}>
    <img src="/assets/images/sad.gif" role="presentation" />
    <div className={styles.message}>
      {strings.four_oh_four_message}
    </div>
    <div className={styles.FourOhFour}>
      {strings.error} 404
    </div>
  </div>
);
