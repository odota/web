import React from 'react';
import IconButton from 'material-ui/IconButton';
import { IconGithub, IconTwitter, IconDiscord } from '../Icons';
import styles from './Footer.css';

export default () => (
  <div className={styles.SocialLinks}>
    <IconButton href="//github.com/odota" className={`${styles.button} ${styles.icon}`}>
      <IconGithub />
    </IconButton>
    <IconButton href="//twitter.com/opendota" className={`${styles.button} ${styles.icon}`}>
      <IconTwitter />
    </IconButton>
    <IconButton href="//discord.gg/0o5SQGbXuWCNDcaF" className={`${styles.button} ${styles.icon}`}>
      <IconDiscord />
    </IconButton>
  </div>
);
