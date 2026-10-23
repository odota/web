/**
 * @file Styled Laning.
 * @description Page cards, summary layouts, dividers, breakdown sections, and heatmap positioning for the Laning page.
 */

import styled from "styled-components";
import { StyledCustomizedTooltip } from "../../Visualizations/Graph/Styled";
import constants from "../../constants";

export const laningBorderColor = "rgba(100, 116, 139, 0.3)";

/** Stacks page sections with consistent spacing. */
export const LaningPage = styled.div`
  ${StyledCustomizedTooltip} { font-size: 16px; }
  ${StyledCustomizedTooltip} div, ${StyledCustomizedTooltip} span,
  ${StyledCustomizedTooltip} strong, ${StyledCustomizedTooltip} small,
  ${StyledCustomizedTooltip} p { font-size: inherit; }
  ${StyledCustomizedTooltip} .label { font-size: 14px; }
  .laning-chart-section, .laning-chart-section * { font-family: ${constants.fontFamilyFuturistic}; }

  display: flex;
  flex-direction: column;
  gap: 24px;
  min-width: 0;
`;

/** Provides the shared responsive card surface and slate border. */
export const PageSection = styled.section`
  .laning-heading .subtitle svg { 
    width: 14px !important;
    height: 14px !important;
  }
  min-width: 0;
  padding: 20px;
  border: 1px solid ${laningBorderColor};
  border-radius: 10px;
  background: ${constants.primarySurfaceColor};

  @media (max-width: 680px) {
    padding: 12px;
  }
`;

/** Lays out team totals and the advantage, optionally placing a Dire lead first. */
export const SummaryStats = styled.dl<{ $metric: "gold" | "levels"; $advantageFirst?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
  margin: 16px 0 0;

  > div:last-child { order: ${({ $advantageFirst }) => $advantageFirst ? -1 : 0}; }

  dt {
    display: flex;
    align-items: center;
    gap: 5px;
    min-height: 24px;
    margin-bottom: 6px;
    color: ${constants.textColorSecondary};
    font-size: 12px;
  }

  dd {
    display: flex;
    align-items: center;
    gap: 5px;
    > svg, > img { width: 16px; height: 16px; flex-shrink: 0; }
    color: ${({ $metric }) => $metric === "gold" ? constants.golden : constants.colorLavenderMuted};
    margin: 0;
    font-size: 22px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
`;

/** Centers the selected player’s heatmap in its card. */
export const HeatmapContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  justify-content: center;
`;

/** Displays muted explanatory text below controls or statistics. */
export const TableCaption = styled.p`
  margin: 8px 0 0;
  color: ${constants.textColorSecondary};
  font-size: 12px;
  line-height: 1.5;
`;


/** Highlights the laning result with a blue-tinted surface and team-colored edge. */
export const SummaryResult = styled.div<{ $winner: "radiant" | "dire" | "tie" }>`
  margin: 16px 0 20px;
  padding: 18px 20px;
  border: 1px solid ${laningBorderColor};
  border-left: 4px solid ${({ $winner }) => $winner === "radiant" ? constants.colorSuccess
    : $winner === "dire" ? constants.colorDanger : constants.textColorSecondary};
  border-radius: 8px;
  background: rgba(80, 140, 190, 0.16);

  h3 { display: flex; flex-wrap: wrap; align-items: center; gap: 0 6px; margin: 0; font-size: 22px; font-weight: 400; }
  p { margin: 8px 0 0; color: ${constants.textColorSecondary}; font-size: 13px; line-height: 1.6; }
  .summary-narrative {
    font-family: ${constants.fontFamilyFuturistic};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0 4px;
    font-size: 16px;
    line-height: 1.6;
  }
  .summary-phrase { display: inline-flex; align-items: center; }
  .summary-punctuation { margin-left: -4px; }
  .summary-narrative .summary-gold-lead,
  .summary-narrative .summary-minute,
  .summary-narrative > span {
    vertical-align: middle;
  }
  .summary-narrative .summary-gold-lead,
  .summary-narrative .summary-minute { height: auto; }
  .summary-minute {
    color: ${constants.colorWhite};
    display: inline-flex;
    align-items: center;
    gap: 4px;
    vertical-align: middle;
    svg { width: 16px; height: 16px; color: ${constants.colorBlue}; }
  }
  .summary-narrative .summary-gold-lead { font-size: inherit; font-weight: 700; }
  .summary-gold-lead { display: inline-flex; align-items: center; gap: 5px; }
  .summary-level-lead { font-size: 22px; }
  strong { color: ${constants.golden}; font-size: 22px; font-variant-numeric: tabular-nums; }
`;

/** Provides the collapsed-by-default detailed summary container. */
export const SummaryBreakdown = styled.details`
  border-top: 1px solid ${laningBorderColor};
  padding-top: 14px;

  interpolate-size: allow-keywords;

  &::details-content {
    height: 0;
    overflow: hidden;
    opacity: 0;
    transition: height 400ms ease, opacity 0ms, content-visibility 400ms allow-discrete;
  }

  &[open]::details-content {
    height: auto;
    opacity: 1;
    transition-duration: 500ms, 400ms, 500ms;
  }

  @media (prefers-reduced-motion: reduce) {
    &::details-content { transition: none; }
  }

  > dl, > section { margin-left: 20px; }

  summary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: fit-content;
    padding: 6px;
    border: 0;
    border-radius: 6px;
    background: transparent;
    color: ${constants.primaryTextColor};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 13px;
    font-weight: 400;
    line-height: 1.7;
    list-style: none;
    cursor: pointer;

    &::-webkit-details-marker { display: none; }
    > svg { flex-shrink: 0; transition: transform 400ms ease; }
    @media (prefers-reduced-motion: reduce) {
      > svg { transition: none; }
    }
  }

  .summary-time { font-weight: 700; }
  summary:hover { background: rgba(128, 128, 128, 0.15); }
  summary:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; }
  &[open] summary {
    margin-bottom: 16px;
    > svg { transform: rotate(180deg); }
  }
`;

/** Separates level-six timing comparisons from the team totals. */
export const UltimateSummary = styled.section`
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid ${laningBorderColor};

  .summary-item { font-family: ${constants.fontFamilyFuturistic}; font-size: 14px; text-align: left; }
  .level-six-cell { display: flex; flex-direction: column; align-items: center; gap: 6px; }
  && .level-six-cell .summary-hero { display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  .level-six-cell .summary-time { display: inline-flex; gap: 4px; }
  .level-six-cell .summary-time svg { width: 16px; height: 16px; color: ${constants.colorBlue}; }
  && .level-six-summary { text-align: left; vertical-align: top; line-height: 24px; overflow-wrap: anywhere; }
  && .level-six-summary .summary-hero { display: inline-flex; align-items: center; gap: 6px; white-space: normal; max-width: 100%; }
  .level-six-summary .summary-hero > span:last-child { min-width: 0; overflow-wrap: anywhere; }
  .level-six-entry { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 6px 0; }
  && .level-six-summary .summary-time {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${constants.textColorPrimary};
    font-weight: 700;
    white-space: nowrap;
    vertical-align: middle;
    svg { width: 16px; height: 16px; color: ${constants.colorBlue}; }
  }
  h3 > .summary-time { display: inline-flex; align-items: center; gap: 4px; }
  h3 > .summary-time svg { width: 16px; height: 16px; color: ${constants.colorBlue}; }

  .summary-team-icon { display: inline-flex; align-items: center; flex-shrink: 0; }
  .summary-team-icon svg, .summary-hero > img { display: block; }
  && .summary-hero, && .summary-keyword, && .summary-time {
    align-items: baseline;
    vertical-align: baseline;
    > svg, > img, > .summary-team-icon, > .summary-role-icon { align-self: center; }
    line-height: 24px;
  }

  h3 {
    margin: 0 0 10px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 13px;
    font-weight: 600;
  }
`;

/** Keeps team crests and names aligned throughout the summary. */
export const SummaryTeam = styled.span<{ $radiant: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  vertical-align: middle;
  color: ${({ $radiant }) => $radiant ? constants.colorGreen : constants.colorRed};
  font-weight: 700;
  svg { flex-shrink: 0; }
`;

/** Highlights combined levels with the experience accent. */
export const SummaryLevels = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  vertical-align: middle;
  color: ${constants.colorLavenderMuted};
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  svg { width: 16px; height: 16px; flex-shrink: 0; }
`;

/** Player selection beside the laning map. */
export const HeatmapPlayers = styled.div`
  padding: 16px;
  font-family: ${constants.fontFamilyFuturistic};
  font-size: 14px;
  border: 1px solid ${laningBorderColor};
  border-radius: 8px;
  background: rgba(80, 140, 190, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 200px;
  fieldset { border: 0; padding: 0; margin: 0; }
  legend { margin-bottom: 6px; font-family: ${constants.fontFamilyFuturistic}; font-size: 16px; }
  label { display: flex; align-items: center; gap: 8px; padding: 5px 6px; border-radius: 4px; cursor: pointer; font-size: 14px; }
  label:hover { background: rgba(125, 200, 240, 0.08); }
  img { flex-shrink: 0; }
  input[type="radio"] {
    appearance: none;
    display: block;
    width: 15px;
    height: 15px;
    margin: 0;
    border: 1px solid ${constants.textColorSecondary};
    border-radius: 50%;
    background: transparent;
    cursor: pointer;
    transition: border-color 150ms ease, background-color 150ms ease, box-shadow 150ms ease;
  }
  input[type="radio"]:hover { border-color: ${constants.colorBlue}; box-shadow: 0 0 0 3px rgba(125, 200, 240, 0.12); }
  input[type="radio"]:checked {
    border-color: ${constants.colorBlue};
    background: ${constants.colorBlue};
    box-shadow: inset 0 0 0 3px ${constants.primarySurfaceColor};
  }
  input[type="radio"]:focus-visible { outline: 2px solid ${constants.colorBlue}; outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) {
    input[type="radio"] { transition: none; }
  }
`;

export const ReplaySummary = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 24px;
  margin-top: 20px;
  padding: 16px 18px;
  border: 1px solid rgba(80, 140, 190, 0.3);
  border-radius: 8px;
  background: rgba(80, 140, 190, 0.1);
  color: ${constants.textColorPrimary};
  font-family: ${constants.fontFamilyFuturistic};
  font-size: 16px;
  line-height: 1.6;
  font-variant-numeric: tabular-nums;
  > div { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px; }
  .summary-time { color: ${constants.textColorSecondary}; }
  .summary-label { color: ${constants.textColorSecondary}; }
`;
