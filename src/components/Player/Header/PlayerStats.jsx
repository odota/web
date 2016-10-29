import React, { PropTypes } from 'react';
import {
  connect,
} from 'react-redux';
import {
  CardTitle,
} from 'material-ui/Card';
import ActionHelp from 'material-ui/svg-icons/action/help';
import ReactTooltip from 'react-tooltip';
import {
  player,
} from 'reducers';
import Error from 'components/Error';
import Spinner from 'components/Spinner';
import strings from 'lang';
import styles from './PlayerStats.css';

export const PlayerStatsCards = ({
    loading,
    error,
    partyRank,
    soloRank,
    mmrEstimate,
    wins,
    losses,
    compact,
  }) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className={compact ? styles.compactContainer : styles.container}>
      <div className={compact && styles.compactRow}>
        <CardTitle
          className={styles.playerStats}
          subtitle={<div className={styles.textSuccess}>{wins}</div>}
          title={strings.th_wins}
        />
        <CardTitle
          className={styles.playerStats}
          subtitle={<div className={styles.textDanger}>{losses}</div>}
          title={strings.th_losses}
        />
        <CardTitle
          className={styles.playerStats}
          subtitle={`${((wins / (wins + losses)) * 100).toFixed(2)}%`}
          title={strings.th_winrate}
        />
      </div>
      <div className={compact && styles.compactRow}>
        {soloRank && (
          <CardTitle
            className={styles.playerStats}
            subtitle={soloRank || 'N/A'}
            title={strings.th_solo_mmr}
          />
        )}
        {partyRank && (
          <CardTitle
            className={styles.playerStats}
            subtitle={partyRank || 'N/A'}
            title={strings.th_party_mmr}
          />
        )}
        {mmrEstimate.estimate > 0 && (
          <CardTitle
            className={styles.playerStats}
            subtitle={
              <div>
                <div data-tip data-for="estimate">
                  {mmrEstimate.estimate}
                  <ReactTooltip id="estimate" place="bottom" type="light" effect="float">
                    {strings.general_standard_deviation}: {Math.round(mmrEstimate.stdDev)}
                    <br />
                    {strings.general_matches}: {mmrEstimate.n}
                  </ReactTooltip>
                </div>
              </div>
            }
            title={
              <div>
                {strings.th_estimated_mmr}
                <div data-tip data-for="estimateInfo" style={{ display: 'inline-block' }}>
                  <ActionHelp className={`${styles.icon} ${styles.mmrEstimateIcon}`} />
                </div>
                <ReactTooltip id="estimateInfo" place="right" type="light" effect="float">
                  <div style={{ textTransform: 'none', lineHeight: 1.2 }}>
                    {strings.tooltip_estimated_mmr}
                  </div>
                </ReactTooltip>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

const { number, bool } = PropTypes;
PlayerStatsCards.propTypes = {
  loading: bool,
  error: bool,
  partyRank: number,
  soloRank: number,
  mmrEstimate: number,
  wins: number,
  losses: number,
  compact: bool,
};

const mapStateToProps = (state, ownProps) => ({
  loading: player.getLoading(state, ownProps.playerId),
  error: player.getError(state, ownProps.playerId),
  partyRank: player.getCompetitiveRank(state, ownProps.playerId),
  soloRank: player.getSoloCompetitiveRank(state, ownProps.playerId),
  mmrEstimate: player.getMmrEstimate(state, ownProps.playerId),
  wins: player.getWins(state, ownProps.playerId),
  losses: player.getLosses(state, ownProps.playerId),
});

export default connect(mapStateToProps)(PlayerStatsCards);
