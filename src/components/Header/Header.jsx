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
  const isTablet = width <= 820;
  const isMobile = width <= 425;
  const isTiny = width <= 320;
  const toolbarPad = (isMobile && '8px') || (isTablet && '18px') || '22px';
  const logoSize = (isTiny && '14px') || (isMobile && '16px');

  const LogoGroup = () => (
    <ToolbarGroup className={styles.verticalAlign}>
      {isTablet && <BurgerMenu links={navbarPages} top={<AccountWidget />} />}
      <AppLogo style={{ marginRight: 18 }} size={logoSize} />
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
    <ToolbarGroup style={{ marginLeft: 20 }} className={styles.verticalAlign}>
      <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
      <SearchForm location={location} />
    </ToolbarGroup>
  );

  const AccountGroup = () => (
    <ToolbarGroup className={styles.verticalAlign} style={{ marginLeft: 'auto' }}>
      <AccountWidget />
    </ToolbarGroup>
  );

  return (
    <div>
      <Toolbar style={{ padding: toolbarPad }} className={styles.header}>
        <LogoGroup />
        {!isTablet && (<LinkGroup />)}
        <SearchGroup />
        {!isTablet && (<AccountGroup />)}
      </Toolbar>
    </div>
  );
};

const mapDispatchToProps = () => ({});
const mapStateToProps = state => ({
  width: state.browser.width,
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
