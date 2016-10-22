import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Row, Col } from 'react-flexbox-grid';
import strings from 'lang';
import AppLogo from '../App/AppLogo';
import Links from './Links';
import Cheese from './Cheese';
import SocialLinks from './SocialLinks';
import styles from './Footer.css';
import { IconSteam } from '../Icons';

export default () => (
  <footer className={styles.footer}>
    <Row>
      <Col xs>
        <AppLogo />
        <SocialLinks />
        <div>
          <small>
            {strings.app_description}
            {' - '}
            {strings.app_powered_by}
            <IconButton
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconButton}
              href="//steampowered.com"
              style={{ padding: '0px' }}
            >
              <IconSteam style={{ width: 14, height: 14 }} />
            </IconButton>
          </small>
        </div>
        <hr />
        <Links />
      </Col>
      <Col xs>
        <Cheese />
      </Col>
    </Row>
  </footer>
);
