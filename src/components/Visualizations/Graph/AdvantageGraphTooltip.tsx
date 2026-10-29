/**
 * @file Advantage Graph Tooltip.
 * @description Team gold and XP advantage tooltip with gold and XP colors, ties, and missing-data handling.
 */

import React from "react";
import TooltipMetricIcon from "./TooltipMetricIcon";
import constants from "../../constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useStrings from "../../../hooks/useStrings.hook";
import { LaningTooltip, DifferenceRow, DifferenceValue } from "../../Match/Laning/StyledGraph";

/** One minute of team advantages, calculated as Radiant totals minus Dire totals. */
type AdvantageSample = {
  /** Elapsed whole minutes since the match began. */
  time: number;
  /** Radiant's gold advantage; negative values indicate a Dire lead. */
  rGoldAdv?: number;
  /** Radiant's experience point (XP) advantage; negative values indicate a Dire lead. */
  rXpAdv?: number;
};
/** Hover state and shared team-advantage data supplied by Recharts. */
type AdvantageTooltipProps = {
  /** Whether the pointer is activating the chart tooltip. */
  active?: boolean;
  /** Series entries whose nested payload contains the original hovered sample. */
  payload?: { payload?: AdvantageSample }[];
};

/**
 * Displays Radiant's gold and experience point (XP) advantages at the hovered minute.
 * Positive values show a plus sign for a Radiant lead; negative values show a minus
 * sign for a Dire lead. Zero displays the localized tie message. Gold values are
 * yellow and XP values are blue, with the corresponding icon beside each value.
 * Each statistic independently displays the unavailable message when missing or non-finite.
 * @param props Component properties supplied by the chart.
 * @param props.active Whether the chart tooltip is currently active.
 * @param props.payload Recharts series entries. The first entry's nested payload
 * contains the hovered sample shared by the gold and XP series.
 * @returns A timestamp badge and advantage rows, or null when inactive, without a
 * sample, or when the sample's minute is not finite.
 */
const AdvantageGraphTooltip = ({ active, payload }: AdvantageTooltipProps) => {
  const strings = useStrings();
  const sample = payload?.[0]?.payload;
  if (!active || !sample || !Number.isFinite(sample.time)) return null;

  /** Statistics shown in the tooltip; each metric selects its unit icon and text color. */
  const metrics = [
    { label: strings.heading_graph_gold, value: sample.rGoldAdv, metric: "gold" },
    { label: strings.heading_graph_xp, value: sample.rXpAdv, metric: "xp" },
  ];
  return (
    <LaningTooltip>
      <div className="label"><AccessTimeIcon aria-hidden="true" />{sample.time}:00</div>
      {metrics.map(({ label, value, metric }) => (
        <DifferenceRow key={label} style={{ alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: constants.colorWhite }}>{label}</span>
          {!Number.isFinite(value) ? <span>{strings.laning_unavailable}</span> : (
            <DifferenceValue $difference={value!} style={{ color: metric === "gold" ? constants.colorGolden : constants.colorBlue }}>
              <TooltipMetricIcon metric={metric} />
              {value === 0 ? strings.laning_tied : (
                <>{value! > 0 ? "+" : "−"}{Math.abs(value!).toLocaleString("en-US")}</>
              )}
            </DifferenceValue>
          )}
        </DifferenceRow>
      ))}
    </LaningTooltip>
  );
};

export default AdvantageGraphTooltip;
