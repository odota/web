import React from 'react';
import Helmet from 'react-helmet';
import strings from 'lang';
import styles from './FourOhFour.css';

export default () => (
  <div className={styles.container}>
    <Helmet title={`${strings.error} 404`} />
    <img src="/assets/images/sad.gif" role="presentation" />
    <div className={styles.message}>
      {strings.error_four_oh_four_message}
    </div>
    <div className={styles.FourOhFour}>
      {strings.error} 404
    </div>
  </div>
);
