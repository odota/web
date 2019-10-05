/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { O } from 'ts-toolbelt';
import { IconGithub, IconDiscord } from '../Icons';
import { GITHUB_REPO, DISCORD_LINK } from '../../config';
import { AppState } from '../../store/types';

interface SocialLinksProps {
  strings: O.Path<AppState, ['app', 'strings']>;
}

const SocialLinks: React.SFC<SocialLinksProps> = ({ strings }) => {
  const links = [{
    tooltip: strings.app_github,
    path: `//github.com/${GITHUB_REPO}`,
    icon: <IconGithub />,
  }];

  if (DISCORD_LINK) {
    links.push({
      tooltip: strings.app_discord,
      path: `//discord.gg/${DISCORD_LINK}`,
      icon: <IconDiscord />,
    });
  }

  return (
    <Fragment>
      {links.map(link => (
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
      ))}
    </Fragment>
  );
};

export default SocialLinks;
