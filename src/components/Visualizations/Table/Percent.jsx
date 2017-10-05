import React from 'react';
import PropTypes from 'prop-types';
import { gradient } from 'abcolor';
import { StyledContainer, PercentContainer, TitleContainer } from './Styled';
import constants from '../../constants';

const Percent = ({ percent, altValue, valEl }) => (
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
            from: constants.colorRed,
            to: constants.colorGreen,
          }),
        }}
      />
    </PercentContainer>
  </StyledContainer>
);

const { number, oneOfType, string, node, bool } = PropTypes;

Percent.propTypes = {
  percent: oneOfType([
    number,
    bool,
  ]),
  altValue: oneOfType([
    string,
    number,
    bool,
  ]),
  valEl: node,
};

export default Percent;
