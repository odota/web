import React from "react";
import { gradient } from "abcolor";
import { StyledContainer, PercentContainer, TitleContainer } from "./Styled";

const colorGreen = "#66BB6A";
const colorRed = "#ff4c4c";

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
            from: inverse ? colorGreen : colorRed,
            to: inverse ? colorRed : colorGreen,
          }),
        }}
      />
    </PercentContainer>
  </StyledContainer>
);

export default Percent;
