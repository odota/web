import React from 'react';
import { IconGithub, IconDiscord } from '../Icons';
import config from '../../config';

export default ({ strings }) => {
  const links = [
    {
      tooltip: strings.app_github,
      path: `//github.com/${config.GITHUB_REPO}`,
      icon: <IconGithub aria-hidden />,
    },
  ];

  if (config.DISCORD_LINK) {
    links.push({
      tooltip: strings.app_discord,
      path: `//discord.gg/${config.DISCORD_LINK}`,
      icon: <IconDiscord aria-hidden />,
    });
  }

  return links.map((link) => (
    <a
      key={link.path}
      target="_blank"
      rel="noopener noreferrer"
      data-hint-position="top"
      data-hint={link.tooltip}
      href={link.path}
      aria-label={link.tooltip}
    >
      {link.icon}
    </a>
  ));
};
