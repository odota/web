import React from 'react';
import YaspBadge from './YaspBadge';
import PlayerPicture from './PlayerPicture';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

const PlayerName = ({ playerName, registered, loading, error }) => {
  const getPlayerName = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    return (
      <div className={styles.nameContainer}>
        <PlayerPicture />
        <div className={styles.playerName}>{playerName}</div>
        {registered && <YaspBadge />}
      </div>
    );
  };

  return <div>{getPlayerName()}</div>;
};

export { PlayerName };

// TODO - add account reducer for player so I can just call getX() instead of dot notation

const mapStateToProps = (state) => ({
  loading: player.getLoading(state),
  error: player.getError(state),
  playerName: player.getPlayerName(state),
  registered: player.getLastLogin(state),
});

export default connect(mapStateToProps)(PlayerName);
