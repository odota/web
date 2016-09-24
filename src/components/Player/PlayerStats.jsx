import React from 'react';
import { connect } from 'react-redux';
import { CardTitle } from 'material-ui/Card';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ReactTooltip from 'react-tooltip';
import { player } from 'reducers';
import Error from '../Error';
import Spinner from '../Spinner';
import styles from './PlayerHeader.css';

export const PlayerStatsCards = ({ loading, error, partyRank, soloRank, mmrEstimate, wins, losses }) => {
  const getPlayerStats = () => {
    if (error) return <Error />;
    if (loading) return <Spinner />;

    return (
      <div style={{ position: 'absolute' }}>
        <CardTitle
          className={styles.playerStats}
          subtitle={<div className={styles.textSuccess}>{wins}</div>}
          title="wins"
        />
        <CardTitle
          className={styles.playerStats}
          subtitle={<div className={styles.textDanger}>{losses}</div>}
          title="losses"
        />
        <CardTitle
          className={styles.playerStats}
          subtitle={`${((wins / (wins + losses)) * 100).toFixed(2)}%`}
          title="winrate"
        />
        {soloRank ? <CardTitle
          className={styles.playerStats}
          subtitle={soloRank || 'N/A'}
          title="Solo MMR"
        /> : null}
        {partyRank ? <CardTitle
          className={styles.playerStats}
          subtitle={partyRank || 'N/A'}
          title="Party MMR"
        /> : null}
        {mmrEstimate.estimate ? <CardTitle
          className={styles.playerStats}
          subtitle={
            <div>
              <div data-tip data-for="estimate">
                {mmrEstimate.estimate}
              </div>
              <ReactTooltip id="estimate" place="right" type="light" effect="float">
                <div style={{ lineHeight: 1.2 }}>
                  Standard deviation: {Math.round(mmrEstimate.stdDev)}
                  <br />
                  Matches: {mmrEstimate.n}
                </div>
              </ReactTooltip>
            </div>
          }
          title={
            <div>
              estimated MMR
              <div data-tip data-for="estimateInfo" style={{ display: 'inline-block' }}>
                <ActionHelp className={`${styles.icon} ${styles.mmrEstimateIcon}`} />
              </div>
              <ReactTooltip id="estimateInfo" place="right" type="light" effect="float">
                <div style={{ textTransform: 'none', lineHeight: 1.2 }}>
                  MMR estimate based on data from peer players.
                  This is the mean visible MMR of the recent matches played by this user.
                </div>
              </ReactTooltip>
            </div>
          }
        /> : null}
      </div>
    );
  };

  return getPlayerStats();
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  partyRank: player.getCompetitiveRank(state, ownProps.playerId),
  soloRank: player.getSoloMmrEstimate(state, ownProps.playerId),
  mmrEstimate: player.getMmrEstimate(state, ownProps.playerId),
  wins: player.getWins(state, ownProps.playerId),
  losses: player.getLosses(state, ownProps.playerId),
});


export default connect(mapStateToProps)(PlayerStatsCards);
