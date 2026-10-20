/**
 * @file Advantage Graph Tooltip.
 * @description Team gold and XP advantage tooltip with signed-lead colors, ties, and missing-data handling.
 */

import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import constants from "../../constants";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useStrings from "../../../hooks/useStrings.hook";
import { LaningTooltip, DifferenceRow, DifferenceValue } from "../../Match/Laning/StyledGraph";

type AdvantageSample = { time: number; rGoldAdv?: number; rXpAdv?: number };
type AdvantageTooltipProps = {
  active?: boolean;
  payload?: { payload?: AdvantageSample }[];
};

/**
 * Displays gold and XP advantages at the hovered minute.
 * Positive values favor Radiant, negative values favor Dire, and zero is a tie.
 * Each metric handles missing data independently.
 * @param props Recharts hover state and the underlying advantage sample.
 * @returns Formatted advantage rows, or null when inactive or without a valid timestamp.
 */
const AdvantageGraphTooltip = ({ active, payload }: AdvantageTooltipProps) => {
  const strings = useStrings();
  const sample = payload?.[0]?.payload;
  if (!active || !sample || !Number.isFinite(sample.time)) return null;

  const metrics = [
    { label: strings.heading_graph_gold, value: sample.rGoldAdv, icon: <img src="/assets/images/dota2/gold.png" alt="" width={16} height={16} /> },
    { label: strings.heading_graph_xp, value: sample.rXpAdv, icon: <TrendingUpIcon aria-hidden="true" style={{ fontSize: 16, color: constants.colorBlue }} /> },
  ];
  return (
    <LaningTooltip>
      <div className="label"><AccessTimeIcon aria-hidden="true" />{sample.time}:00</div>
      {metrics.map(({ label, value, icon }) => (
        <DifferenceRow key={label} style={{ alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: constants.colorWhite }}>{icon}{label}</span>
          {!Number.isFinite(value) ? <span>{strings.laning_unavailable}</span> : (
            <DifferenceValue $difference={value!}>
              {value === 0 ? strings.laning_tied : (
                <>+{Math.abs(value!).toLocaleString("en-US")}</>
              )}
            </DifferenceValue>
          )}
        </DifferenceRow>
      ))}
    </LaningTooltip>
  );
};

export default AdvantageGraphTooltip;
