/**
 * @file Styled.ts
 * @description Defines responsive Esports layouts, tournament cards, badges, statistics, and the shared photo banner.
 */

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Styled.module.css";

/**
 * Provides shared Esports typography and content spacing.
 * @example
 * <Hub>{pageContent}</Hub>
 */
export const Hub: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.hub}${className ? ` ${className}` : ""}`,
  });

/**
 * Separates the section navigation from page content.
 * @example
 * <Intro><Navigation>{tabLinks}</Navigation></Intro>
 */
export const Intro: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.intro}${className ? ` ${className}` : ""}`,
  });

/**
 * Displays responsive Esports navigation with active-route indicators.
 * @example
 * <Navigation aria-label="Esports"><Link to="/esports">Overview</Link></Navigation>
 */
export const Navigation: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("nav", {
    ...props,
    className: `${styles.navigation}${className ? ` ${className}` : ""}`,
  });

/**
 * Arranges overview panels in two columns, stacking them on smaller screens.
 * @example
 * <Grid><Panel>{teams}</Panel><Panel>{heroes}</Panel></Grid>
 */
export const Grid: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.grid}${className ? ` ${className}` : ""}`,
  });

/**
 * Groups an Esports section in a themed, responsive surface.
 * @example
 * <Panel aria-label="Recent series">{seriesTable}</Panel>
 */
export const Panel: React.FC<React.HTMLAttributes<HTMLElement>> = ({ className, ...props }) =>
  React.createElement("section", {
    ...props,
    className: `${styles.panel}${className ? ` ${className}` : ""}`,
  });

/**
 * Aligns a section heading with its optional navigation action.
 * @example
 * <PanelHeader><h2>Tournaments</h2><Link to="/esports/tournaments">View all</Link></PanelHeader>
 */
export const PanelHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.panelHeader}${className ? ` ${className}` : ""}`,
  });

/**
 * Lays out tournament cards in a responsive grid.
 * @example
 * <Cards>{tournamentCards}</Cards>
 */
export const Cards: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.cards}${className ? ` ${className}` : ""}`,
  });

/**
 * Links to tournament details with a highlighted edge and compact identity.
 * @example
 * <TournamentCard to="/esports/leagues/19719"><strong>The International 2026</strong></TournamentCard>
 */
export const TournamentCard: React.FC<React.ComponentProps<typeof Link>> = ({ className, ...props }) =>
  React.createElement(Link, {
    ...props,
    className: `${styles.tournamentCard}${className ? ` ${className}` : ""}`,
  });

/**
 * Displays a compact tier badge.
 * @param props.$premium Whether the default accent should indicate a premium tier.
 * @example
 * <TierBadge $premium>Premium</TierBadge>
 */
export const TierBadge: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $premium: boolean }> = ({
  $premium,
  className,
  ...props
}) =>
  React.createElement("span", {
    ...props,
    className: `${styles.tierBadge}${$premium ? ` ${styles.tierBadgePremium}` : ""}${className ? ` ${className}` : ""}`,
  });

/**
 * Highlights a numeric statistic with a semantic accent.
 * @param props.$positive Whether to use the positive-value accent.
 * @example
 * <Metric $positive>65%</Metric>
 */
export const Metric: React.FC<React.HTMLAttributes<HTMLSpanElement> & { $positive?: boolean }> = ({
  $positive,
  className,
  ...props
}) =>
  React.createElement("span", {
    ...props,
    className: `${styles.metric}${$positive ? ` ${styles.metricPositive}` : ""}${className ? ` ${className}` : ""}`,
  });

/**
 * Aligns a team, hero, or player image with its display name.
 * @example
 * <Identity><TeamLogo teamId={8965331} /><span>Chandogs</span></Identity>
 */
export const Identity: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.identity}${className ? ` ${className}` : ""}`,
  });

/**
 * Displays compact counts for tournament series, matches, and teams.
 * @example
 * <Summary><div><strong>12</strong><span>Series</span></div></Summary>
 */
export const Summary: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.summary}${className ? ` ${className}` : ""}`,
  });

/**
 * Places the page heading over a responsive arena photograph and dark overlay.
 * @example
 * <PhotoBanner><Heading title="Esports" className="top-heading" /></PhotoBanner>
 */
export const PhotoBanner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) =>
  React.createElement("div", {
    ...props,
    className: `${styles.photoBanner}${className ? ` ${className}` : ""}`,
  });
