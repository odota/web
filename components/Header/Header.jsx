import React from 'react';
import Logo from '../Logo';
// import { NavDrawer } from '../NavBar';
import AccountWidget from '../AccountWidget';
import FlatButton from 'material-ui/FlatButton';
// import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import styles from './Header.css';
import TabBar from '../TabBar';
import SearchForm from '../Search/SearchForm';
import ActionSearch from 'material-ui/svg-icons/action/search';
// import IconMenu from 'material-ui/IconMenu';
// import IconButton from 'material-ui/IconButton/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/MenuItem';
import { navbarPages, playerPages, matchPages } from './Pages';

const playerPagesMapped = (accountId) => playerPages.map((e) => Object.assign({}, e, {
  route: `/players/${accountId}/${e.name.toLowerCase()}`,
  label: e.name,
}));

const matchPagesMapped = (matchId) => matchPages.map((e) => Object.assign({}, e, {
  route: `/matches/${matchId}/${e.name.toLowerCase()}`,
  label: e.name,
}));

const getTabBar = (params, location) => {
  if (location.pathname.indexOf('/players') === 0) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={playerPagesMapped(params.account_id)} />
      </div>);
  } else if (location.pathname.indexOf('/matches') === 0) {
    return (
      <div className={styles.tabBarContainer}>
        <TabBar tabs={matchPagesMapped(params.match_id)} />
      </div>);
  }
  return '';
};

export default ({
  // openMenu,
  params,
  location,
}) => (
  <div className={styles.upperCase}>
    <Toolbar
      className={styles.header}
    >
      <ToolbarGroup>
        <Logo className={styles.verticalAlign} />
      </ToolbarGroup>
      <ToolbarGroup>
        {navbarPages.map((page) => (
          <FlatButton
            key={page.name}
            containerElement={<Link to={page.path} />}
            href={'#'}
            label={page.name}
          />
        ))}
      </ToolbarGroup>
      <ToolbarGroup className={styles.verticalAlign}>
        <ActionSearch />
        <SearchForm
          location={location}
        />
      </ToolbarGroup>
      <ToolbarGroup>
        <AccountWidget />
      </ToolbarGroup>
    </Toolbar>
    {getTabBar(params, location)}
  </div>);

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
