import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useReactRouter from 'use-react-router';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import Bug from 'material-ui/svg-icons/action/bug-report';
import LogOutButton from 'material-ui/svg-icons/action/power-settings-new';
import { Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import LocalizationMenu from '../Localization';
import Dropdown from '../Header/Dropdown';
import constants from '../constants';
import AccountWidget from '../AccountWidget';
import SearchForm from '../Search/SearchForm';
import AppLogo from '../App/AppLogo';
import BurgerMenu from './BurgerMenu';
import { GITHUB_REPO } from '../../config';

const REPORT_BUG_PATH = `//github.com/${GITHUB_REPO}/issues`;

const VerticalAlignToolbar = styled(ToolbarGroup)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VerticalAlignDropdown = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VerticalAlignDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${constants.fontWeightNormal};
  height: 100%;
  justify-content: center;
  margin: 0 10px;
  text-align: center;
`;

const BugLink = styled.a`
  font-size: ${constants.fontSizeMedium};
  font-weight: ${constants.fontWeightLight};
  color: ${constants.colorMutedLight} !important;
  display: flex;
  align-items: center;
  margin-top: 2px;
  margin-right: 15px;
  & svg {
    margin-right: 5px;
    /* Override material-ui */
    color: currentColor !important;
    width: 18px !important;
    height: 18px !important;
  }
`;

const DropdownMenu = styled(Menu)`
  & .MuiMenu-paper {
    background: ${constants.primarySurfaceColor};
  }
`;

const DropdownMenuItem = styled(MenuItem)`
  color: ${constants.primaryTextColor} !important;
`;

const ToolbarHeader = styled(Toolbar)`
  background-color: ${constants.defaultPrimaryColor} !important;
  padding: 8px !important;
  & a {
    color: ${constants.primaryTextColor};
    &:hover {
      color: ${constants.primaryTextColor};
      opacity: 0.6;
    }
  }
`;

const LinkGroup = ({ navbarPages }) => {
  const router = useReactRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, [anchorEl]);

  return (
    <VerticalAlignToolbar>
      {navbarPages.slice(0, 6).map(page => (
        <TabContainer key={page.key}>
          <Link to={page.to}>{page.label}</Link>
        </TabContainer>
      ))}
      <TabContainer>
        <IconButton size="small" color="inherit" onClick={e => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
        <DropdownMenu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
          {navbarPages.slice(6, navbarPages.length).map(page => (
            <DropdownMenuItem
              onClick={() => {
                router.history.push(page.to);
                handleClose();
              }}
              key={page.key}
            >
              {page.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </TabContainer>
    </VerticalAlignToolbar>
  );
};

LinkGroup.propTypes = {
  navbarPages: PropTypes.arrayOf(PropTypes.shape({})),
};

class Header extends React.Component {
  static propTypes = {
    location: PropTypes.shape({}),
    small: PropTypes.bool,
    user: PropTypes.shape({}),
    strings: PropTypes.shape({}),
    navbarPages: PropTypes.arrayOf(PropTypes.shape({})),
    disableSearch: PropTypes.bool,
  };

  constructor() {
    super();
    this.state = {};
    import('../Announce').then(ann => this.setState({ Announce: ann.default }));
  }

  render() {
    const {
      location, small, user, strings, navbarPages, disableSearch,
    } = this.props;

    const burgerItems = [
      <AccountWidget key={0} />,
    ];

    navbarPages.forEach(page => burgerItems.push(<Link key={page.key} to={page.to}>{page.label}</Link>));

    const buttonProps = {
      children: <ActionSettings />,
    };

    const LogoGroup = ({ small }) => (
      <VerticalAlignToolbar>
        {!small && <BurgerMenu menuItems={burgerItems} />}
        <AppLogo style={{ marginRight: 18 }} />
      </VerticalAlignToolbar>
    );

    LogoGroup.propTypes = {
      small: PropTypes.bool,
    };

    const SearchGroup = () => (
      <VerticalAlignToolbar style={{ marginLeft: 'auto' }}>
        <ActionSearch style={{ marginRight: 6, opacity: '.6' }} />
        <SearchForm />
      </VerticalAlignToolbar>
    );

    const AccountGroup = () => (
      <VerticalAlignToolbar>
        <AccountWidget />
      </VerticalAlignToolbar>
    );

    const SettingsGroup = ({ user }) => (
      <VerticalAlignDropdown
        Button={IconButton}
        buttonProps={buttonProps}
      >
        <LocalizationMenu />
        <ReportBug />
        {user ? <LogOut /> : null}
      </VerticalAlignDropdown>
    );

    SettingsGroup.propTypes = {
      user: PropTypes.shape({}),
    };

    const ReportBug = () => (
      <BugLink
        href={REPORT_BUG_PATH}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Bug />
        <span>
          {strings.app_report_bug}
        </span>
      </BugLink>
    );

    const LogOut = () => (
      <BugLink
        href={`${process.env.REACT_APP_API_HOST}/logout`}
        rel="noopener noreferrer"
      >
        <LogOutButton />
        <span>
          {strings.app_logout}
        </span>
      </BugLink>
    );

    const { Announce } = this.state;

    return (
      <div>
        <ToolbarHeader>
          <VerticalAlignDiv>
            <LogoGroup small={small} />
            {small && <LinkGroup navbarPages={navbarPages} />}
          </VerticalAlignDiv>
          {!disableSearch && <SearchGroup />}
          <VerticalAlignDiv style={{ marginLeft: '16px' }}>
            {small && <AccountGroup />}
            {<SettingsGroup user={user} />}
          </VerticalAlignDiv>
        </ToolbarHeader>
        { location.pathname !== '/' && Announce && <Announce /> }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  small: state.browser.greaterThan.small,
  user: state.app.metadata.data.user,
  strings: state.app.strings,
});

export default connect(mapStateToProps, null)(Header);
