/**
 * @file Player Graph Tooltip.
 * @description Displays the hovered timestamp and hero values with statistic icons for player-history charts.
 */

import React from "react";
import TooltipMetricIcon from "./TooltipMetricIcon";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { heroes } from "dotaconstants";
import config from "../../../config";
import { LaningTooltip } from "../../Match/Laning/StyledGraph";

type TooltipEntry = { dataKey?: string | number; value?: number; color?: string };

/**
 * Displays hero values from highest to lowest at the hovered match timestamp.
 * Each row shows the hero portrait, statistic icon, and formatted value, with a
 * border matching the hero's graph line. Copies entries before sorting to avoid
 * mutating the data supplied by Recharts.
 * @param props Component properties, including hover data supplied by Recharts.
 * @param props.active Whether the chart tooltip is currently active.
 * @param props.label The hovered timestamp, formatted by the chart, such as "10:00".
 * @param props.payload Hovered series entries containing hero names, values, and line colors.
 * @param props.players The match roster used to identify each hero and their team.
 * @param props.metric The statistic measured by the graph, such as gold, XP,
 * last hits, hero damage, or healing. Selects the icon displayed beside each value.
 * @returns A timestamp badge and sorted hero rows, or null when inactive or without entries.
 */
const PlayerGraphTooltip = ({ active, label, payload, players, metric }: {
  active?: boolean;
  label?: string;
  payload?: TooltipEntry[];
  players: MatchPlayer[];
  metric: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <LaningTooltip>
      <div className="label"><AccessTimeIcon aria-hidden="true" />{label}</div>
      {payload.slice().sort((first, second) => (second.value ?? 0) - (first.value ?? 0)).map((entry) => {
        const player = players.find((player) => heroes[player.hero_id]?.localized_name === entry.dataKey);
        const hero = player && heroes[player.hero_id];
        return (
          <div
            key={entry.dataKey}
            className={`data ${player?.isRadiant ? "isRadiant" : "isDire"}`}
            style={{ borderLeft: `3px solid ${entry.color}` }}
          >
            {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt={hero.localized_name} width={28} height={28} style={{ verticalAlign: "middle", marginRight: 6 }} />}
            <TooltipMetricIcon metric={metric} />
            {entry.value?.toLocaleString("en-US")}
          </div>
        );
      })}
    </LaningTooltip>
  );
};

export default PlayerGraphTooltip;
