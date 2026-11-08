import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import LayersIcon from "@mui/icons-material/Layers";
import constants from "../../constants";

const tooltipIconStyle: React.CSSProperties = {
  verticalAlign: "middle",
  marginRight: 4,
  width: 16,
  height: 16,
};

/** Gold icon. */
const GoldIcon = () => <img src="/assets/images/dota2/gold.png" alt="" style={tooltipIconStyle} />;

/** Experience icon. */
const ExperienceIcon = () => <TrendingUpIcon aria-hidden="true" style={{ ...tooltipIconStyle, color: constants.colorBlue }} />;

/** Last hits icon. */
const LastHitsIcon = () => <GpsFixedIcon aria-hidden="true" style={{ ...tooltipIconStyle, color: constants.colorGolden }} />;

/** Hero damage icon — single sword. */
const HeroDamageIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" style={{ ...tooltipIconStyle, fill: constants.colorRed }}>
    <path d="M21 3v6L11 19l-2-2L5 21l-2-2 4-4-2-2 2-2 2 2L19 3h2Zm-2 3L10 15l1 1 8-8V6Z" />
  </svg>
);

/** Hero healing icon — heart with medical cross. */
const HeroHealingIcon = () => (
  <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" style={{ ...tooltipIconStyle, color: constants.colorGreen }}>
    <path fill="currentColor" d="M12 21 3.5 12.7C-2 7.3 5.8-.8 12 5.4 18.2-.8 26 7.3 20.5 12.7Z" />
    <path fill="#052e16" stroke="#052e16" strokeWidth="0.8" strokeLinejoin="round" d="M11.15 8.4v2.75H8.4v1.7h2.75v2.75h1.7v-2.75h2.75v-1.7h-2.75V8.4Z" />
  </svg>
);

/** Camps stacked icon. */
const CampsStackedIcon = () => <LayersIcon aria-hidden="true" style={{ ...tooltipIconStyle, color: constants.colorLavenderMuted }} />;

/**
 * Displays the unit icon immediately before a graph tooltip value.
 * @param props Component properties.
 * @param props.metric The statistic measured by the graph, such as gold, XP,
 * hero damage, or healing. Selects the corresponding icon; unknown statistics
 * render no icon.
 * @returns The icon for the measured statistic, or null when unsupported.
 */
const TooltipMetricIcon = ({ metric }: { metric: string }) => {
  if (metric === "networth" || metric === "gold") {
    return <GoldIcon />;
  }
  if (metric === "levels" || metric === "xp") {
    return <ExperienceIcon />;
  }
  if (metric === "lh") {
    return <LastHitsIcon />;
  }
  if (metric === "hero_damage") {
    return <HeroDamageIcon />;
  }
  if (metric === "hero_healing") {
    return <HeroHealingIcon />;
  }
  if (metric === "camps_stacked") {
    return <CampsStackedIcon />;
  }
  return null;
};

export default TooltipMetricIcon;
