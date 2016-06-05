import React from 'react';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

export const PlayerMMR = ({ loading, error, rank, soloRank, mmrEstimate }) => {
  const getPlayerMMR = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div className={styles.mmr}>
        <div>Solo: {soloRank}</div>
        <div>Party: {rank}</div>
        <div>Estimate: {mmrEstimate.estimate}</div>
      </div>
    );
  };

  return (
    <div>
      {getPlayerMMR()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: player.getLoading(state),
  error: player.getError(state),
  rank: player.getCompetitiveRank(state),
  soloRank: player.getSoloMmrEstimate(state),
  mmrEstimate: player.getMmrEstimate(state),
});


export default connect(mapStateToProps)(PlayerMMR);
