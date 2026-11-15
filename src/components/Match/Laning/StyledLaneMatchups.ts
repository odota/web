/**
 * @file Styled Lane Matchups.
 * @description Responsive lane matchup and selectable player-card styling used by alternative laning layouts.
 */

import React from "react";
import styles from "./StyledLaneMatchups.module.css";

/** Separates physical-lane matchup groups. */
export const Matchup: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    className: `${styles.matchup}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Arranges opposing players side by side, stacking on mobile. */
export const Sides: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.sides}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Groups a team heading and its lane player cards. */
export const Side: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.side}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Highlights the selected player’s card for heatmap control. */
export const PlayerCard: React.FC<React.HTMLAttributes<HTMLDivElement> & { $selected: boolean }> = ({
  $selected,
  className,
  ...props
}) =>
  React.createElement("div", {
    className: `${styles.playerCard}${$selected ? ` ${styles.playerCardSelected}` : ""}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides the selectable radio label and player identity. */
export const PlayerHeader: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) =>
  React.createElement("label", {
    className: `${styles.playerHeader}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Lays out compact player statistics. */
export const Stats: React.FC<React.HTMLAttributes<HTMLDListElement>> = ({ className, ...props }) =>
  React.createElement("dl", {
    className: `${styles.stats}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Labels the player’s creep-score sparkline. */
export const Trend: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.trend}${className ? ` ${className}` : ""}`,
    ...props,
  });
