/**
 * @file Styled Net Worth Share.
 * @description Team share cards, stacked bars, hero lists, and segment tooltip styling.
 */

import styled from "styled-components";
import { laningBorderColor } from "./StyledLaning";
import constants from "../../constants";

/** Arranges net worth share cards in responsive team columns. */
export const Teams = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

/** Styles a team’s stacked bar, total, and hero legend. */
export const Team = styled.section`
  min-width: 0;
  padding: 20px;
  border: 1px solid ${laningBorderColor};
  border-radius: 8px;
  background: ${constants.secondarySurfaceColor};

  h3 {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  ul { list-style: none; padding: 0; margin: 0; }

  li {
    display: grid;
    grid-template-columns: 6px 24px minmax(0, 1fr) auto auto;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-top: 1px solid ${laningBorderColor};
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  li img { border-radius: 3px; }
  li strong { min-width: 44px; text-align: right; font-weight: 600; }
`;

/** Truncates long player names in the net worth share list. */
export const HeroName = styled.span`
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/** Highlights gold values within the share card and tooltip. */
export const GoldValue = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  img { flex-shrink: 0; }

  color: ${constants.golden};
  font-size: 12px;
  font-weight: 700;
`;

/** Connects a legend entry to its player-slot segment color. */
export const ColorMarker = styled.span<{ $color: string }>`
  width: 6px;
  height: 18px;
  border-radius: 3px;
  background: ${({ $color }) => $color};
`;

/** Emphasizes the combined team net worth above the stacked bar. */
export const TeamTotal = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  img { flex-shrink: 0; }

  margin: 10px 0 20px;
  color: ${constants.golden};
  font-size: 20px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
`;

/** Stacks player identity above hero and role text. */
export const HeroDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

/** Provides subdued hero and role metadata. */
export const HeroRole = styled.span`
  color: ${constants.textColorSecondary};
  font-size: 11px;
`;

/** Contains the team’s proportional net worth segments. */
export const StackedBar = styled.div`
  display: flex;
  height: 40px;
  margin-bottom: 20px;
  border-radius: 6px;
  overflow: hidden;
  background: ${constants.dividerColor};
`;

/** Sizes a hero’s team-share segment and styles hover and keyboard focus. */
export const ShareSegment = styled.div<{ $color: string; $percentage: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 ${({ $percentage }) => $percentage}%;
  min-width: 0;
  box-sizing: border-box;
  background: ${({ $color }) => $color};
  color: #111827;
  font-size: 11px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;

  & + & { border-left: 2px solid ${constants.secondarySurfaceColor}; }
  &:hover { filter: brightness(1.12); }
  &:focus-visible { outline: 2px solid ${constants.textColorPrimary}; outline-offset: -3px; }
`;

/** Displays muted context and unavailable-data messages. */
export const Note = styled.p`
  color: ${constants.textColorSecondary};
  font-size: 12px;
  margin: 8px 0;
`;

/** Provides spacing and typography for a segment tooltip. */
export const ShareTooltipContent = styled.div`
  min-width: 180px;
  padding: 14px 16px;
  font-family: ${constants.fontFamily};
  font-size: 12px;
  line-height: 1.5;
`;

/** Aligns the hero icon with its name and role. */
export const ShareTooltipHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img { border-radius: 4px; }
  strong { display: block; font-size: 13px; font-weight: 600; }
  span { display: block; margin-top: 2px; color: #94a3b8; font-size: 11px; }
`;

/** Separates highlighted gold and team-share values from the tooltip header. */
export const ShareTooltipStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #374151;
  font-variant-numeric: tabular-nums;

  ${GoldValue} { color: #e2c46a; font-size: 16px; font-weight: 600; }
`;

/** Displays the leading team’s gold advantage beside its name. */
export const TeamDifference = styled.span<{ $difference: number }>`
  margin-left: 4px;
  color: ${({ $difference }) => $difference > 0 ? constants.colorSuccess
    : $difference < 0 ? constants.colorDanger : constants.textColorSecondary};
  font-size: 12px;
  font-weight: 600;
  letter-spacing: normal;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;
