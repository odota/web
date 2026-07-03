import React from "react";
import { LoadingOverlayUpper30 } from "../LoadingOverlay";

const TableSkeleton = ({ text = "Loading..." }: { text?: string }) => (
  <LoadingOverlayUpper30 text={text} />
);

export default TableSkeleton;
