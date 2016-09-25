import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AppLogo from '../App/AppLogo';
import Links from './Links';
import Cheese from './Cheese';
import SocialLinks from './SocialLinks';
import styles from './Footer.css';

// We can add third column if needed <Col xs />
const Footer = () => (
  <footer className={styles.footer}>
    <Row>
      <Col xs>
        <big>
          <AppLogo style={{ color: styles.textPrimary }} />
        </big>
        <SocialLinks />
        <p>
          <a href="//github.com/odota" target="_blank" rel="noopener noreferrer" className={styles.osLink}>
            Open source
          </a> Dota 2 data tools.
        </p>
        <hr />
        <Links />
      </Col>
      <Col xs>
        <Cheese />
      </Col>
    </Row>
  </footer>
);

export default Footer;
