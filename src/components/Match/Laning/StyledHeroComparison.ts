/**
 * @file Styled Hero Comparison.
 * @description Custom hero-menu styling and compact comparison bars, values, and selection controls.
 */

import styled from "styled-components";
import { laningBorderColor } from "./StyledLaning";
import constants from "../../constants";

/** Presents hero identities and the metric lead in the chart tooltip. */
export const HeroComparisonTooltip = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  min-width: 220px;
  max-width: min(320px, calc(100vw - 48px));
  padding: 14px;
  border: 1px solid ${laningBorderColor};
  border-radius: 10px;
  background: ${constants.primarySurfaceColor};
  color: ${constants.textColorPrimary};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  line-height: 1.5;
  pointer-events: none;
  .tooltip-heading { display: flex; justify-content: space-between; gap: 16px; margin-bottom: 12px; font-weight: 600; }
  .tooltip-heading time { color: ${constants.textColorSecondary}; font-variant-numeric: tabular-nums; }
  .tooltip-player { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
  .tooltip-player img { border-radius: 4px; flex-shrink: 0; }
  .tooltip-identity { flex: 1; min-width: 0; overflow-wrap: anywhere; }
  .tooltip-identity small { display: block; color: ${constants.textColorSecondary}; }
  .tooltip-player > strong { font-variant-numeric: tabular-nums; white-space: nowrap; }
  .tooltip-lead { border-top: 1px solid ${laningBorderColor}; padding-top: 10px; margin-top: 12px; color: ${constants.textColorSecondary}; }
`;

/** Arranges opposing hero selectors in responsive columns. */
export const HeroMenus = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin: 20px 0;
  @media (max-width: 680px) { grid-template-columns: minmax(0, 1fr); }
`;
/** Groups a team label and its custom hero selector. */
export const HeroMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  font-size: 15px;
  color: ${constants.textColorSecondary};
`;

/** Styles the keyboard-accessible trigger for a custom hero menu. */
export const HeroSelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid ${laningBorderColor};
  border-radius: 8px;
  background: rgba(140, 110, 190, 0.12);
  color: ${constants.textColorPrimary};
  text-align: left;
  font: inherit;
  cursor: pointer;
  &:hover:not(:disabled) { border-color: ${constants.primaryLinkColor}; }
  &:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 2px; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

/** Aligns a hero icon, name, role, and player identity within menu entries. */
export const HeroOption = styled.span`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  flex: 1;
  img { border-radius: 4px; flex-shrink: 0; }
  > span { min-width: 0; }
  strong, small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  strong { font-size: 16px; font-weight: 600; }
  small { margin-top: 4px; color: ${constants.textColorSecondary}; font-size: 14px; }
`;

/** Displays the centered absolute difference, with muted ties. */
export const ComparisonLead = styled.span<{ $difference: number }>`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  padding: 3px 7px;
  font-weight: 600;
  white-space: nowrap;

  strong { font-size: 14px; font-weight: 700; }
  color: ${({ $difference }) => $difference === 0
    ? constants.textColorSecondary : constants.golden};
  &.comparison_level strong { color: ${constants.colorLavenderMuted}; }
  &.comparison_last_hits strong { color: ${constants.colorGreen}; }
  &.comparison_denies strong { color: ${constants.colorRed}; }
`;

/** Draws the proportional comparison track and its midpoint marker. */
export const MetricBalance = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  height: 8px;
  margin-top: 14px;
  overflow: hidden;
  border-radius: 4px;
  background: ${constants.dividerColor};

  /* Mark an even split so the stronger side is easy to spot. */
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: ${constants.primarySurfaceColor};
    transform: translateX(-50%);
  }
`;

/** Sizes and colors one team’s portion of a metric bar. */
export const MetricBalanceSide = styled.span<{ $radiant: boolean; $share: number }>`
  width: ${({ $share }) => $share}%;
  background: ${({ $radiant }) => $radiant ? constants.colorSuccess : constants.colorDanger};
  transition: width 200ms ease;

  @media (prefers-reduced-motion: reduce) { transition: none; }
`;

/** Stacks comparison metrics and their summary. */
export const MetricList = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: start;
  gap: 24px;
  margin-top: 14px;
  > div { min-width: 0; }
  .comparison-charts {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-auto-rows: 1fr;
    align-items: stretch;
    gap: 8px;
  }

  @media (max-width: 680px) { grid-template-columns: minmax(0, 1fr); }
`;

/** Provides a compact card for one comparison metric. */
export const MetricRow = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;
  padding: 8px 12px;
  border: 1px solid ${laningBorderColor};
  border-radius: 10px;
  background: rgba(140, 110, 190, 0.12);
  font-variant-numeric: tabular-nums;

  @media (max-width: 680px) { padding: 8px; }
`;

/** Centers the metric label above its values. */
export const MetricHeading = styled.div`
  text-align: center;
  h3 > svg, h3 > img { width: 16px; height: 16px; flex-shrink: 0; }
  .comparison_level svg { color: ${constants.colorBlue}; }
  .comparison_gold svg { color: ${constants.golden}; }
  .comparison_last_hits svg { color: ${constants.colorGreen}; }
  .comparison_denies svg { color: ${constants.colorRed}; }
  h3 { display: flex; align-items: center; justify-content: center; gap: 5px; margin: 0; font-family: ${constants.fontFamilyFuturistic}; font-size: 15px; font-weight: 600; }
`;

/** Places opposing values on either side of the centered difference. */
export const MetricValues = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  > span:first-child, > span:last-child { display: flex; flex-direction: column; gap: 2px; }
  > span:last-child { text-align: right; }
  small { color: ${constants.textColorSecondary}; font-size: 13px; }
  strong { font-size: 16px; font-weight: 600; }
`;

/** Aligns the persisted same-role switch and label. */
export const SameRoleToggle = styled.label`
  font-family: ${constants.fontFamilyFuturistic};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 12px;
  color: ${constants.textColorSecondary};
  font-size: 14px;
  cursor: pointer;
`;

/** Summarizes all metric differences beneath the comparison charts. */
export const MetricSummary = styled.div`
  font-family: ${constants.fontFamilyFuturistic};
  margin: 8px 0 0;
  color: ${constants.textColorSecondary};
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  ul { margin: 8px 0 0; padding-left: 20px; }
  li + li { margin-top: 8px; }
  .summary-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .summary-intro, .summary-item > span { line-height: 24px; }
  .summary-keyword, .summary-time, .summary-hero {
    height: 24px;
    line-height: 24px;
  }
  .summary-keyword {
    font-weight: 700;
    color: ${constants.colorWhite};
    display: inline-flex;
    align-items: center;
    gap: 4px;
    vertical-align: middle;
    svg, img { width: 16px; height: 16px; flex-shrink: 0; }
  }
  .summary-time svg { width: 16px; height: 16px; }
  .summary-time {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    vertical-align: middle;
    color: ${constants.textColorPrimary};
    font-variant-numeric: tabular-nums;
    svg { color: ${constants.colorBlue}; }
  }
  .comparison_level svg { color: ${constants.colorBlue}; }
  .comparison_gold svg { color: ${constants.golden}; }
  .comparison_last_hits svg { color: ${constants.colorGreen}; }
  .comparison_denies svg { color: ${constants.colorRed}; }
  .summary-hero {
    font-weight: 700;
    color: ${constants.colorWhite};
    display: inline-flex;
    align-items: center;
    gap: 3px;
    vertical-align: middle;
    img { border-radius: 3px; }
  }
`;
