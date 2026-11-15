import React from "react";
import AppLogo from "../App/AppLogo";
import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";
import { IconSteam } from "../Icons";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Footer.module.css";

const Footer = () => {
  const strings = useStrings();
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.logoNsocial}>
          <AppLogo />
          <SocialLinks />
        </div>
        <small className={styles.about}>
          <span id="app-description">{strings.app_description}</span>
          {" - "}
          <span id="app-powered-by">{strings.app_powered_by}</span>
          <a
            href="http://steampowered.com"
            aria-describedby="app-description app-powered-by"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconSteam />
          </a>
        </small>
        <hr className={styles.hr} />
        <div className={styles.pages}>
          <PageLinks />
        </div>
      </div>
      {/* <Cheese /> */}
    </footer>
  );
};

export default Footer;
