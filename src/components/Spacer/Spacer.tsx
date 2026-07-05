import constants from "../constants";

import React from "react";

interface SpacerProps {
  variant?: "1" | "2" | "3";
}
const getHeight = (variant: SpacerProps["variant"]) => {
  switch (variant) {
    case "1":
      return constants.verticalSpaceSmall;
    case "2":
      return constants.verticalSpaceMedium;
    case "3":
      return constants.verticalSpaceLarge;
    default:
      return constants.verticalSpaceSmall;
  }
};
const Spacer = ({ variant }: SpacerProps) => {
  return <div style={{ height: getHeight(variant) }} />;
};

export { Spacer };
