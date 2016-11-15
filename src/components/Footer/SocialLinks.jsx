import React from 'react';
import strings from 'lang';
import { IconGithub, IconTwitter, IconDiscord } from '../Icons';
import styles from './Footer.css';

const links = [{
  tooltip: strings.app_github,
  path: '//github.com/odota',
  icon: <IconGithub />,
}, {
  tooltip: strings.app_twitter,
  path: '//twitter.com/opendota',
  icon: <IconTwitter />,
}, {
  tooltip: strings.app_discord,
  path: '//discord.gg/0o5SQGbXuWCNDcaF',
  icon: <IconDiscord />,
}];

export default () => (
  <div className={styles.SocialLinks}>
    {links.map(link => (
      <a
        target="_blank"
        rel="noopener noreferrer"
        data-hint-position="top"
        data-hint={link.tooltip}
        href={link.path}
      >
        {link.icon}
      </a>
    ))}
  </div>
);
