import React from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import constants from "../../constants";

/** Shows the lead over the following row; the last row and ties have no gap. */
const TooltipEntryGap = ({ value, nextValue }: { value?: number; nextValue?: number }) => {
  if (typeof value !== "number" || !Number.isFinite(value) || typeof nextValue !== "number" || !Number.isFinite(nextValue)) return null;
  const gap = value - nextValue;
  if (gap <= 0) return null;
  return <LeadValue style={{ marginLeft: 10 }}>{gap.toLocaleString("en-US")}</LeadValue>;
};

/** Shared compact styling for positive leads in graphs and laning comparisons. */
export const LeadValue = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{ color: constants.colorGreen, fontSize: "0.8em", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", ...style }}>
    <ArrowDropUpIcon aria-label="ahead by" style={{ width: 16, height: 16, verticalAlign: "middle", color: constants.colorGreen }} />
    {children}
  </span>
);

export default TooltipEntryGap;
