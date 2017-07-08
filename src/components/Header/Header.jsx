/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
// import FlatButton from 'material-ui/FlatButton';
// import IconButton from 'material-ui/IconButton/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import MenuItem from 'material-ui/MenuItem';
// import IconMenu from 'material-ui/IconMenu';
// import AppBar from 'material-ui/AppBar';
import Bug from 'material-ui/svg-icons/action/bug-report';
import LogOutButton from 'material-ui/svg-icons/action/power-settings-new';
import strings from 'lang';
import { LocalizationMenu } from 'components/Localization';
import Dropdown from 'components/Header/Dropdown';
import Announce from 'components/Announce';
import AccountWidget from '../AccountWidget';
import styles from './Header.css';
import SearchForm from '../Search/SearchForm';
import AppLogo from '../App/AppLogo';
import BurgerMenu from '../BurgerMenu';

const REPORT_BUG_PATH = '//github.com/odota/ui/issues';

const navbarPages = [
  <Link key={strings.header_explorer} to="/explorer">{strings.header_explorer}</Link>,
  <Link key={strings.header_matches} to="/matches">{strings.header_matches}</Link>,
  <Link key={strings.header_teams} to="/teams">{strings.header_teams}</Link>,
  <Link key={strings.header_heroes} to="/heroes">{strings.header_heroes}</Link>,
  <Link key={strings.header_distributions} to="/distributions">{strings.header_distributions}</Link>,
  <Link key={strings.header_records} to="/records">{strings.header_records}</Link>,
  //<Link key="Assistant" to="/assistant">Assistant</Link>,
];

const burgerItems = () => [
  {
    component: <AccountWidget key={0} />,
    close: true,
  },
  ...navbarPages.map(item => ({
    component: item,
    close: true,
  })),
];

const buttonProps = {
  children: <ActionSettings />,
};

const LogoGroup = ({ small }) => (
  <ToolbarGroup className={styles.verticalAlign}>
    {!small && <BurgerMenu menuItems={burgerItems()} />}
    <AppLogo style={{ marginRight: 18 }} />
  </ToolbarGroup>
);

const LinkGroup = () => (
  <ToolbarGroup className={styles.verticalAlign}>
    {navbarPages.map(page => (
      <div key={page.name} className={styles.tabContainer}>
        {React.cloneElement(page, { className: styles.tab })}
      </div>
    ))}
  </ToolbarGroup>
);

const SearchGroup = () => (
  <ToolbarGroup style={{ marginLeft: 20 }} className={styles.verticalAlign}>
    <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
    <SearchForm />
  </ToolbarGroup>
);

const AccountGroup = () => (
  <ToolbarGroup className={styles.verticalAlign}>
    <AccountWidget />
  </ToolbarGroup>
);

const SettingsGroup = ({ user }) => (
  <Dropdown
    Button={IconButton}
    buttonProps={buttonProps}
    className={styles.verticalAlign}
  >
    <LocalizationMenu />
    <ReportBug />
    {user ? <LogOut /> : null}
  </Dropdown>
);

const ReportBug = () => (
  <a
    className={styles.bug}
    href={REPORT_BUG_PATH}
    target="_blank"
    rel="noopener noreferrer"
  >
    <Bug />
    <span>
      {strings.app_report_bug}
    </span>
  </a>
);

const LogOut = () => (
  <a
    className={styles.bug}
    href={`${API_HOST}/logout`}
    rel="noopener noreferrer"
  >
    <LogOutButton />
    <span>
      {strings.app_logout}
    </span>
  </a>
);

const Header = ({ location, small, user }) => (
  <div>
    <Toolbar style={{ padding: '8px' }} className={styles.header}>
      <div className={styles.verticalAlign}>
        <LogoGroup small={small} />
        {small && <LinkGroup />}
        <SearchGroup />
      </div>
      <div className={styles.accountGroup}>
        {small && <AccountGroup />}
        {<SettingsGroup user={user} />}
      </div>
    </Toolbar>
    <Announce location={location} />
    <div className={styles.adBanner}>
      { location.pathname !== '/' &&
        <a href="http://www.vpgame.com/?lang=en_us">
          <img src="/assets/images/vp-banner.jpg" role="presentation" />
        </a>
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  small: state.browser.greaterThan.small,
  user: state.app.metadata.data.user,
});
export default connect(mapStateToProps, null)(Header);
