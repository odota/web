import React from "react";
import { connect } from "react-redux";
import Error from "../../Error/Error";
import Spinner from "../../Spinner/Spinner";
import {
  IconCheese,
  IconSteam,
  IconContributor,
  IconCheckCircle,
} from "../../Icons";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import styles from "./PlayerBadges.module.css";

export const PlayerBadgesIcons = ({
  loading,
  error,
  cheese,
  isContributor,
  isSubscriber,
  tracked,
  steamLink,
  officialPlayerName,
  playerId,
  registered,
}: {
  loading: boolean;
  error: string;
  cheese: number;
  isContributor: boolean;
  isSubscriber: boolean;
  tracked: boolean;
  steamLink: string;
  officialPlayerName: string;
  playerId: string;
  registered: boolean;
}) => {
  const strings = useStrings();
  const getPlayerBadges = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.playerBadges}>
        {officialPlayerName && (
          <div
            className={styles.iconButton}
            data-hint={`${strings.app_confirmed_as} ${officialPlayerName}`}
            data-hint-position="top"
          >
            <IconCheckCircle className={styles.iconConfirmed} />
          </div>
        )}
        <div
          className={`${styles.iconButton} ${styles.iconSteam}`}
          data-hint={strings.app_steam_profile}
          data-hint-position="top"
        >
          <a rel="noopener noreferrer" target="_blank" href={steamLink}>
            <IconSteam className={styles.icon} />
          </a>
        </div>
        {cheese > 0 && (
          <div
            className={styles.iconButton}
            data-hint={`${cheese} ${strings.app_cheese_bought}`}
            data-hint-position="top"
          >
            <IconCheese className={`${styles.cheese} ${styles.icon}`} />
          </div>
        )}
        {isSubscriber && (
          <div
            className={`${styles.iconButton} ${styles.iconContributor}`}
            data-hint={`${strings.app_subscriber}`}
            data-hint-position="top"
          >
            <IconContributor
              className={styles.icon}
              dColor="#FFD700"
              oColor="#212121"
            />
          </div>
        )}
        {isContributor && (
          <div
            className={`${styles.iconButton} ${styles.iconContributor}`}
            data-hint={`${strings.app_contributor}`}
            data-hint-position="top"
          >
            <IconContributor
              className={styles.icon}
              dColor="#21be93"
              oColor="#212121"
            />
          </div>
        )}
        {registered && <RegisteredBadge registered={registered} />}
      </div>
    );
  };

  return getPlayerBadges();
};

const RegisteredBadge = ({ registered }: { registered: boolean }) => {
  const strings = useStrings();
  return registered ? (
    <div
      style={{
        marginLeft: "8px",
        paddingTop: "8px",
        color: constants.colorSuccess,
      }}
      data-hint={strings.tooltip_registered_user}
    >
      <HowToRegIcon />
    </div>
  ) : null;
};

const mapStateToProps = (state: any) => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  cheese: (state.app.player.data.profile || {}).cheese,
  isContributor: (state.app.player.data.profile || {}).is_contributor,
  isSubscriber: (state.app.player.data.profile || {}).is_subscriber,
  tracked: state.app.player.data.tracked_until,
  steamLink: (state.app.player.data.profile || {}).profileurl,
  officialPlayerName: (state.app.player.data.profile || {}).name,
  registered: (state.app.player.data.profile || {}).last_login,
});

export default connect(mapStateToProps)(PlayerBadgesIcons);
