import React from 'react';
import IconButton from 'material-ui/IconButton';
import strings from 'lang';
import styles from './Footer.css';
import { IconSteam } from '../Icons';

export default () => (
  <div>
    <div className={styles.links}>
      <a href="//blog.opendota.com/2014/08/01/faq/" target="_blank" rel="noopener noreferrer">{strings.about}</a>
      <a href="//blog.opendota.com/2014/08/01/faq/#what-is-your-privacy-policy" target="_blank" rel="noopener noreferrer">
        {strings.app_privacy_terms}
      </a>
      <a href="//docs.opendota.com" target="_blank" rel="noopener noreferrer">{strings.app_api_docs}</a>
    </div>
    <small>
      {strings.app_powered_by}
      <IconButton
        target="_blank"
        rel="noopener noreferrer"
        className={styles.iconButton}
        href="//steampowered.com"
      >
        <IconSteam style={{ width: 14, height: 14 }} />
      </IconButton>
    </small>
  </div>
);
