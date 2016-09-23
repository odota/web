import React from 'react';
import IconButton from 'material-ui/IconButton';
import styles from './Footer.css';
import { IconSteam } from '../Icons';

export default () => (
  <div>
    <div className={styles.links}>
      <a href="//blog.opendota.com/2014/08/01/faq/" target="_blank" rel="noopener noreferrer">About</a>
      <a href="//blog.opendota.com/2014/08/01/faq/#what-is-your-privacy-policy" target="_blank" rel="noopener noreferrer">Privacy & Terms</a>
      <a href="//docs.opendota.com" target="_blank" rel="noopener noreferrer">API docs</a>
    </div>
    <div>
      <small>
        Dota 2 API powered by
        <IconButton
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
          tooltipPosition="top-center"
          tooltip="Steam"
          href="//steampowered.com"
        >
          <IconSteam style={{ width: 14, height: 14 }} />
        </IconButton>
        Cheese icon by <a href="//www.flaticon.com/authors/belc" target="_blank" rel="noopener noreferrer">Belc </a>
        on <a href="//www.flaticon.com" target="_blank" rel="noopener noreferrer">Flaticon</a>
      </small>
    </div>
  </div>
);
