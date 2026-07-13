import React from "react";
import { LoadingOverlayUpper30 } from "../LoadingOverlay";

type PlayersSkeletonProps = {
  loadingText?: string;
};
const PlayersSkeleton = ({
  loadingText = "Loading...",
}: PlayersSkeletonProps) => <LoadingOverlayUpper30 text={loadingText} />;

export default PlayersSkeleton;
