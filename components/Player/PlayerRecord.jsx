import React from 'react';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

export const PlayerRecord = ({ loading, error, wins, losses }) => {
  const calcWinPercent = (wins, losses) => Math.ceil(10000 * ((wins) / (wins + losses))) / 100;

  const getPlayerRecord = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.mmr}>
        <div>{`${wins} - ${losses} (${calcWinPercent(wins, losses)}%)`}</div>
      </div>
    );
  };

  return (
    <div>
      {getPlayerRecord()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  wins: player.getWins(state, ownProps.playerId),
  losses: player.getLosses(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerRecord);
