import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
// import FlatButton from 'material-ui/FlatButton';
// import IconButton from 'material-ui/IconButton/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/MenuItem';
// import IconMenu from 'material-ui/IconMenu';
// import AppBar from 'material-ui/AppBar';
import strings from 'lang';
import AccountWidget from '../AccountWidget';
import styles from './Header.css';
import SearchForm from '../Search/SearchForm';
import AppLogo from '../App/AppLogo';
import BurgerMenu from '../BurgerMenu';

import { HEADER_MD_BREAK } from '../Player/Header/PlayerHeader';
import { HEADER_SM_BREAK } from '../Player/Header/PlayerHeader';

const navbarPages = [{
  name: strings.header_request,
  path: '/request',
}, {
  name: strings.header_distributions,
  path: '/distributions',
}, {
  name: strings.header_heroes,
  path: '/heroes',
}, {
  name: strings.header_ingame,
  sponsored: true,
  path: '/become-the-gamer',
}];

const Header = ({ location, width }) => {

  const TitleGroup = () => (
    <ToolbarGroup className={styles.verticalAlign}>
      <BurgerMenu className={styles.burger} links={navbarPages} top={<AccountWidget />} />
      <AppLogo className={styles.appLogo} />
    </ToolbarGroup>
  );

  const LinkGroup = () => (
    <ToolbarGroup className={styles.verticalAlign}>
      {navbarPages.map(page => (
        <div key={page.name} className={styles.tabContainer}>
          {page.external ?
            <a href={page.path} className={styles.tab}>{page.name}</a> :
              <Link to={page.path} className={styles.tab}>{page.name}</Link>}
        </div>
      ))}
    </ToolbarGroup>
  );

  const SearchGroup = () => (
    <ToolbarGroup className={styles.verticalAlign}>
      <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
      <SearchForm location={location} />
    </ToolbarGroup>
  );

  const AccountGroup = () => (
    <ToolbarGroup className={styles.verticalAlign} >
      <AccountWidget className={styles.headerAccount} />
    </ToolbarGroup>
  );

  return (
    <div>
      <Toolbar className={styles.header}>
        <TitleGroup />
        <LinkGroup className={styles.headerLink} />
        <SearchGroup className={styles.headerSearch} />
        <AccountGroup />
      </Toolbar>
    </div>
  );
};

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({ width: state.browser.width });
export default connect(mapStateToProps, mapDispatchToProps)(Header);
