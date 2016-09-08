import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { green500, grey600 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';
import palette from '../palette.css';

const PlayerName = ({ playerName, picture, cheese, registered, loading, error }) => {
  // This should be somewhere in constants.
  const trackingTime = 60 * 60 * 24 * 7;

  // This should be injected somehow.
  // Is this a redux reduser action which should be called in mapStateToProps?
  const notTracking = () => {
    const timestamp = Math.round(+Date.parse(registered) / 1000);
    return Math.round(new Date() / 1000) > (timestamp + trackingTime);
  };

  // Is this constants are ok?
  const abbrText = notTracking() ?
    `User has registered but don\'t visited site since ${registered}` :
    'User has registered at OpenDota';
  const iconColor = notTracking() ? grey600 : green500;

  // TOOD: abbr text are WIP, and i need help with this due to my bad English :)
  const getTitle = () => (
    <div>
      <span className={styles.playerTitle}>{playerName}</span>
      { (registered) &&
        <abbr title={abbrText}>
          <AccountCircle className={styles.playerRegistredIcon} color={iconColor} />
        </abbr>
      }
    </div>
  );

  const getSubtitle = () => (
    <div>
      { /* Any other way to combine styles? */}
      <FontIcon className={`${palette.cheese} ${palette.cheeseInline}`} />
      <span>x{cheese}</span>
    </div>
  );

  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    // TODO display cheese, tracked state
    // hotel icon for inactive players?

    return (<CardHeader title={getTitle()} subtitle={getSubtitle()} avatar={picture} />);
  };

  return <div>{getPlayerName()}</div>;
};

// metadata.getUserId(state)
const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  registered: player.getLastLogin(state, ownProps.playerId),
  picture: player.getPicture(state, ownProps.playerId),
  steamLink: player.getSteamLink(state, ownProps.playerId),
  cheese: player.getCheese(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(PlayerName);
