import React from 'react';
import IconButton from 'material-ui/IconButton';
import { IconGithub, IconTwitter, IconDiscord } from '../Icons';
import styles from './Footer.css';

export default () => (
  <div className={styles.SocialLinks}>
    <IconButton
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      tooltipPosition="top-center"
      tooltip="View on GitHub"
      href="//github.com/odota"
    >
      <IconGithub />
    </IconButton>
    <IconButton
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      tooltipPosition="top-center"
      tooltip="Follow on Twitter"
      href="//twitter.com/opendota"
    >
      <IconTwitter />
    </IconButton>
    <IconButton
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      tooltipPosition="top-center"
      href="//discord.gg/0o5SQGbXuWCNDcaF"
      tooltip="Join on Discord"
    >
      <IconDiscord />
    </IconButton>
  </div>
);
