import React from 'react';
import strings from 'lang';
import AppLogo from '../App/AppLogo';
import PageLinks from './PageLinks';
import Cheese from './Cheese';
import SocialLinks from './SocialLinks';
import styles from './Footer.css';
import { IconSteam } from '../Icons';

export default () => (
  <footer className={styles.footer}>
    {
      /*
      location.pathname !== '/' &&
      <section className={styles.stanza}>
        <iframe
          style={{ border: 'none', margin: 0, width: '100%', height: 250 }}
          src="https://www.stanza.co/@dota2?embed=true&banner=true&site=opendota"
        />
      </section>
      */
    }
    <main>
      <div className={styles.links}>
        <div className={styles.logoNsocial}>
          <AppLogo />
          <SocialLinks />
        </div>
        <small className={styles.about}>
          {strings.app_description}
          {' - '}
          {strings.app_powered_by}
          <a href="http://steampowered.com" target="_blank" rel="noopener noreferrer">
            <IconSteam />
          </a>
        </small>
        <hr />
        <div className={styles.pages}>
          <PageLinks />
        </div>
      </div>
      <Cheese />
    </main>
  </footer>
);
