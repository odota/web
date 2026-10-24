/**
 * @file Styled Lane Matchups.
 * @description Responsive lane matchup and selectable player-card styling used by alternative laning layouts.
 */

import styled from "styled-components";
import constants from "../../constants";

/** Separates physical-lane matchup groups. */
export const Matchup = styled.section`
  & + & { margin-top: 24px; padding-top: 24px; border-top: 1px solid ${constants.dividerColor}; }
  h3 { margin: 0 0 12px; font-size: 15px; }
`;
/** Arranges opposing players side by side, stacking on mobile. */
export const Sides = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 680px) { grid-template-columns: minmax(0, 1fr); }
`;
/** Groups a team heading and its lane player cards. */
export const Side = styled.div`
  min-width: 0;
  h4 { display: flex; align-items: center; gap: 8px; margin: 0 0 12px; font-size: 13px; }
`;
/** Highlights the selected player’s card for heatmap control. */
export const PlayerCard = styled.div<{ $selected: boolean }>`
  padding: 14px;
  margin-top: 10px;
  border: 1px solid ${({ $selected }) => $selected ? constants.primaryLinkColor : constants.dividerColor};
  border-radius: 8px;
  background: ${constants.secondarySurfaceColor};
`;
/** Provides the selectable radio label and player identity. */
export const PlayerHeader = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  input { margin: 0; accent-color: ${constants.primaryLinkColor}; }
  img { border-radius: 4px; }
  div { min-width: 0; flex: 1; }
  strong { display: block; overflow-wrap: anywhere; font-size: 13px; }
  small { display: block; color: ${constants.textColorSecondary}; font-size: 11px; margin-top: 3px; }
`;
/** Lays out compact player statistics. */
export const Stats = styled.dl`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(65px, 1fr));
  gap: 12px;
  margin: 16px 0 0;
  dt { color: ${constants.textColorSecondary}; font-size: 10px; }
  dd { margin: 4px 0 0; font-size: 14px; font-variant-numeric: tabular-nums; }
`;
/** Labels the player’s creep-score sparkline. */
export const Trend = styled.div`
  margin-top: 12px;
  color: ${constants.textColorSecondary};
  font-size: 11px;
`;
