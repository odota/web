import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import styled from "styled-components";

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

const Spinner = ({ size = 32, text }: { size?: number; text?: string }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <SlowSpinner size={Math.max(size, 4)} color="primary" thickness={2} />
      {text && (
        <span
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.05em",
            color: "#6bf",
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Spinner;
