import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import constants from "../../constants";

/** Shows the lead over the following row; the last row and ties have no gap. */
const TooltipEntryGap = ({ value, nextValue }: { value?: number; nextValue?: number }) => {
  if (typeof value !== "number" || !Number.isFinite(value) || typeof nextValue !== "number" || !Number.isFinite(nextValue)) return null;
  const gap = value - nextValue;
  if (gap <= 0) return null;
  return (
    <span style={{ marginLeft: 10, color: constants.colorGreen, fontSize: "0.8em", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
      <ArrowDropUpIcon aria-label="ahead by" style={{ width: 16, height: 16, verticalAlign: "middle", color: constants.colorGreen }} />
      {gap.toLocaleString("en-US")}
    </span>
  );
};

export default TooltipEntryGap;
