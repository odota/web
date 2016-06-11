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

const mapStateToProps = (state) => ({
  loading: player.getLoading(state),
  error: player.getError(state),
  wins: player.getWins(state),
  losses: player.getLosses(state),
});


export default connect(mapStateToProps)(PlayerRecord);
