import React from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import ActionVisibility from 'material-ui/svg-icons/action/visibility';
import ReactTooltip from 'react-tooltip';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

export const PlayerBadges = ({ loading, error, cheese, tracked, steamLink }) => {
  const getPlayerBadges = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.playerBadges}>
        <div>
          <a data-tip data-for="steam" className={styles.icon} href={steamLink} rel="noopener noreferrer" target="_blank">
            <img alt="Steam" src="/assets/steam_icon.png" width="16" height="16" />
          </a>
          <ReactTooltip id="steam" place="top" type="light" effect="float">
            Steam profile
          </ReactTooltip>
        </div>
        {Math.round(new Date().getTime() / 1000.0) >= Number(tracked) ? null :
          <div>
            <div data-tip data-for="tracked">
              <ActionVisibility className={styles.icon} />
            </div>
            <ReactTooltip id="tracked" place="top" type="light" effect="float">
              This user is tracked.
              <br />
              New matches have replays parsed
            </ReactTooltip>
          </div>
        }
        {cheese ?
          <div>
            <div data-tip data-for="cheese">
              <FontIcon style={{ fontWeight: 600, textShadow: 'none' }} className={`${styles.cheese} ${styles.icon}`} />
            </div>
            <ReactTooltip id="cheese" place="top" type="light" effect="float">
              {cheese} Cheese bought
            </ReactTooltip>
          </div>
        : null}
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


export default connect(mapStateToProps)(PlayerBadges);
