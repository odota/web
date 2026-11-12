import React from "react";
import { LoadingOverlayBase } from "./LoadingOverlayBase";

interface LoadingOverlayUpper30Props {
  text?: string;
  textSize?: number;
}

const LoadingOverlayUpper30: React.FC<LoadingOverlayUpper30Props> = ({
  text,
  textSize,
}) => <LoadingOverlayBase text={text} textSize={textSize} paddingTop="15%" />;

export { LoadingOverlayUpper30 };
