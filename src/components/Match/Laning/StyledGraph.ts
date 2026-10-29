/**
 * @file Styled Graph.
 * @description Shared styling for chart filters, captions, tooltip sections, timestamp badges, and preference toggles.
 */

import styled from "styled-components";
import { laningBorderColor } from "./StyledLaning";
import constants from "../../constants";
import { StyledCustomizedTooltip } from "../../Visualizations/Graph/Styled";

/** Styles the hover tooltip frame and timestamp badge, allowing viewport-bounded scrolling. */
export const LaningTooltip = styled(StyledCustomizedTooltip)`
  position: relative;
  bottom: 0;
  z-index: 1500;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  overflow: auto;
  pointer-events: none;

  .label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    padding: 4px 8px;
    border: 1px solid #374151;
    border-radius: 6px;
    background: rgba(148, 163, 184, 0.08);
    color: #cbd5e1;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    line-height: 1.5;

    svg { width: 14px; height: 14px; color: ${constants.colorBlue}; }
  }
`;

/** Groups related radio options with a visible legend. */
export const RoleFilter = styled.fieldset`
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
  color: ${constants.textColorSecondary};
  font-size: 13px;

  legend {
    padding: 0;
    margin-bottom: 8px;
  }
`;

/** Styles wrapping radio choices and their selected, disabled, and focus states. */
export const RoleOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border: 1px solid ${laningBorderColor};
    border-radius: 6px;
    background: rgba(80, 140, 190, 0.12);
    transition: background-color 150ms ease, border-color 150ms ease;
    cursor: pointer;
  }

  label:hover {
    background: rgba(80, 140, 190, 0.22);
    border-color: ${constants.colorBlue};
    color: ${constants.textColorPrimary};
  }

  label:has(input:checked) {
    background: rgba(80, 140, 190, 0.32);
    border-color: ${constants.colorBlue};
    color: ${constants.colorBlue};
  }

  label:has(input:disabled) {
    opacity: 0.45;
    cursor: not-allowed;
    border-color: ${constants.dividerColor};
    color: ${constants.textColorSecondary};
  }

  input:disabled {
    cursor: not-allowed;
  }

  input {
    margin: 0;
    accent-color: ${constants.primaryLinkColor};
    cursor: pointer;
  }

  label:focus-within {
    outline: 2px solid ${constants.primaryLinkColor};
    outline-offset: 2px;
  }
`;

/** Displays compact supporting text beneath graph controls or charts. */
export const RoleCaption = styled.p`
  margin: 8px 0 0;
  color: ${constants.textColorSecondary};
  font-size: 12px;
  line-height: 1.5;
`;

/** Keeps the Levels summary subtle while highlighting its time, teams, and XP. */
export const LevelCaption = styled(RoleCaption)`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;
  font-variant-numeric: tabular-nums;

  strong { font-weight: 700; }
  .caption-radiant { color: ${constants.colorGreen}; }
  .caption-dire { color: ${constants.colorRed}; }
  .caption-xp { color: ${constants.colorBlue}; }
  .caption-xp.caption-radiant { color: ${constants.colorGreen}; }
  .caption-xp.caption-dire { color: ${constants.colorRed}; }
  .caption-xp svg { color: ${constants.colorBlue}; }
  > a { flex-shrink: 0; margin-left: 0; }
  .caption-minute, .caption-radiant, .caption-dire, .caption-xp {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    vertical-align: middle;
    svg { width: 16px; height: 16px; font-size: 16px; flex-shrink: 0; }
  }
  .caption-minute svg {
    color: ${constants.colorBlue};
  }
`;

/** Styles the focusable Liquipedia source link. */
export const LevelSourceLink = styled.a`
  display: inline-flex;
  margin-left: 5px;
  color: ${constants.textColorSecondary};
  vertical-align: middle;

  &:hover {
    color: ${constants.primaryLinkColor};
  }

  &:focus-visible {
    outline: 2px solid ${constants.primaryLinkColor};
    outline-offset: 2px;
  }
`;

/** Places advantage information and hero values side by side. */
export const TooltipColumns = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  white-space: nowrap;
`;

/** Separates advantage details from hero values; the left variant reverses the divider. */
export const TooltipDifferences = styled.div<{ $left?: boolean }>`
  padding-left: 16px;
  border-left: 1px solid ${laningBorderColor};
  ${({ $left }) => $left && `padding-left: 0; border-left: 0; padding-right: 16px; border-right: 1px solid ${laningBorderColor};`}

  h4 {
    margin: 0 0 6px;
    color: ${constants.textColorSecondary};
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
`;

/** Aligns a tooltip label with its numeric value. */
export const DifferenceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20px;
  padding: 3px 0;
  color: ${constants.textColorSecondary};
  font-size: 12px;
`;

/** Colors signed advantages by their leading team, with neutral ties. */
export const DifferenceValue = styled.span<{ $difference: number }>`
  color: ${({ $difference }) =>
    $difference > 0
      ? constants.colorSuccess
      : $difference < 0
        ? constants.colorDanger
        : constants.textColorSecondary};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

/** Displays a compact team-colored label. */
export const TeamIndicator = styled.span<{ $isRadiant: boolean }>`
  margin-right: 6px;
  color: ${({ $isRadiant }) => $isRadiant ? constants.colorSuccess : constants.colorDanger};
  font-size: 11px;
  font-weight: 600;
`;


/** Groups full-roster totals and their difference inside the tooltip. */
export const TooltipTeamTotals = styled(TooltipDifferences)<{ $above?: boolean }>`
  ${({ $above }) => $above && "padding-left: 0; border-left: 0;"}
  margin-bottom: 12px;
  padding-bottom: 10px;
`;

/** Aligns a tooltip preference switch with its label. */
export const TooltipTotalToggle = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
  color: ${constants.textColorSecondary};
  font-size: 12px;
  cursor: pointer;
`;

/** Styles the message shown when no players match the active filters. */
export const NoMatchingPlayers = styled.p`
  color: ${constants.textColorSecondary};
`;
