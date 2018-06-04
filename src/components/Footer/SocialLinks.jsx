import React from 'react';
import { IconGithub, IconDiscord } from '../Icons';

export default ({ strings }) => {
  const links = [{
    tooltip: strings.app_github,
    path: '//github.com/odota',
    icon: <IconGithub />,
  }, {
    tooltip: strings.app_discord,
    path: '//discord.gg/opendota',
    icon: <IconDiscord />,
  }];

  return links.map(link => (
    <a
      key={link.path}
      target="_blank"
      rel="noopener noreferrer"
      data-hint-position="top"
      data-hint={link.tooltip}
      href={link.path}
    >
      {link.icon}
    </a>
  ));
};
