import React from "react";
import { Link } from "react-router-dom";
import constants from "../constants";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./AppLogo.module.css";

interface AppLogoProps {
  size?: string;
  onClick?: () => void;
}

const AppLogo = ({ size, onClick }: AppLogoProps) => {
  const strings = useStrings();
  return (
    <Link
      className={styles.styledLink}
      aria-label="Go to the Open Dota homepage"
      to="/"
      onClick={onClick}
    >
      <span
        style={{
          fontFamily: constants.fontFamilyFuturistic,
          fontSize: size,
          whiteSpace: "nowrap",
        }}
      >
        {strings.app_name && `<${strings.app_name}/>`}
      </span>
    </Link>
  );
};

export default AppLogo;
