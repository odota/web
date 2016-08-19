import React from 'react';
// import PlayerPicture from './PlayerPicture';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
// import styles from './PlayerHeader.css';
import { CardHeader } from 'material-ui/Card';

const PlayerName = ({ playerName, picture, loading, error }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    /*
        return (
          <div>
            <div className={styles.nameContainer}>
              <div className={styles.pictureContainer}>
                <PlayerPicture registered={registered} playerId={playerId} />
              </div>
              <div className={styles.playerName}>{playerName}</div>
            </div>
          </div>
        );
    */
    // TODO display cheese, tracked state
    // hotel icon for inactive players?
    return (<CardHeader title={playerName} avatar={picture} />);
  };

  return <div>{getPlayerName()}</div>;
};

export { PlayerName };

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
