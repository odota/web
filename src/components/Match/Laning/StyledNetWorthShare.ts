/**
 * @file Styled Net Worth Share.
 * @description Team share cards, stacked bars, hero lists, and segment tooltip styling.
 */

import React from "react";
import styles from "./StyledNetWorthShare.module.css";

/** Arranges net worth share cards in responsive team columns. */
export const Teams: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.teams}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Styles a team’s stacked bar, total, and hero legend. */
export const Team: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    className: `${styles.team}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Truncates long player names in the net worth share list. */
export const HeroName: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) =>
  React.createElement("span", {
    className: `${styles.heroName}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Highlights gold values within the share card and tooltip. */
export const GoldValue: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) =>
  React.createElement("span", {
    className: `${styles.goldValue} gold-value${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Connects a legend entry to its player-slot segment color. */
export const ColorMarker: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $color: string }> = ({
  $color,
  style,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.colorMarker}${className ? ` ${className}` : ""}`,
    style: { background: $color, ...style },
    ...props,
  });

/** Emphasizes the combined team net worth above the stacked bar. */
export const TeamTotal: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement("p", {
    className: `${styles.teamTotal}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Stacks player identity above hero and role text. */
export const HeroDetails: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heroDetails}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides subdued hero and role metadata. */
export const HeroRole: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) =>
  React.createElement("span", {
    className: `${styles.heroRole}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Contains the team’s proportional net worth segments. */
export const StackedBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.stackedBar}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Sizes a hero’s team-share segment and styles hover and keyboard focus. */
export const ShareSegment: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { $color: string; $percentage: number }
> = ({ $color, $percentage, style, className, ...props }) =>
  React.createElement("div", {
    className: `${styles.shareSegment}${className ? ` ${className}` : ""}`,
    style: { flex: `0 0 ${$percentage}%`, background: $color, ...style },
    ...props,
  });

/** Displays muted context and unavailable-data messages. */
export const Note: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement("p", {
    className: `${styles.note}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides spacing and typography for a segment tooltip. */
export const ShareTooltipContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.shareTooltipContent}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Aligns the hero icon with its name and role. */
export const ShareTooltipHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.shareTooltipHeader}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Separates highlighted gold and team-share values from the tooltip header. */
export const ShareTooltipStats: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.shareTooltipStats}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Displays the leading team’s gold advantage beside its name. */
export const TeamDifference: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $difference: number }> = ({
  $difference,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.teamDifference}${
      $difference > 0
        ? ` ${styles.teamDifferencePositive}`
        : $difference < 0
          ? ` ${styles.teamDifferenceNegative}`
          : ""
    }${className ? ` ${className}` : ""}`,
    ...props,
  });
