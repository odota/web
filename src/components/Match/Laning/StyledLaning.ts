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

