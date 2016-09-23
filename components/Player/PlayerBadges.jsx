import React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';
import { IconCheese, IconSteam, IconEye, IconEyeInactive } from '../Icons';

export const PlayerBadgesIcons = ({ loading, error, cheese, tracked, steamLink }) => {
  const getPlayerBadges = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.playerBadges}>
        <div data-tip data-for="steamLink" className={styles.iconButton}>
          <a rel="noopener noreferrer" target="_blank" href={steamLink}>
            <IconSteam className={styles.icon} />
            <ReactTooltip id="steamLink" place="top" type="light" effect="float">
              Steam profile
            </ReactTooltip>
          </a>
        </div>
        {Math.round(new Date().getTime() / 1000.0) >= Number(tracked) ?
          <div data-tip data-for="untracked" className={styles.iconButton}>
            <IconEyeInactive className={styles.icon} style={{ height: 22, fill: 'darkgray' }} />
            <ReactTooltip id="untracked" place="top" type="light" effect="float">
              This user is inactive, and replays of new matches will not be automatically parsed.
            </ReactTooltip>
          </div>
        :
          <div data-tip data-for="tracked" className={styles.iconButton}>
            <IconEye className={styles.icon} style={{ height: 22 }} />
            <ReactTooltip id="tracked" place="top" type="light" effect="float">
              This user is tracked, and replays of new matches will be automatically parsed.
            </ReactTooltip>
          </div>
        }
        {cheese > 0 &&
          <div data-tip data-for="cheese" className={styles.iconButton}>
            <IconCheese className={`${styles.cheese} ${styles.icon}`} style={{ height: 18 }} />
            <ReactTooltip id="cheese" place="top" type="light" effect="float">
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
});


export default connect(mapStateToProps)(PlayerBadgesIcons);
