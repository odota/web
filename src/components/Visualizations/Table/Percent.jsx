import React from 'react';
import PropTypes from 'prop-types';
import { gradient } from 'abcolor';
import { StyledContainer, PercentContainer, TitleContainer } from './Styled';
import constants from '../../constants';

const Percent = ({
  percent, altValue, valEl, inverse = false,
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

const {
  number, oneOfType, string, node, bool,
} = PropTypes;

Percent.propTypes = {
  percent: oneOfType([number, bool]),
  altValue: oneOfType([string, number, bool]),
  valEl: node,
  inverse: bool,
};

Percent.tdStyle = {
  paddingTop: 12,
  paddingBottom: 12,
};

export default Percent;
