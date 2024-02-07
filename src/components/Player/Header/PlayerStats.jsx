import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ActionHelp from 'material-ui/svg-icons/action/help';
import styled from 'styled-components';
import Spinner from '../../Spinner';
import Error from '../../Error';
import PlayedWith from './PlayedWith';
import { PlayerStatsCard } from './Styled';
import constants from '../../constants';

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
`;

export const PlayerStatsCards = ({
  loading,
  error,
  wins,
  losses,
  compact,
  playerId,
  loggedInId,
  strings,
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
  wins: number,
  losses: number,
  compact: bool,
  playerId: string,
  loggedInId: string,
  strings: shape({}),
};

const mapStateToProps = state => ({
  loading: state.app.playerWinLoss.loading,
  error: state.app.player.error,
  wins: state.app.playerWinLoss.data.win,
  losses: state.app.playerWinLoss.data.lose,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(PlayerStatsCards);
