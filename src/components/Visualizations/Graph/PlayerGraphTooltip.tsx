/**
 * @file Player Graph Tooltip.
 * @description Compact timestamp and sorted hero-value tooltip for player-history charts.
 */

import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { heroes } from "dotaconstants";
import config from "../../../config";
import { LaningTooltip } from "../../Match/Laning/StyledGraph";

type TooltipEntry = { dataKey?: string | number; value?: number; color?: string };

/**
 * Renders sorted hero values for full-match player graphs using the shared tooltip style.
 * Copies the payload before sorting so Recharts data is not mutated.
 * @param props Recharts hover state and entries, plus the full roster for hero lookup.
 * @returns A timestamp badge and hero rows, or null while the tooltip is inactive.
 */
const PlayerGraphTooltip = ({ active, label, payload, players }: {
  active?: boolean;
  label?: string;
  payload?: TooltipEntry[];
  players: MatchPlayer[];
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
            {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt={hero.localized_name} width={18} height={18} style={{ verticalAlign: "middle", marginRight: 6 }} />}
            {entry.value?.toLocaleString("en-US")}
          </div>
        );
      })}
    </LaningTooltip>
  );
};

export default PlayerGraphTooltip;
