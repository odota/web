import React from 'react';
import { connect } from 'react-redux';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconCheese, IconSteam, IconEye, IconEyeInactive } from 'components/Icons';
import CheckCircle from 'material-ui/svg-icons/action/check-circle';
import strings from 'lang';
import styles from './PlayerBadges.css';

export const PlayerBadgesIcons = ({ loading, error, cheese, tracked, steamLink, officialPlayerName }) => {
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
            <CheckCircle className={`${styles.icon} ${styles.IconTrophy}`} />
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
        {Math.round(new Date().getTime() / 1000.0) >= Number(tracked) ? (
          <div
            className={`${styles.iconButton} ${styles.iconEye}`}
            data-hint={strings.app_untracked}
            data-hint-position="top"
          >
            <IconEyeInactive className={styles.icon} />
          </div>
          ) : (
            <div
              className={`${styles.iconButton} ${styles.iconEye}`}
              data-hint={strings.app_tracked}
              data-hint-position="top"
            >
              <IconEye className={styles.iconEyeTracked} />
            </div>
          )
        }
        {cheese > 0 && (
          <div
            className={styles.iconButton}
            data-hint={`${cheese} ${strings.app_cheese_bought}`}
            data-hint-position="top"
          >
            <IconCheese className={`${styles.cheese} ${styles.icon}`} />
          </div>
        )}
      </div>
    );
  };

  return getPlayerBadges();
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  cheese: (state.app.player.data.profile || {}).cheese,
  tracked: state.app.player.data.tracked_until,
  steamLink: (state.app.player.data.profile || {}).profileurl,
  officialPlayerName: (state.app.player.data.profile || {}).name,
});

export default connect(mapStateToProps)(PlayerBadgesIcons);
