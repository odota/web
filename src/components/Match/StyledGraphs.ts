/**
 * @file Styled Graphs.
 * @description Graph-page card and timeline styling, including event tooltips and milestone badges.
 */

import React from "react";
import { PageSection } from "./Laning/StyledLaning";
import styles from "./StyledGraphs.module.css";

/** Applies the Graphs page’s shared slate card border. */
export const GraphCard: React.FC<React.ComponentProps<typeof PageSection>> = ({
  className,
  ...props
}) =>
  React.createElement(PageSection, {
    ...props,
    className: `${styles.graphCard}${className ? ` ${className}` : ""}`,
  });

/** Styles timeline markers, event tooltips, and milestone badges within a graph card. */
export const TimelineCard: React.FC<React.ComponentProps<typeof GraphCard>> = ({
  className,
  ...props
}) =>
  React.createElement(GraphCard, {
    ...props,
    className: `${styles.timelineCard}${className ? ` ${className}` : ""}`,
  });
