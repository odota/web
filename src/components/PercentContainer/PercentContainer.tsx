import React from 'react';
import { LinearProgress } from '@mui/material';
import styled from 'styled-components';
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
const PercentContainer = ({
  wins,
  games,
  percent,
}: {
  wins: number;
  games: number;
  percent: number;
}) => (
  <StyledPercentContainer>
    <StyledTextContainer>
      {percent || getPercentWin(wins, games).toFixed(1)}
    </StyledTextContainer>
    <LinearProgress
      style={{ height: 5 }}
      // color={styles.lineColor}
      variant="determinate"
      value={percent || getPercentWin(wins, games)}
      color="warning"
    />
  </StyledPercentContainer>
);
