import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { player } from 'reducers';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import { IconCheese, IconSteam, IconEye, IconEyeInactive, IconTrophy } from 'components/Icons';
import styles from './PlayerBadges.css';

// TODO localize strings
export const PlayerBadgesIcons = ({ loading, error, cheese, tracked, steamLink, officialPlayerName }) => {
  const getPlayerBadges = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.playerBadges}>
        <div className={styles.iconButton}>
          <a rel="noopener noreferrer" target="_blank" href={steamLink}>
            <IconSteam
              data-tip data-for="steamLink"
              className={styles.icon}
            />
            <ReactTooltip id="steamLink" place="top" type="light" effect="solid">
              Steam profile
            </ReactTooltip>
          </a>
        </div>
        {officialPlayerName && (
          <div className={styles.iconButton}>
            <IconTrophy
              data-tip data-for="proPlayer"
              className={styles.icon}
            />
            <ReactTooltip id="proPlayer" place="top" type="light" effect="solid">
              This player is confirmed as {officialPlayerName}
            </ReactTooltip>
          </div>
        )}
        {Math.round(new Date().getTime() / 1000.0) >= Number(tracked) ?
          <div className={styles.iconButton}>
            <IconEyeInactive
              data-tip data-for="untracked"
              className={styles.icon}
              style={{ height: 22, fill: 'darkgray' }}
            />
            <ReactTooltip id="untracked" place="top" type="light" effect="solid">
              This user is inactive, and replays of new matches will not be automatically parsed.
            </ReactTooltip>
          </div>
          :
          <div className={styles.iconButton}>
            <IconEye
              data-tip data-for="tracked"
              className={styles.icon}
              style={{ height: 22 }}
            />
            <ReactTooltip id="tracked" place="top" type="light" effect="solid">
              This user is tracked, and replays of new matches will be automatically parsed.
            </ReactTooltip>
          </div>
        }
        {cheese > 0 &&
          <div className={styles.iconButton}>
            <IconCheese
              data-tip data-for="cheese"
              className={`${styles.cheese} ${styles.icon}`}
              style={{ height: 18 }}
            />
            <ReactTooltip id="cheese" place="top" type="light" effect="solid">
              {cheese} Cheese bought
            </ReactTooltip>
          </div>
        }
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
