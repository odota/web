import React from 'react';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';

//TODO make a dumb component
export const PlayerMMR = ({ loading, error, rank, soloRank, mmrEstimate }) => {
  const getPlayerMMR = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div>
        <span className={"text-info rating"}>
          <span>
            <abbr title={"Solo MMR"}>
              <i className={"fa fa-fw fa-user"}></i>
            </abbr>
          </span>
          <small>{soloRank}</small>
        </span>
        <span className={"text-warning rating"}>
          <span>
            <abbr title={"Party MMR"}>
              <i className={"fa fa-fw fa-users"}></i>
            </abbr>
          </span>
          <small>{rank}</small>
        </span>
        <span className={"rating"}>
          <span>
            <abbr title={"MMR estimate based on available data from peer players. This is an estimate of the population mean MMR of the recent matches played by this user."}>
              <i className={"fa fa-fw fa-question-circle"}></i>
            </abbr>
          </span>
          <small>{mmrEstimate.estimate}</small>
        </span>
      </div>
    );
  };

  return (
    <div className={styles.mmrContainer}>
      {getPlayerMMR()}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  rank: player.getCompetitiveRank(state, ownProps.playerId),
  soloRank: player.getSoloMmrEstimate(state, ownProps.playerId),
  mmrEstimate: player.getMmrEstimate(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerMMR);
