/**
 * @file Hero Legend Label.
 * @description Reusable hero-icon labels for match-chart legends.
 */

import React from "react";
import { heroes } from "dotaconstants";
import config from "../../../config";

/**
 * Renders a compact hero icon and name for match-chart legends.
 * @param props The series name and player roster used to resolve its hero icon.
 * @returns A legend label; unknown heroes retain their series text without an icon.
 */
const HeroLegendLabel = ({ name, players }: { name: string; players: MatchPlayer[] }) => {
  const player = players.find((entry) => heroes[entry.hero_id]?.localized_name === name);
  const hero = player && heroes[player.hero_id];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, verticalAlign: "middle" }}>
      {hero && <img src={config.VITE_IMAGE_CDN + hero.icon} alt="" width={18} height={18} />}
      {name}
    </span>
  );
};

export default HeroLegendLabel;
