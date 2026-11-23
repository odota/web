import React from "react";
import { IconRadiant, IconDire } from "../../Icons";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";

/**
 * Selects the result style for a Radiant win, Dire win, or unknown outcome.
 * @param radiantWin Whether Radiant won.
 * @returns The CSS module class for the result.
 */
const getWinnerStyle = (radiantWin: boolean | undefined) => {
  if (radiantWin === null || radiantWin === undefined) {
    return styles.nowinner;
  }
  return radiantWin ? styles.radiant : styles.dire;
};

/**
 * Displays the winning team or the localized no-result label.
 * @param props Component props.
 * @param props.match The match that supplies the result and team names.
 * @returns The match result banner.
 */
const MatchResult = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const victorySection = match.radiant_win ? (
    <>
      <IconRadiant />
      {match.radiant_team && match.radiant_team.name
        ? `${match.radiant_team.name} ${strings.match_team_win}`
        : strings.match_radiant_win}
    </>
  ) : (
    <>
      <IconDire />
      {match.dire_team && match.dire_team.name
        ? `${match.dire_team.name} ${strings.match_team_win}`
        : strings.match_dire_win}
    </>
  );

  return (
    <div className={`${styles.team} ${getWinnerStyle(match.radiant_win)}`}>
      {match.radiant_win === null || match.radiant_win === undefined
        ? strings.td_no_result
        : victorySection}
    </div>
  );
};

export default MatchResult;
