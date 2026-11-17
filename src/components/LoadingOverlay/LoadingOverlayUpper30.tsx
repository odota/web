import React from "react";
import { LoadingOverlayBase } from "./LoadingOverlayBase";

interface LoadingOverlayUpper30Props {
  text?: string;
}

const LoadingOverlayUpper30: React.FC<LoadingOverlayUpper30Props> = ({
  text,
}) => <LoadingOverlayBase text={text} paddingTop="15%" />;

export { LoadingOverlayUpper30 };
