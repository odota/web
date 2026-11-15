/**
 * @file Styled Laning.
 * @description Page cards, summary layouts, dividers, breakdown sections, and heatmap positioning for the Laning page.
 */

import React from "react";
import styles from "./StyledLaning.module.css";

export const laningBorderColor = "rgba(100, 116, 139, 0.3)";

/** Stacks page sections with consistent spacing. */
export const LaningPage: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.laningPage}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides the shared responsive card surface and slate border. */
export const PageSection: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    className: `${styles.pageSection}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Lays out team totals and the advantage, optionally placing a Dire lead first. */
export const SummaryStats: React.FC<
  React.HTMLAttributes<HTMLDListElement> & { $metric: "gold" | "levels"; $advantageFirst?: boolean }
> = ({ $metric, $advantageFirst, className, ...props }) =>
  React.createElement("dl", {
    className: `${styles.summaryStats} ${$metric === "gold" ? styles.summaryStatsGold : styles.summaryStatsLevels}${$advantageFirst ? ` ${styles.summaryStatsAdvantageFirst}` : ""}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Centers the selected player’s heatmap in its card. */
export const HeatmapContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heatmapContainer}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Displays muted explanatory text below controls or statistics. */
export const TableCaption: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement("p", {
    className: `${styles.tableCaption}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Highlights the laning result with a blue-tinted surface and team-colored edge. */
export const SummaryResult: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { $winner: "radiant" | "dire" | "tie" }
> = ({ $winner, className, ...props }) =>
  React.createElement("div", {
    className: `${styles.summaryResult} ${
      $winner === "radiant"
        ? styles.summaryResultRadiant
        : $winner === "dire"
          ? styles.summaryResultDire
          : styles.summaryResultTie
    }${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides the collapsed-by-default detailed summary container. */
export const SummaryBreakdown: React.FC<React.DetailsHTMLAttributes<HTMLDetailsElement>> = ({ className, ...props }) =>
  React.createElement("details", {
    className: `${styles.summaryBreakdown}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Separates level-six timing comparisons from the team totals. */
export const UltimateSummary: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    className: `${styles.ultimateSummary}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Keeps team crests and names aligned throughout the summary. */
export const SummaryTeam: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $radiant: boolean }> = ({
  $radiant,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.summaryTeam} ${$radiant ? styles.summaryTeamRadiant : styles.summaryTeamDire}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Highlights combined levels with the experience accent. */
export const SummaryLevels: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) =>
  React.createElement("span", {
    className: `${styles.summaryLevels}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Player selection beside the laning map. */
export const HeatmapPlayers: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heatmapPlayers}${className ? ` ${className}` : ""}`,
    ...props,
  });

export const ReplaySummary: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.replaySummary}${className ? ` ${className}` : ""}`,
    ...props,
  });
