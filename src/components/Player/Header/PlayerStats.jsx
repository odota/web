import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActionHelp from 'material-ui/svg-icons/action/help';
import styled from 'styled-components';
import Error from '../../Error';
import Spinner from '../../Spinner';
import PlayedWith from './PlayedWith';
import { PlayerStatsCard } from './Styled';
import constants from '../../constants';
import strings from '../../../lang';

const Styled = styled.div`
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.textSuccess {
  color: ${constants.colorGreen}
}

.textDanger {
  color: ${constants.colorRed}
}

.icon {
  fill: ${constants.colorMutedLight} !important;
}

.estimateHelp {
  display: inline-block;
  position: relative;

  & svg {
    width: 16px !important;
    height: 16px !important;
    margin-left: 5px;
    position: absolute;
    margin-top: -13px;
  }

  &[data-hint-position="top"] {
    &::after {
      margin-bottom: 19px;
      margin-left: -2px;
    }

    &::before {
      top: -19px;
      margin-left: 7px;
    }
  }
}

.estimatedMMR {
  position: relative;

  &[data-hint] {
    &::after {
      margin-left: 10px;
      margin-top: 5px;
    }
  }
}

`;

export const PlayerStatsCards = ({
  loading,
  error,
  partyRank,
  soloRank,
  mmrEstimate,
  wins,
  losses,
  compact,
  playerId,
  loggedInId,
}) => {
  if (error) {
    return <Error />;
  }
  if (loading) {
    return <Spinner />;
  }
  return (
    <Styled>
      <div className="container">
        <div style={{ textAlign: compact ? 'center' : '' }}>
          <PlayerStatsCard
            subtitle={<div className="textSuccess">{wins}</div>}
            title={strings.th_wins}
          />
          <PlayerStatsCard
            subtitle={<div className="textDanger">{losses}</div>}
            title={strings.th_losses}
          />
          <PlayerStatsCard
            subtitle={wins + losses ? `${((wins / (wins + losses)) * 100).toFixed(2)}%` : strings.abbr_not_available}
            title={strings.th_winrate}
          />
          {soloRank && (
            <PlayerStatsCard
              subtitle={soloRank || strings.abbr_not_available}
              title={strings.th_solo_mmr}
            />
          )}
          {partyRank && (
            <PlayerStatsCard
              subtitle={partyRank || strings.abbr_not_available}
              title={strings.th_party_mmr}
            />
          )}
          {mmrEstimate && mmrEstimate.estimate > 0 && (
            <PlayerStatsCard
              subtitle={
                <div
                  className="estimatedMMR"
                >
                  {mmrEstimate.estimate}
                </div>
              }
              title={
                <div>
                  {strings.th_estimated_mmr}
                  <div
                    className="estimateHelp"
                    data-hint={strings.tooltip_estimated_mmr}
                    data-hint-position="top"
                  >
                    <ActionHelp className="icon" />
                  </div>
                </div>
              }
            />
          )}
          <PlayedWith loggedInId={loggedInId} playerId={playerId} />
        </div>
      </div>
    </Styled>
  );
};

const {
  number, bool, shape, string,
} = PropTypes;

PlayerStatsCards.propTypes = {
  loading: bool,
  error: bool,
  partyRank: string,
  soloRank: number,
  mmrEstimate: shape({}),
  wins: number,
  losses: number,
  compact: bool,
  playerId: string,
  loggedInId: string,
};

const mapStateToProps = state => ({
  loading: state.app.player.loading,
  error: state.app.player.error,
  partyRank: state.app.player.data.competitive_rank,
  soloRank: state.app.player.data.solo_competitive_rank,
  mmrEstimate: state.app.player.data.mmr_estimate,
  wins: state.app.playerWinLoss.data.win,
  losses: state.app.playerWinLoss.data.lose,
});

export default connect(mapStateToProps)(PlayerStatsCards);
