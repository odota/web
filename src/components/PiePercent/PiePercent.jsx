import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  width: 32px;
  height: 32px;
  transform: rotate(-90deg);
  border-radius: 50%;
`;

const StyledCircle = styled.circle`
  fill: var(--primaryTextColor);
  stroke: var(--colorYelor);
  stroke-width: 32;
  stroke-dasharray: 38 100;
`;

const PiePercent = ({ percent, color, negativeColor }) => (
  <StyledSvg viewBox="0 0 32 32" styles={{ color: negativeColor }}>
    <StyledCircle
      r="16"
      cx="16"
      cy="16"
      shapeRendering="crispEdges"
      style={{ strokeDasharray: `${percent} 100`, color }}
    />
  </StyledSvg>
);

PiePercent.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
  negativeColor: PropTypes.string,
};

export default PiePercent;
