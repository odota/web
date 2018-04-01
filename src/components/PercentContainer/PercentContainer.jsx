import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';
import styled from 'styled-components';
// import PiePercent from '../../PiePercent';
import { getPercentWin } from '../../utility';
import constants from '../constants';
// const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

const StyledPercentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledTextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
`;

// the LinearProgress can be swapped for PiePercent if it turns out people prefer that
const PercentContainer = ({ wins, games, percent }) => (
  <StyledPercentContainer>
    <StyledTextContainer>{percent || getPercentWin(wins, games).toFixed(1)}</StyledTextContainer>
    <LinearProgress
      style={{ height: 5 }}
      // color={styles.lineColor}
      mode="determinate"
      value={percent || getPercentWin(wins, games)}
      color={constants.colorYelor}
    />
  </StyledPercentContainer>
);

PercentContainer.propTypes = {
  wins: PropTypes.number,
  games: PropTypes.number,
  percent: PropTypes.number,
};
