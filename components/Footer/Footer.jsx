import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AppLogo from '../App/AppLogo';
import FooterLinks from './FooterLinks';
import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.footer}>
    <Row>
      <Col xs>
        <big>
          <AppLogo style={{ color: styles.textPrimary }} />
        </big>
        <p>
          <a href="//github.com/odota" target="_blank" rel="noopener noreferrer" className={styles.osLink}>
            Open source
          </a> Dota 2 data tools.
        </p>
        <hr />
        <FooterLinks />
      </Col>
      <Col xs>
        Cheese
      </Col>
      <Col xs />
    </Row>
  </footer>
);

export default Footer;
