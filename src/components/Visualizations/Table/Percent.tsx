import React from "react";
import constants from "../../constants";
import { StyledContainer, PercentContainer, TitleContainer } from "./Styled";

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
}) => {
  const from = inverse ? constants.colorGreen : constants.colorRed;
  const to = inverse ? constants.colorRed : constants.colorGreen;
  return (
    <StyledContainer>
      <TitleContainer>
        {valEl || percent} {altValue && <small>{altValue}</small>}
      </TitleContainer>
      <PercentContainer>
        <div
          style={{
            width: `${percent}%`,
            // Interpolating in hsl matches what abcolor's gradient did, and
            // color-mix resolves custom properties so the colors can stay in
            // constants instead of being hardcoded here.
            backgroundColor: `color-mix(in hsl, ${to} ${percent}%, ${from})`,
          }}
        />
      </PercentContainer>
    </StyledContainer>
  );
};

export default Percent;
