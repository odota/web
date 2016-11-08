import React from 'react';
import strings from 'lang';
import { IconGithub, IconTwitter, IconDiscord } from '../Icons';
import styles from './Footer.css';

export default () => (
  <div className={styles.SocialLinks}>
    <a
      href="//github.com/odota"
      target="_blank"
      rel="noopener noreferrer"
      tooltip={strings.app_github}
    >
      <IconGithub />
    </a>
    <a
      href="//twitter.com/opendota"
      target="_blank"
      rel="noopener noreferrer"
      tooltip={strings.app_twitter}
    >
      <IconTwitter />
    </a>
    <a
      href="//discord.gg/0o5SQGbXuWCNDcaF"
      target="_blank"
      rel="noopener noreferrer"
      tooltip={strings.app_discord}
    >
      <IconDiscord />
    </a>
  </div>
);
