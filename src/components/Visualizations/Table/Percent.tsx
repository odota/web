import React from 'react';
import { gradient } from 'abcolor';
import { StyledContainer, PercentContainer, TitleContainer } from './Styled';
import constants from '../../constants';

const Percent = ({
  percent,
  altValue,
  valEl,
  inverse = false,
}: {
  percent: number;
  altValue?: number;
  valEl?: React.ReactNode;
  inverse?: boolean;
}) => (
  <StyledContainer>
    <TitleContainer>
      {valEl || percent} {altValue && <small>{altValue}</small>}
    </TitleContainer>
    <PercentContainer>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: gradient(percent, {
            css: true,
            from: inverse ? constants.colorGreen : constants.colorRed,
            to: inverse ? constants.colorRed : constants.colorGreen,
          }),
        }}
      />
    </PercentContainer>
  </StyledContainer>
);

export default Percent;
