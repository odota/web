import React from "react";
import styled from "styled-components";

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

const PiePercent = ({
  percent,
  color,
  negativeColor,
}: {
  percent: number;
  color: string;
  negativeColor: string;
}) => (
  <StyledSvg viewBox="0 0 32 32" style={{ color: negativeColor }}>
    <StyledCircle
      r="16"
      cx="16"
      cy="16"
      shapeRendering="crispEdges"
      style={{ strokeDasharray: `${percent} 100`, color }}
    />
  </StyledSvg>
);

export default PiePercent;
