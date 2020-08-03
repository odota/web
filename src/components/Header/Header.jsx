import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  SwipeableDrawer,
} from '@material-ui/core';
import { BugReport, Menu as MenuIcon, Settings } from '@material-ui/icons';
import LogOutButton from 'material-ui/svg-icons/action/power-settings-new';
import ActionSearch from 'material-ui/svg-icons/action/search';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GITHUB_REPO } from '../../config';
import AccountWidget from '../AccountWidget';
import AppLogo from '../App/AppLogo';
import constants from '../constants';
import LocalizationMenu from '../Localization';
import SearchForm from '../Search/SearchForm';

const REPORT_BUG_PATH = `//github.com/${GITHUB_REPO}/issues`;

const VerticalAlignToolbar = styled(ToolbarGroup)`
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
  margin: 0 12px;
  text-align: center;
  position: relative;
`;

const AppLogoWrapper = styled.div`
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const DropdownMenu = styled(Menu)`
  & .MuiMenu-paper {
    background: ${constants.primarySurfaceColor};
  }
`;

const DropdownMenuItem = styled(MenuItem)`
  color: ${constants.primaryTextColor} !important;
  padding-bottom: 12px !important;
  padding-top: 12px !important;
`;

const ToolbarHeader = styled(Toolbar)`
  backdrop-filter: blur(16px);
  background-color: ${constants.defaultPrimaryColorSolid} !important;
  height: 56px;
  left: 0;
  padding: 8px 16px !important;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;

  & a {
    color: ${constants.primaryTextColor};

    &:hover {
      color: ${constants.primaryTextColor};
      opacity: 0.6;
    }
  }
`;

const MenuContent = styled.div`
  background: ${constants.primarySurfaceColor};
  max-width: 300px;
  height: 100%;
  overflow: auto;
  min-width: 220px;
`;

const MenuLogoWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 24px 0;
`;

const DrawerLink = styled(Link)`
  color: ${constants.textColorPrimary};
`;

const LinkGroup = ({ navbarPages }) => (
  <VerticalAlignToolbar>
    {navbarPages.map((page) => (
      <TabContainer key={page.key}>
        <Link to={page.to}>{page.label}</Link>
        {Boolean(page.feature) && <div style={{ position: 'absolute', textTransform: 'uppercase', fontSize: '10px', top: '-10px', right: '0', color: 'lightblue' }}>{page.feature}</div>}
      </TabContainer>
    ))}
  </VerticalAlignToolbar>
);

LinkGroup.propTypes = {
  navbarPages: PropTypes.shape([{}]),
};

const SettingsGroup = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef();

  const handleClose = useCallback(() => {
    setAnchorEl(undefined);
  }, [setAnchorEl]);

  return (
    <>
      <IconButton
        ref={buttonRef}
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Settings />
      </IconButton>
      {buttonRef.current && (
        <DropdownMenu
          anchorEl={buttonRef.current}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ style: { maxHeight: 600 } }}
        >
          {children}
        </DropdownMenu>
      )}
    </>
  );
};

const MenuButtonWrapper = styled.div`
  margin-right: 12px;
`;

const LogoGroup = ({ onMenuClick }) => (
  <div style={{ marginRight: 16 }}>
    <VerticalAlignToolbar>
      <MenuButtonWrapper>
        <IconButton edge="start" color="inherit" onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
      </MenuButtonWrapper>
      <AppLogoWrapper>
        <AppLogo />
      </AppLogoWrapper>
    </VerticalAlignToolbar>
  </div>
);

LogoGroup.propTypes = {
  onMenuClick: PropTypes.func,
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

const ReportBug = ({ strings }) => (
  <DropdownMenuItem
    component="a"
    href={REPORT_BUG_PATH}
    target="_blank"
    rel="noopener noreferrer"
  >
    <BugReport style={{ marginRight: 32, width: 24, height: 24 }} />
    {strings.app_report_bug}
  </DropdownMenuItem>
);

ReportBug.propTypes = {
  strings: PropTypes.shape({}),
};

const LogOut = ({ strings }) => (
  <DropdownMenuItem
    component="a"
    href={`${process.env.REACT_APP_API_HOST}/logout`}
    rel="noopener noreferrer"
  >
    <LogOutButton style={{ marginRight: 32, width: 24, height: 24 }} />
    {strings.app_logout}
  </DropdownMenuItem>
);

LogOut.propTypes = {
  strings: PropTypes.shape({}),
};

const Header = ({ location, disableSearch }) => {
  const [Announce, setAnnounce] = useState(null);
  const [menuIsOpen, setMenuState] = useState(false);
  const small = useSelector((state) => state.browser.greaterThan.small);
  const user = useSelector((state) => state.app.metadata.data.user);
  const strings = useSelector((state) => state.app.strings);

  useEffect(() => {
    import('../Announce').then((ann) => setAnnounce(ann.default));
  }, []);

  const navbarPages = [
    {
      key: 'header_matches',
      to: '/matches',
      label: strings.header_matches,
    },
    {
      key: 'header_heroes',
      to: '/heroes',
      label: strings.header_heroes,
    },
    {
      key: 'header_teams',
      to: '/teams',
      label: strings.header_teams,
    },
    {
      key: 'header_explorer',
      to: '/explorer',
      label: strings.header_explorer,
    },
    {
      key: 'header_combos',
      to: '/combos',
      label: strings.combos,
    },
    {
      key: 'header_api',
      to: '/api-keys',
      label: strings.header_api,
    },
  ];

  const drawerPages = [
    ...navbarPages,
    {
      key: 'header_distributions',
      to: '/distributions',
      label: strings.header_distributions,
    },
    {
      key: 'header_records',
      to: '/records',
      label: strings.header_records,
    },
    {
      key: 'header_meta',
      to: '/meta',
      label: strings.header_meta,
    },
    {
      key: 'header_scenarios',
      to: '/scenarios',
      label: strings.header_scenarios,
    },
  ];

  return (
    <>
      <ToolbarHeader>
        <VerticalAlignDiv>
          <LogoGroup onMenuClick={() => setMenuState(true)} />
          {small && <LinkGroup navbarPages={navbarPages} />}
        </VerticalAlignDiv>
        {!disableSearch && <SearchGroup />}
        <VerticalAlignDiv style={{ marginLeft: '16px' }}>
          {small && <AccountGroup />}
          <SettingsGroup>
            <LocalizationMenu />
            <ReportBug strings={strings} />
            {user ? <LogOut strings={strings} /> : null}
          </SettingsGroup>
        </VerticalAlignDiv>
        <SwipeableDrawer
          onOpen={() => setMenuState(true)}
          onClose={() => setMenuState(false)}
          open={menuIsOpen}
        >
          <MenuContent>
            <MenuLogoWrapper>
              <div>
                <AppLogo onClick={() => setMenuState(false)} />
              </div>
            </MenuLogoWrapper>
            <List>
              {drawerPages.map((page) => (
                <DrawerLink key={`drawer__${page.to}`} to={page.to}>
                  <ListItem
                    button
                    key={`drawer__${page.to}`}
                    onClick={() => setMenuState(false)}
                  >
                    <ListItemText primary={page.label} />
                  </ListItem>
                </DrawerLink>
              ))}
            </List>
            <List>
              {user ? (
                <>
                  <DrawerLink to={`/players/${user.account_id}`}>
                    <ListItem button onClick={() => setMenuState(false)}>
                      <ListItemText primary={strings.app_my_profile} />
                    </ListItem>
                  </DrawerLink>
                  <DrawerLink
                    as="a"
                    href={`${process.env.REACT_APP_API_HOST}/logout`}
                  >
                    <ListItem button onClick={() => setMenuState(false)}>
                      <ListItemText primary={strings.app_logout} />
                    </ListItem>
                  </DrawerLink>
                </>
              ) : (
                <>
                  <DrawerLink
                    as="a"
                    href={`${process.env.REACT_APP_API_HOST}/login`}
                  >
                    <ListItem button onClick={() => setMenuState(false)}>
                      <ListItemText primary={strings.app_login} />
                    </ListItem>
                  </DrawerLink>
                </>
              )}
            </List>
          </MenuContent>
        </SwipeableDrawer>
      </ToolbarHeader>
      {location.pathname !== '/' && Announce && <Announce />}
    </>
  );
};

Header.propTypes = {
  location: PropTypes.shape({}),
  disableSearch: PropTypes.bool,
  navbarPages: PropTypes.shape([{}]),
  drawerPages: PropTypes.shape([{}]),
};

export default Header;
