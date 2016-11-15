import React from 'react';
import { connect } from 'react-redux';
import { player } from 'reducers';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconCheese, IconSteam, IconEye, IconEyeInactive, IconTrophy } from 'components/Icons';
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
            <IconTrophy className={`${styles.icon} ${styles.IconTrophy}`} />
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

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  cheese: player.getCheese(state, ownProps.playerId),
  tracked: player.getTrackedUntil(state, ownProps.playerId),
  steamLink: player.getSteamLink(state, ownProps.playerId),
  officialPlayerName: player.getOfficialPlayerName(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerBadgesIcons);
