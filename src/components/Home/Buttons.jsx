import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import strings from 'lang';
import { IconSteam } from 'components/Icons';
import styles from './Home.css';

export default () => (
  <div className={styles.Buttons}>
    <div>
      <FlatButton
        label={
          <span className={styles.label}>
            <span>
              {strings.login}
            </span>
            <span>
              {strings.login_desc}
            </span>
          </span>
        }
        icon={<IconSteam />}
      />
    </div>
    <div>
      <FlatButton
        label={
          <span className={styles.label}>
            <span>
              {strings.parse}
            </span>
            <span>
              {strings.parse_desc}
            </span>
          </span>
        }
      />
    </div>
    <div>
      <FlatButton
        label={
          <span className={styles.label}>
            <span>
              {strings.video}
            </span>
            <span>
              {strings.video_desc}
            </span>
          </span>
        }
        labelPosition="before"
        icon={
          <img
            src="/assets/images/jist-white-logo.png"
            role="presentation"
            height={24}
          />
        }
      />
    </div>
  </div>
);
