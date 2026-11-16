import React from "react";
import { Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import config from "../../config";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./PlayerProfilePrivate.module.css";

const PlayerProfilePrivate = () => {
  const strings = useStrings();
  const handleButtonClick = () => {
    window.location.href = `${config.VITE_API_HOST}/login`;
  };
  const playerProfilePrivateTitle = (
    strings.player_profile_private_title || ""
  ).toUpperCase();

  return (
    <div className={styles.styled}>
      <div>
        <div className={styles.playerProfilePrivateTitle}>
          <LockIcon className={styles.lockIcon} />
          <div>{playerProfilePrivateTitle}</div>
        </div>
        <div className={styles.playerProfilePrivateDescription}>
          {strings.player_profile_private_description}
        </div>
        <Button
          className={styles.signInWithSteamButton}
          onClick={handleButtonClick}
        >
          {strings.sign_in_with_steam}
        </Button>
      </div>
    </div>
  );
};

export default PlayerProfilePrivate;
