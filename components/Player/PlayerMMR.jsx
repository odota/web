import React from 'react';
import Error from '../Error';
import Spinner from '../Spinner';
import { connect } from 'react-redux';
import { player } from '../../reducers';
import styles from './PlayerHeader.css';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SocialGroup from 'material-ui/svg-icons/social/group';
import ActionHelp from 'material-ui/svg-icons/action/help';
import { blue500, orange500, grey500 } from 'material-ui/styles/colors';

export const PlayerMMR = ({ loading, error, rank, soloRank, mmrEstimate }) => {
  const getPlayerMMR = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div>
        <span>
          <abbr title={"Solo MMR"}>
            <SocialPerson color={blue500} />
          </abbr>
          <small>{soloRank}</small>
          <abbr title={"Party MMR"}>
            <SocialGroup color={orange500} />
          </abbr>
          <small>{rank}</small>
          <abbr
            title={`MMR estimate based on available data from peer players. 
            This is an estimate of the population mean MMR of the recent matches played by this user.`}
          >
            <ActionHelp color={grey500} />
          </abbr>
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
