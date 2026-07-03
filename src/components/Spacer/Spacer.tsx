import React from "react";

interface SpacerProps {
  variant?: "1" | "2" | "3";
}
const getHeight = (variant: SpacerProps["variant"]) => {
  switch (variant) {
    case "1":
      return 8;
    case "2":
      return 16;
    case "3":
      return 24;
    default:
      return 8;
  }
};
const Spacer = ({ variant }: SpacerProps) => {
  return <div style={{ height: getHeight(variant) }} />;
};

export { Spacer };
