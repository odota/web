/**
 * @file Styled.ts
 * @description Defines responsive Esports layouts, tournament cards, badges, statistics, and the shared photo banner.
 */

import styled from "styled-components";
import { Link } from "react-router-dom";
import constants from "../constants";

/**
 * Provides shared Esports typography and content spacing.
 * @example
 * <Hub>{pageContent}</Hub>
 */
export const Hub = styled.div`
  padding-bottom: 24px;
  font-family: ${constants.fontFamily};
  font-size: ${constants.fontSizeSmall};
  color: ${constants.textColorPrimary};

  h2 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeCommon};
    font-weight: ${constants.fontWeightNormal};
    line-height: 1.6;
    svg { width: 20px; height: 20px; flex-shrink: 0; }
  }

  p {
    color: ${constants.textColorSecondary};
    font-size: ${constants.fontSizeSmall};
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .MuiInputBase-root, .MuiInputLabel-root, .MuiButton-root {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
  }
`;

/**
 * Separates the section navigation from page content.
 * @example
 * <Intro><Navigation>{tabLinks}</Navigation></Intro>
 */
export const Intro = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid ${constants.dividerColor};
`;

/**
 * Displays responsive Esports navigation with active-route indicators.
 * @example
 * <Navigation aria-label="Esports"><Link to="/esports">Overview</Link></Navigation>
 */
export const Navigation = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 4px 16px;
  padding-top: 8px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 0;
    border-bottom: 2px solid transparent;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
    color: ${constants.textColorSecondary};
    svg { width: 16px; height: 16px; }
  }

  a:hover, a[aria-current="page"] {
    color: ${constants.primaryLinkColor};
    border-bottom-color: ${constants.primaryLinkColor};
    text-decoration: none;
  }

  a:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 3px; }
  a[href="/esports/tournaments"] svg { color: ${constants.colorGolden}; }
  a[href="/teams"] svg { color: ${constants.colorGreen}; }
  a[href="/esports/players"] svg { color: ${constants.colorBlue}; }
`;

/**
 * Arranges overview panels in two columns, stacking them on smaller screens.
 * @example
 * <Grid><Panel>{teams}</Panel><Panel>{heroes}</Panel></Grid>
 */
export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  @media (max-width: ${constants.wrapTablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
`;

/**
 * Groups an Esports section in a themed, responsive surface.
 * @example
 * <Panel aria-label="Recent series">{seriesTable}</Panel>
 */
export const Panel = styled.section`
  min-width: 0;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid ${constants.dividerColor};
  border-radius: 3px;
  background: ${constants.primarySurfaceColor};
  @media (max-width: ${constants.wrapMobile}) { padding: 12px; }
`;

/**
 * Aligns a section heading with its optional navigation action.
 * @example
 * <PanelHeader><h2>Tournaments</h2><Link to="/esports/tournaments">View all</Link></PanelHeader>
 */
export const PanelHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 12px;
  a {
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
    color: ${constants.primaryLinkColor};
  }
`;

/**
 * Lays out tournament cards in a responsive grid.
 * @example
 * <Cards>{tournamentCards}</Cards>
 */
export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: 12px;
`;

/**
 * Links to tournament details with a highlighted edge and compact identity.
 * @example
 * <TournamentCard to="/esports/leagues/19719"><strong>The International 2026</strong></TournamentCard>
 */
export const TournamentCard = styled(Link)`
  display: block;
  padding: 14px;
  border: 1px solid ${constants.dividerColor};
  border-left: 3px solid ${constants.colorGolden};
  border-radius: 3px;
  background: rgba(100, 160, 210, 0.08);
  color: ${constants.textColorPrimary};
  transition: border-color 150ms ease;

  &:hover {
    border-color: ${constants.colorGolden};
    color: ${constants.textColorPrimary};
    text-decoration: none;
  }
  &:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 3px; }
  > svg { width: 20px; height: 20px; color: ${constants.colorGolden}; }
  strong {
    display: block;
    margin: 8px 0;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeMedium};
    font-weight: ${constants.fontWeightNormal};
    line-height: 1.5;
    overflow-wrap: anywhere;
  }
  small {
    display: block;
    font-size: ${constants.fontSizeSmall};
    color: ${constants.textColorSecondary};
    margin-top: 10px;
  }
`;

/**
 * Displays a compact tier badge.
 * @param props.$premium Whether the default accent should indicate a premium tier.
 * @example
 * <TierBadge $premium>Premium</TierBadge>
 */
export const TierBadge = styled.span<{ $premium: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  border: 1px solid ${constants.dividerColor};
  border-radius: 3px;
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeSmall};
  color: ${({ $premium }) => $premium ? constants.colorGolden : constants.colorBlue};
  svg { width: 12px; height: 12px; }
`;

/**
 * Highlights a numeric statistic with a semantic accent.
 * @param props.$positive Whether to use the positive-value accent.
 * @example
 * <Metric $positive>65%</Metric>
 */
export const Metric = styled.span<{ $positive?: boolean }>`
  color: ${({ $positive }) => $positive ? constants.colorGreen : constants.colorBlue};
  font-variant-numeric: tabular-nums;
`;

/**
 * Aligns a team, hero, or player image with its display name.
 * @example
 * <Identity><TeamLogo teamId={8965331} /><span>Chandogs</span></Identity>
 */
export const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  img { width: 28px; height: 28px; object-fit: contain; flex-shrink: 0; }
  > svg { width: 24px; height: 24px; color: ${constants.colorGreen}; flex-shrink: 0; }
`;

/**
 * Displays compact counts for tournament series, matches, and teams.
 * @example
 * <Summary><div><strong>12</strong><span>Series</span></div></Summary>
 */
export const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  > div {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border: 1px solid ${constants.dividerColor};
    border-radius: 3px;
  }
  svg { width: 18px; height: 18px; color: ${constants.colorBlue}; }
  strong { color: ${constants.colorGolden}; font-size: ${constants.fontSizeCommon}; }
  span { color: ${constants.textColorSecondary}; }
`;

/**
 * Places the page heading over a responsive arena photograph and dark overlay.
 * @example
 * <PhotoBanner><Heading title="Esports" className="top-heading" /></PhotoBanner>
 */
export const PhotoBanner = styled.div`
  position: relative;
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid ${constants.dividerColor};
  border-radius: 4px;
  background-color: ${constants.almostBlack};
  background-image: linear-gradient(90deg, rgba(5, 10, 20, .9), rgba(5, 10, 20, .25)), url("/assets/images/esports-arena.jpg");
  background-size: cover;
  background-position: center 46%;

  .top-heading {
    position: relative;
    width: auto;
    min-height: 240px;
    margin: 0;
    left: auto;
    right: auto;
    padding: 32px 28px;
    justify-content: center;
    background: transparent;
    box-sizing: border-box;
  }
  .title { color: #fff; }
  .subtitle { max-width: 560px; margin: 10px 0 0; color: #e2e6ed; line-height: 1.7; }
  @media (max-width: ${constants.wrapMobile}) {
    .top-heading { min-height: 200px; padding: 24px 16px 40px; }
  }
`;
