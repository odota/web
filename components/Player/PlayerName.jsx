import React from 'react';
import { connect } from 'react-redux';
import { CardHeader } from 'material-ui/Card';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import { green500 } from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import palette from '../palette.css';

const PlayerName = ({ playerName, picture, cheese, registered, loading, error }) => {
  const getTitle = () => (
    <div>
      <span className={styles.playerTitle}>{playerName}</span>
      {registered &&
        <AccountCircle className={styles.playerRegistredIcon} color={green500} />}
    </div>
  );

  const getSubtitle = () => (
    <div>
      { /* Any other way to combine syles? */}
      <FontIcon className={palette.cheese + " " + palette.cheeseInline} />
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
