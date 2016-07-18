import React from 'react';
import Cheese from '../Cheese';
import styles from './Footer.css';
import FooterLinks from './FooterLinks';

const Footer = () => (
  <footer className={styles.footer}>
    <Cheese />
    <FooterLinks />
  </footer>
);

export default Footer;
