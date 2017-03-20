import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
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
import strings from 'lang';
import { LocalizationMenu } from 'components/Localization';
import Dropdown from 'components/Header/Dropdown';
import Announce from 'components/Announce';
import AccountWidget from '../AccountWidget';
import styles from './Header.css';
import SearchForm from '../Search/SearchForm';
import AppLogo from '../App/AppLogo';
import BurgerMenu from '../BurgerMenu';

const tablet = 864;
const mobile = 425;

const REPORT_BUG_PATH = '//github.com/odota/ui/issues';

const navbarPages = [
  <Link key={strings.header_matches} to="/matches">{strings.header_matches}</Link>,
  <Link key={strings.header_heroes} to="/heroes">{strings.header_heroes}</Link>,
  <Link key={strings.header_distributions} to="/distributions">{strings.header_distributions}</Link>,
  <Link key={strings.header_explorer} to="/explorer">{strings.header_explorer}</Link>,
];

const burgerItems = width => [
  {
    component: <AccountWidget key={0} />,
    close: true,
  },
  {
    component: width <= mobile ? <LocalizationMenu /> : null,
  },
  ...navbarPages.map(item => ({
    component: item,
    close: true,
  })),
  {
    component: <a key={strings.app_report_bug} href={REPORT_BUG_PATH}>{strings.app_report_bug}</a>,
    close: true,
  },
];

const buttonProps = {
  children: <ActionSettings />,
};

const LogoGroup = ({ width }) => (
  <ToolbarGroup className={styles.verticalAlign}>
    {width < tablet && <BurgerMenu menuItems={burgerItems(width)} />}
    <AppLogo style={{ marginRight: 18 }} size={width < mobile && '14px'} />
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

const SearchGroup = ({ location }) => (
  <ToolbarGroup style={{ marginLeft: 20 }} className={styles.verticalAlign}>
    <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
    <SearchForm location={location} />
  </ToolbarGroup>
);

const AccountGroup = () => (
  <ToolbarGroup className={styles.verticalAlign}>
    <AccountWidget />
  </ToolbarGroup>
);

const SettingsGroup = ({ width }) => width > mobile && (
  <Dropdown
    Button={IconButton}
    buttonProps={buttonProps}
    className={styles.verticalAlign}
  >
    <LocalizationMenu />
    <ReportBug />
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

const Header = ({ location, width }) => (
  <div>
    <Toolbar style={{ padding: width < mobile ? '8px' : '20px' }} className={styles.header}>
      <div className={styles.verticalAlign}>
        <LogoGroup width={width} />
        {width > tablet && <LinkGroup />}
        <SearchGroup location={location} />
      </div>
      <div className={styles.accountGroup}>
        {width > tablet && <AccountGroup />}
        {<SettingsGroup width={width} />}
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
  width: state.browser.width,
});
export default connect(mapStateToProps, null)(Header);
