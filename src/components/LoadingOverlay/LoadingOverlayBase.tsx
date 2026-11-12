import React from "react";
import Spinner from "../Spinner/Spinner";

interface LoadingOverlayBaseProps {
  text?: string;
  textSize?: number;
  paddingTop?: string;
  alignItems?: "center" | "flex-start" | "flex-end";
}

const LoadingOverlayBase: React.FC<LoadingOverlayBaseProps> = ({
  text,
  textSize,
  paddingTop = "30%",
  alignItems = "flex-start",
}) => (
  <div
    style={{
      height: "100vh",
      paddingTop,
      display: "flex",
      alignItems,
      justifyContent: "center",
    }}
  >
    <Spinner text={text} textSize={textSize} />
  </div>
);

export { LoadingOverlayBase };
