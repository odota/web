/**
 * @file Styled Hero Comparison.
 * @description Custom hero-menu styling and compact comparison bars, values, and selection controls.
 */

import React from "react";
import styles from "./StyledHeroComparison.module.css";

/** Presents hero identities and the metric lead in the chart tooltip. */
export const HeroComparisonTooltip: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heroComparisonTooltip}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Arranges opposing hero selectors in responsive columns. */
export const HeroMenus: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heroMenus}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Groups a team label and its custom hero selector. */
export const HeroMenu: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.heroMenu}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Styles the keyboard-accessible trigger for a custom hero menu. */
export const HeroSelectButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) =>
  React.createElement("button", {
    className: `${styles.heroSelectButton}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Aligns a hero icon, name, role, and player identity within menu entries. */
export const HeroOption: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ className, ...props }) =>
  React.createElement("span", {
    className: `${styles.heroOption}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Displays the centered absolute difference, with muted ties. */
export const ComparisonLead: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $difference: number }> = ({
  $difference,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.comparisonLead}${$difference === 0 ? ` ${styles.comparisonLeadTied}` : ""}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Draws the proportional comparison track and its midpoint marker. */
export const MetricBalance: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.metricBalance}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Sizes and colors one team’s portion of a metric bar. */
export const MetricBalanceSide: React.FC<
  React.HTMLAttributes<HTMLSpanElement> & { $radiant: boolean; $share: number }
> = ({ $radiant, $share, style, className, ...props }) =>
  React.createElement("span", {
    className: `${styles.metricBalanceSide} ${$radiant ? styles.metricBalanceSideRadiant : styles.metricBalanceSideDire}${className ? ` ${className}` : ""}`,
    style: { width: `${$share}%`, ...style },
    ...props,
  });

/** Stacks comparison metrics and their summary. */
export const MetricList: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.metricList}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Provides a compact card for one comparison metric. */
export const MetricRow: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    className: `${styles.metricRow}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Centers the metric label above its values. */
export const MetricHeading: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.metricHeading}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Places opposing values on either side of the centered difference. */
export const MetricValues: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.metricValues}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Aligns the persisted same-role switch and label. */
export const SameRoleToggle: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) =>
  React.createElement("label", {
    className: `${styles.sameRoleToggle}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Summarizes all metric differences beneath the comparison charts. */
export const MetricSummary: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.metricSummary}${className ? ` ${className}` : ""}`,
    ...props,
  });
