import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import StyleIcon from "@mui/icons-material/Style";
import { isRadiant, sum } from "../../../utility";

type MatchSide = "radiant" | "dire";

/**
 * Resolves a team's name, falling back to its localized Radiant or Dire label.
 * @param match Match containing optional professional team details.
 * @param side Team whose name should be displayed.
 * @param strings Localized labels for unnamed teams.
 * @returns The team name or the localized side label when it is missing or empty.
 * @example
 * const radiantName = getTeamName(match, "radiant", strings);
 * const direName = getTeamName(match, "dire", strings);
 */
export function getTeamName(match: Match, side: MatchSide, strings: Strings) {
  return match[`${side}_team`]?.name || strings[`general_${side}`];
}

/**
 * Resolves a team's score, summing its players' kills when the score is falsy.
 * @param match Match containing team scores and player kill totals.
 * @param side Team whose score should be calculated.
 * @returns The recorded score, or the team's total kills, including for a recorded zero.
 * @example
 * const radiantScore = getTeamScore(match, "radiant");
 * const direScore = getTeamScore(match, "dire");
 */
export function getTeamScore(match: Match, side: MatchSide) {
  return (
    match[`${side}_score`] ||
    match.players
      .filter(
        (player) => isRadiant(player.player_slot) === (side === "radiant"),
      )
      .map((player) => Number(player.kills))
      .reduce(sum, 0)
  );
}

/**
 * Selects the match header icon for Captains Mode, Turbo, or All Draft.
 * @param gameMode Dota game mode ID: 2, 23, or 22, respectively.
 * @returns A decorative icon element, or null for other game modes.
 * @example
 * const turboIcon = getGameModeIcon(23); // Bolt icon.
 * const otherModeIcon = getGameModeIcon(1); // null.
 */
export function getGameModeIcon(gameMode: number) {
  switch (gameMode) {
    case 2:
      return (
        <svg viewBox="0 4 24 19" aria-hidden="true">
          <path
            fill="currentColor"
            d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z"
          />
        </svg>
      );
    case 23:
      return <BoltIcon aria-hidden="true" />;
    case 22:
      return <StyleIcon aria-hidden="true" />;
    default:
      return null;
  }
}
