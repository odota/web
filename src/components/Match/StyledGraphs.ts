/**
 * @file Styled Graphs.
 * @description Graph-page card and timeline styling, including event tooltips and milestone badges.
 */

import styled from "styled-components";
import constants from "../constants";
import { StyledCustomizedTooltip } from "../Visualizations/Graph/Styled";
import { PageSection } from "./Laning/StyledLaning";

/** Applies the Graphs page’s shared slate card border. */
export const GraphCard = styled(PageSection)`
  border-color: rgba(100, 116, 139, 0.3);
  &, & * { font-family: ${constants.fontFamilyFuturistic}; }
  ${StyledCustomizedTooltip} { font-size: 16px; }
  ${StyledCustomizedTooltip} div, ${StyledCustomizedTooltip} span,
  ${StyledCustomizedTooltip} strong, ${StyledCustomizedTooltip} small,
  ${StyledCustomizedTooltip} p { font-size: inherit; }
  ${StyledCustomizedTooltip} .label { font-size: 14px; }
`;

/** Styles timeline markers, event tooltips, and milestone badges within a graph card. */
export const TimelineCard = styled(GraphCard)`
  .timeline {
    margin: 48px 0 42px;
    gap: 12px;
  }

  .timeline > section { gap: 5px; }
  .timeline time {
    color: ${constants.textColorSecondary};
    font-size: 11px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .timeline > section > mark {
    color: ${constants.textColorSecondary};
    font-size: 10px;
    font-family: ${constants.fontFamilyFuturistic};
  }
  .line { height: 6px; border-radius: 3px; }
  .line > section {
    border-radius: inherit;
    background: ${constants.dividerColor};
  }
  .events .battleHorn { height: 6px; border-radius: 1px; }
  .iconBattle:hover { filter: brightness(1.3); }

  .events mark div[data-id="tooltip"] {
    z-index: 1500;
    border: 1px solid #374151;
    border-radius: 8px;
    background: #111827;
    color: #f1f5f9;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
    padding: 10px 12px !important;
    font-size: 14px;
    p, span, strong, small { font-size: inherit; }
  }

  .matchNumbers {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }
  .matchNumbers > div {
    padding: 8px 12px;
    border: 1px solid rgba(100, 116, 139, 0.3);
    border-radius: 6px;
    background: ${constants.secondarySurfaceColor};
  }
  .matchNumbers > div span:first-child { margin-left: 0; }

  @media (max-width: 680px) {
    .timeline { gap: 4px; }
    .timeline > section > mark { max-width: 70px; overflow-wrap: anywhere; }
  }
`;
