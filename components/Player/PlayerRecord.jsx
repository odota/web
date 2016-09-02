import React from 'react';
import { connect } from 'react-redux';
import SocialPoll from 'material-ui/svg-icons/social/poll';
import { green500 } from 'material-ui/styles/colors';
import Error from '../Error';
import Spinner from '../Spinner';
import { player } from '../../reducers';
// import styles from './PlayerHeader.css';

export const PlayerRecord = ({ loading, error, wins, losses }) => {
  const getPlayerRecord = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;
    return (
      <div>
        <span className={styles.infoRow}>
          <abbr title={"Win/Lose"}>
            <SocialPoll color={green500} />
          </abbr>
          <span className="textSuccess">{wins}</span>
          <span>/</span>
          <span className="textDanger">{losses}</span>
          <span>{` (${(wins / (wins + losses) * 100).toFixed(2)}%)`}</span>
        </span>
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
