import React from 'react';
import Logo from '../Logo';
import { NavDrawer } from '../NavBar';
import AccountWidget from '../AccountWidget';
import AppBar from 'material-ui/AppBar';
import styles from './Header.css';
import TabBar from '../TabBar';
import constants from '../../constants';

const getPlayerPages = (playerId) => Object.keys(constants.player_pages).map(
  (key) => {
    if (constants.player_pages[key].name.toLowerCase() === 'overview') {
      return { route: `/players/${playerId}/overview`, label: constants.player_pages[key].name };
    }
    return { route: `/players/${playerId}/${key}`, label: constants.player_pages[key].name };
  }
);

const getTabBar = (params, location) => {
  if (location.pathname.includes('/players')) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={getPlayerPages(params.account_id)} />
      </div>
    );
  } else if (location.pathname.includes('/matches')) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={getPlayerPages(params.account_id)} />
      </div>
    );
  }
  return <div className={styles.emptyTabBarContainer} />;
};

export default ({ openMenu, params, location }) => (
  <div>
    <AppBar
      className={styles.header}
      iconElementRight={(<AccountWidget />)}
      iconStyleRight={{ marginRight: 0 }}
      title={(<Logo />)}
      onLeftIconButtonTouchTap={() => openMenu()}
      zDepth={0}
    />
  {getTabBar(params, location)}
    <NavDrawer />
  </div>
);
