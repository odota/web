import React from 'react';
import strings from 'lang';
import CheeseCircle from '../Cheese';
import styles from './Footer.css';

export default () => (
  <div className={styles.cheese}>
    <CheeseCircle />
    <section>
      <big>
        {strings.app_donation_goal}
      </big>
      <p style={{ marginTop: 5 }}>
        <a href="//carry.opendota.com">
          {strings.app_sponsorship}
        </a>
      </p>
    </section>
  </div>
);
