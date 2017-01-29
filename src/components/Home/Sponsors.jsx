import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import styles from './Home.css';

export default () => (
  <div className={styles.SponsorsContainer}>
    <div className={styles.headline}>
      {strings.home_sponsored_by}
    </div>
    <div className={styles.images}>
      <a href="//www.jist.tv" target="_blank" rel="noopener noreferrer">
        <img src="/assets/images/jist-white-logo.png" role="presentation" />
      </a>
      <a href="//dotacoach.org" target="_blank" rel="noopener noreferrer">
        <img src="/assets/images/dotacoach-logo.png" role="presentation" />
      </a>
      <a href="https://pvgna.com/?ref=yasp" target="_blank" rel="noopener noreferrer">
        <img src="/assets/images/pvgna-logo.png" role="presentation" />
      </a>
      <a
        href="//www.lootmarket.com/?partner=1101&utm_source=misc&utm_medium=misc&utm_campaign=opendota/"
        target="_blank" rel="noopener noreferrer"
      >
        <img src="/assets/images/loot.svg" role="presentation" />
      </a>
      <a href="http://www.vpgame.com/" target="_blank" rel="noopener noreferrer">
        <img src="/assets/images/vp-logo.png" role="presentation" />
      </a>
    </div>
    <div className={styles.Buttons}>
      <FlatButton
        label={
          <span style={{ fontWeight: 300 }}>
            {strings.home_become_sponsor}
          </span>
        }
        href="//carry.opendota.com"
      />
    </div>
  </div>
);
