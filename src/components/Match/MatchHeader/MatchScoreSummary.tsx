import React from "react";
import { transformations, isRadiant, sum } from "../../../utility";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";

/**
 * Displays team scores, game mode, duration, and end time.
 * @param props Component props.
 * @param props.match The match that supplies scores, player kills, and timing information.
 * @returns The score and timing summary.
 */
const MatchScoreSummary = ({ match }: { match: Match }) => {
  const strings = useStrings();
  /**
   * Creates a mapper that counts only the selected team's kills.
   * @param radiant Whether to count Radiant players.
   * @returns A mapper that returns a player's kill count or zero for the other team.
   */
  const playerKills = (radiant: boolean) => (player: MatchPlayer) =>
    radiant === isRadiant(player.player_slot) ? Number(player.kills) : 0;

  return (
    <div className={styles.mainInfo}>
      <div className={`${styles.killScore} ${styles.killsRadiant}`}>
        {match.radiant_score ||
          match.players.map(playerKills(true)).reduce(sum, 0)}
      </div>
      <div className={styles.gmde}>
        <span className={styles.gameMode}>
          {strings[`game_mode_${match.game_mode}` as keyof Strings]}
        </span>
        <span className={styles.duration}>
          {transformations.duration(null, null, match.duration)}
        </span>
        <span className={styles.ended}>
          {strings.match_ended}{" "}
          {transformations.start_time(
            null,
            null,
            match.start_time + match.duration,
          )}
        </span>
      </div>
      <div className={`${styles.killScore} ${styles.killsDire}`}>
        {match.dire_score ||
          match.players.map(playerKills(false)).reduce(sum, 0)}
      </div>
    </div>
  );
};

export default MatchScoreSummary;
