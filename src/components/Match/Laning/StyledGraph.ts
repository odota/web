/**
 * @file Styled Graph.
 * @description Shared styling for chart filters, captions, tooltip sections, timestamp badges, and preference toggles.
 */

import React from "react";
import { StyledCustomizedTooltip } from "../../Visualizations/Graph/Styled";
import styles from "./StyledGraph.module.css";

/** Styles the hover tooltip frame and timestamp badge, allowing viewport-bounded scrolling. */
export const LaningTooltip: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement(StyledCustomizedTooltip, {
    className: `${styles.laningTooltip} laning-tooltip${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Groups related radio options with a visible legend. */
export const RoleFilter: React.FC<React.FieldsetHTMLAttributes<HTMLFieldSetElement>> = ({ className, ...props }) =>
  React.createElement("fieldset", {
    className: `${styles.roleFilter}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Styles wrapping radio choices and their selected, disabled, and focus states. */
export const RoleOptions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.roleOptions}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Displays compact supporting text beneath graph controls or charts. */
export const RoleCaption: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement("p", {
    className: `${styles.roleCaption}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Keeps the Levels summary subtle while highlighting its time, teams, and XP. */
export const LevelCaption: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement(RoleCaption, {
    className: `${styles.levelCaption}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Styles the focusable Liquipedia source link. */
export const LevelSourceLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ className, ...props }) =>
  React.createElement("a", {
    className: `${styles.levelSourceLink}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Places advantage information and hero values side by side. */
export const TooltipColumns: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.tooltipColumns}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Separates advantage details from hero values; the left variant reverses the divider. */
export const TooltipDifferences: React.FC<React.HTMLAttributes<HTMLDivElement> & { $left?: boolean }> = ({
  $left,
  className,
  ...props
}) =>
  React.createElement("div", {
    className: `${styles.tooltipDifferences}${$left ? ` ${styles.tooltipDifferencesLeft}` : ""}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Aligns a tooltip label with its numeric value. */
export const DifferenceRow: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    className: `${styles.differenceRow}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Colors signed advantages by their leading team, with neutral ties. */
export const DifferenceValue: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $difference: number }> = ({
  $difference,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.differenceValue}${
      $difference > 0
        ? ` ${styles.differenceValuePositive}`
        : $difference < 0
          ? ` ${styles.differenceValueNegative}`
          : ""
    }${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Displays a compact team-colored label. */
export const TeamIndicator: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $isRadiant: boolean }> = ({
  $isRadiant,
  className,
  ...props
}) =>
  React.createElement("span", {
    className: `${styles.teamIndicator} ${$isRadiant ? styles.teamIndicatorRadiant : styles.teamIndicatorDire}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Groups full-roster totals and their difference inside the tooltip. */
export const TooltipTeamTotals: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { $left?: boolean; $above?: boolean }
> = ({ $above, className, ...props }) =>
  React.createElement(TooltipDifferences, {
    className: `${styles.tooltipTeamTotals}${$above ? ` ${styles.tooltipTeamTotalsAbove}` : ""}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Aligns a tooltip preference switch with its label. */
export const TooltipTotalToggle: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) =>
  React.createElement("label", {
    className: `${styles.tooltipTotalToggle}${className ? ` ${className}` : ""}`,
    ...props,
  });

/** Styles the message shown when no players match the active filters. */
export const NoMatchingPlayers: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) =>
  React.createElement("p", {
    className: `${styles.noMatchingPlayers}${className ? ` ${className}` : ""}`,
    ...props,
  });
