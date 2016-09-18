import React from 'react';
import { Link } from 'react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
// import FlatButton from 'material-ui/FlatButton';
// import IconButton from 'material-ui/IconButton/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/MenuItem';
// import IconMenu from 'material-ui/IconMenu';
// import AppBar from 'material-ui/AppBar';
// import { NavDrawer } from '../NavBar';
import AccountWidget from '../AccountWidget';
import styles from './Header.css';
import TabBar from '../TabBar';
import SearchForm from '../Search/SearchForm';
import { navbarPages, playerPages } from './Pages';
import { APP_NAME } from '../../config';

const playerPagesMapped = (accountId) => playerPages.map((e) => Object.assign({}, e, {
  route: `/players/${accountId}/${e.name.toLowerCase()}`,
  label: e.name,
}));

/*
const matchPagesMapped = (matchId) => matchPages.map((e) => Object.assign({}, e, {
  route: `/matches/${matchId}/${e.name.toLowerCase()}`,
  label: e.name,
}));
*/

const getTabBar = (params, location) => {
  if (location.pathname.indexOf('/players') === 0) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={playerPagesMapped(params.account_id)} />
      </div>);
  }
  /*
  else if (location.pathname.indexOf('/matches') === 0) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={matchPagesMapped(params.match_id)} />
      </div>);
  }
  */
  return '';
};

export default ({
  // openMenu,
  params,
  location,
}) => (
  <div>
    <Toolbar className={styles.header}>
      <ToolbarGroup className={styles.verticalAlign}>
        <Link to="/" style={{ textTransform: 'uppercase', marginRight: 10 }}>
          <strong>&#60;{APP_NAME}&#47;&#62;</strong>
        </Link>
      </ToolbarGroup>
      <ToolbarGroup>
        {navbarPages.map((page) => (
          <div key={page.name} className={styles.tabContainer}>
            {page.external ?
              <a href={page.path} className={styles.tab}>{page.name}</a> :
              <Link to={page.path} className={styles.tab}>{page.name}</Link>}
          </div>
        ))}
      </ToolbarGroup>
      <ToolbarGroup className={styles.verticalAlign} style={{ marginLeft: 20 }}>
        <ActionSearch style={{ marginRight: 8, opacity: '.6' }} />
        <SearchForm
          location={location}
        />
      </ToolbarGroup>
      <ToolbarGroup style={{ marginLeft: 'auto' }}>
        <AccountWidget />
      </ToolbarGroup>
    </Toolbar>
    {getTabBar(params, location)}
  </div>
);

/*
    <AppBar
      className={styles.header}
      iconElementRight={(<AccountWidget />)}
      iconStyleRight={{ marginRight: 0 }}
      title={(<Logo />)}
      onLeftIconButtonTouchTap={() => openMenu()}
      zDepth={0}
    />
*/
/*
<IconMenu
  iconButtonElement={
    <IconButton touch>
      <MoreVertIcon />
    </IconButton>
  }
>
*/
