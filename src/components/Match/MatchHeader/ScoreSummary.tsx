import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import { transformations } from "../../../utility";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./ScoreSummary.module.css";

type ScoreSummaryProps = {
  match: Match;
  radiantName: string;
  direName: string;
  radiantScore: number;
  direScore: number;
  gameModeIcon: React.ReactNode;
};

/**
 * Displays team scores and names, game mode, duration, and match end time.
 * @param props Component props.
 * @param props.match Match supplying the game mode, duration, and start time.
 * @param props.radiantName Display name for Radiant.
 * @param props.direName Display name for Dire.
 * @param props.radiantScore Resolved Radiant score.
 * @param props.direScore Resolved Dire score.
 * @param props.gameModeIcon Decorative game mode icon, or null when unavailable.
 * @returns The score summary and match timing details.
 * @example
 * <ScoreSummary
 *   match={match}
 *   radiantName={radiantName}
 *   direName={direName}
 *   radiantScore={radiantScore}
 *   direScore={direScore}
 *   gameModeIcon={getGameModeIcon(match.game_mode)}
 * />
 */
const ScoreSummary = ({
  match,
  radiantName,
  direName,
  radiantScore,
  direScore,
  gameModeIcon,
}: ScoreSummaryProps) => {
  const strings = useStrings();
  return (
    <div className={styles.scoreSummary}>
      <div className={styles.gameInfo}>
        <span className={styles.gameMode}>
          {gameModeIcon}
          {strings[`game_mode_${match.game_mode}` as keyof Strings]}
        </span>
        <div className={styles.scoreLine}>
          <span className={styles.scoreTeam}>
            <span className={styles.scoreRadiant}>{radiantScore}</span>
            <span className={styles.scoreTeamName}>{radiantName}</span>
          </span>
          <span className={styles.scoreSeparator}>:</span>
          <span className={styles.scoreTeam}>
            <span className={styles.scoreDire}>{direScore}</span>
            <span className={styles.scoreTeamName}>{direName}</span>
          </span>
        </div>
        <span className={styles.matchTime}>
          <span className={styles.matchDuration}>
            <AccessTimeIcon aria-hidden="true" />
            {transformations.duration(null, null, match.duration)}
          </span>
          <span className={styles.endedTime}>
            <HistoryIcon aria-hidden="true" />
            {transformations.start_time(
              null,
              null,
              match.start_time + match.duration,
            )}
          </span>
        </span>
      </div>
    </div>
  );
};

export default ScoreSummary;
