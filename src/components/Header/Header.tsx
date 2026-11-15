import { IconButton, List, ListItem, ListItemText, Menu, MenuItem, SwipeableDrawer, BugReportIcon as BugReport, MenuIcon, SettingsIcon as Settings, LogoutIcon, SearchIcon, Toolbar } from "../ui";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import config from "../../config";
import AccountWidget from "../AccountWidget/AccountWidget";
import AppLogo from "../App/AppLogo";
import LocalizationMenu from "../Localization/Localization";
import SearchForm from "../Search/SearchForm";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Header.module.css";

const REPORT_BUG_PATH = `//github.com/${config.GITHUB_REPO}/issues`;

const LinkGroup = ({ navbarPages }: { navbarPages: any[] }) => (
  <div className={styles.verticalAlignToolbar}>
    {navbarPages.map((page: any) => (
      <div className={styles.tabContainer} key={page.key}>
        <Link className={styles.linkGroupLink} to={page.to}>
          {page.label}
        </Link>
        {Boolean(page.feature) && (
          <div
            style={{
              position: "absolute",
              textTransform: "uppercase",
              fontSize: "10px",
              top: "-10px",
              right: "0",
              color: "lightblue",
            }}
          >
            {page.feature}
          </div>
        )}
      </div>
    ))}
  </div>
);

const SettingsGroup = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  return (
    <div>
      <IconButton
        ref={buttonRef}
        aria-label="settings menu"
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Settings />
      </IconButton>
      {buttonRef.current && (
        <Menu
          className={styles.dropdownMenu}
          anchorEl={buttonRef.current}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{ style: { maxHeight: 600 } }}
        >
          {children}
        </Menu>
      )}
    </div>
  );
};

const LogoGroup = ({
  onMenuClick,
}: {
  onMenuClick: (e: React.MouseEvent) => void;
}) => (
  <div style={{ marginRight: 16, marginLeft: 16 }}>
    <div className={styles.verticalAlignToolbar}>
      <div className={styles.menuButtonWrapper}>
        <IconButton
          aria-label="main menu"
          edge="start"
          color="inherit"
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <div className={styles.appLogoWrapper}>
        <AppLogo />
      </div>
    </div>
  </div>
);

const SearchGroup = () => (
  <div className={styles.verticalAlignToolbar}>
    <SearchIcon style={{ marginRight: 6, opacity: ".6" }} />
    <SearchForm />
  </div>
);

const AccountGroup = () => (
  <div className={styles.verticalAlignToolbar}>
    <AccountWidget />
  </div>
);

const ReportBug = () => {
  const strings = useStrings();
  return (
    <MenuItem
      className={styles.dropdownMenuItem}
      component="a"
      href={REPORT_BUG_PATH}
      target="_blank"
      rel="noopener noreferrer"
    >
      <BugReport style={{ marginRight: 32, width: 24, height: 24 }} />
      {strings.app_report_bug}
    </MenuItem>
  );
};

const LogOut = () => {
  const strings = useStrings();
  return (
    <MenuItem
      className={styles.dropdownMenuItem}
      component="a"
      href={`${config.VITE_API_HOST}/logout`}
      rel="noopener noreferrer"
    >
      <LogoutIcon style={{ marginRight: 32, width: 24, height: 24 }} />
      {strings.app_logout}
    </MenuItem>
  );
};

const Header = ({
  location,
  disableSearch,
}: {
  location: any;
  disableSearch?: boolean;
}) => {
  const [Announce, setAnnounce] =
    useState<React.JSXElementConstructor<any> | null>(null);
  const [menuIsOpen, setMenuState] = useState(false);
  const small = useSelector((state: any) => state.browser.greaterThan.small);
  const user = useSelector((state: any) => state.app.metadata.data.user);
  const strings = useStrings();

  useEffect(() => {
    const loadAnnounce = async () => {
      const ann = await import("../Announce/Announce");
      setAnnounce(ann.default);
    };
    void loadAnnounce();
  }, []);

  const navbarPages = [
    {
      key: "header_request",
      to: "/request",
      label: strings.header_request,
    },
    { key: "esports", to: "/esports", label: strings.esports_title },
    {
      key: "header_matches",
      to: "/matches",
      label: strings.header_matches,
    },
    {
      key: "header_heroes",
      to: "/heroes",
      label: strings.header_heroes,
    },
    {
      key: "header_teams",
      to: "/teams",
      label: strings.header_teams,
    },
    // {
    //   key: 'header_players',
    //   to: '/players',
    //   label: strings.header_players,
    // },
    {
      key: "header_explorer",
      to: "/explorer",
      label: strings.header_explorer,
    },
    {
      key: "header_combos",
      to: "/combos",
      label: strings.combos,
    },
    {
      key: "header_distributions",
      to: "/distributions",
      label: strings.header_distributions,
    },
    {
      key: "header_records",
      to: "/records",
      label: strings.header_records,
    },
    {
      key: "header_scenarios",
      to: "/scenarios",
      label: strings.header_scenarios,
    },
    {
      key: "header_api",
      to: "/api-keys",
      label: strings.header_api,
    },
    {
      key: "header_subscribe",
      to: "/subscribe",
      label: strings.header_subscribe,
    },
    // {
    //   key: 'header_predictions',
    //   to: '/predictions',
    //   label: 'TI Predictions',
    // },
  ];

  const drawerPages = [...navbarPages];

  return (
    <>
      <Toolbar className={styles.toolbarHeader} disableGutters variant="dense">
        <div className={styles.verticalAlignDiv}>
          <LogoGroup onMenuClick={() => setMenuState(true)} />
          {small && <LinkGroup navbarPages={navbarPages} />}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            gap: "4px",
          }}
        >
          {!disableSearch && <SearchGroup />}
          <div className={styles.verticalAlignDiv}>
            {small && <AccountGroup />}
            <SettingsGroup>
              <LocalizationMenu />
              <ReportBug />
              {user ? <LogOut /> : null}
            </SettingsGroup>
          </div>
        </div>
        <SwipeableDrawer
          onOpen={() => setMenuState(true)}
          onClose={() => setMenuState(false)}
          open={menuIsOpen}
        >
          <div className={styles.menuContent}>
            <div className={styles.menuLogoWrapper}>
              <div>
                <AppLogo onClick={() => setMenuState(false)} />
              </div>
            </div>
            <List>
              {drawerPages.map((page) => (
                <Link
                  className={styles.drawerLink}
                  key={`drawer__${page.to}`}
                  to={page.to}
                  onClick={() => setMenuState(false)}
                >
                  <ListItem>
                    <ListItemText primary={page.label} />
                  </ListItem>
                </Link>
              ))}
            </List>
            <List>
              {user ? (
                <>
                  <Link
                    className={styles.drawerLink}
                    to={`/players/${user.account_id}`}
                  >
                    <ListItem onClick={() => setMenuState(false)}>
                      <ListItemText primary={strings.app_my_profile} />
                    </ListItem>
                  </Link>
                  <a
                    className={styles.drawerLink}
                    href={`${config.VITE_API_HOST}/logout`}
                  >
                    <ListItem onClick={() => setMenuState(false)}>
                      <ListItemText primary={strings.app_logout} />
                    </ListItem>
                  </a>
                </>
              ) : (
                <a
                  className={styles.drawerLink}
                  href={`${config.VITE_API_HOST}/login`}
                >
                  <ListItem onClick={() => setMenuState(false)}>
                    <ListItemText primary={strings.app_login} />
                  </ListItem>
                </a>
              )}
            </List>
          </div>
        </SwipeableDrawer>
      </Toolbar>
      {location.pathname !== "/" && Announce && <Announce />}
    </>
  );
};

export default Header;
