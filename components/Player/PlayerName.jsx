import React from 'react';
// import YaspBadge from './YaspBadge';
import PlayerPicture from './PlayerPicture';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

const PlayerName = ({ playerName, registered, loading, error, playerId }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    return (
      <div className={styles.nameContainer}>
        <div className={styles.pictureContainer}>
          <PlayerPicture registered={registered} playerId={playerId} />
        </div>
        <div className={styles.playerName}>{playerName}</div>
      </div>
    );
  };

  return <div>{getPlayerName()}</div>;
};

export { PlayerName };

// metadata.getUserId(state)
// TODO - why is the player picture not showing up at all? that's whack
const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  playerName: player.getPlayerName(state, ownProps.playerId),
  registered: player.getLastLogin(state, ownProps.playerId),
  playerId: ownProps.playerId,
});

export default connect(mapStateToProps)(PlayerName);
