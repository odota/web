import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";
import constants from "../constants";

const SlowSpinner = styled(CircularProgress)`
  animation: spin 5s linear infinite !important;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const SpinnerText = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.05em;
  color: ${constants.colorBlue};
`;

const Spinner = ({
  size = 32,
  text,
}: {
  size?: number;
  text?: string;
  enableTrackSlot?: boolean;
}) => {
  return (
    <SpinnerContainer>
      <SlowSpinner
        size={Math.max(size, 4)}
        color="primary"
        thickness={2}
        enableTrackSlot
      />
      {text && <SpinnerText>{text}</SpinnerText>}
    </SpinnerContainer>
  );
};

export default Spinner;
