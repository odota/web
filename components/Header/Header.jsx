import React from 'react';
import Logo from '../Logo';
import { NavDrawer } from '../NavBar';
import AccountWidget from '../AccountWidget';
import AppBar from 'material-ui/AppBar';
import styles from './Header.css';

export default ({ openMenu }) => (
  <div>
    <AppBar
      className={styles.header}
      iconElementRight={(<AccountWidget />)}
      iconStyleRight={{ marginRight: 0 }}
      title={(<Logo />)}
      onLeftIconButtonTouchTap={() => openMenu()}
    />
    <NavDrawer />
  </div>
);
