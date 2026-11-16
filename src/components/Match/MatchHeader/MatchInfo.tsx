import React from "react";
import styles from "./MatchInfo.module.css";

type MatchInfoProps = {
  radiantWin: Match["radiant_win"];
  radiantName: string;
  direName: string;
  children: React.ReactNode;
};

/**
 * Groups match details beneath a victory banner when the winner is known.
 * @param props Component props.
 * @param props.radiantWin Whether Radiant won; omits the banner for an unknown result.
 * @param props.radiantName Display name for Radiant.
 * @param props.direName Display name for Dire.
 * @param props.children Score summary and additional match information.
 * @returns The victory banner and supplied match details.
 * @example
 * <MatchInfo radiantWin={true} radiantName="Radiant" direName="Dire">
 *   <p>Match details</p>
 * </MatchInfo>
 */
const MatchInfo = ({
  radiantWin,
  radiantName,
  direName,
  children,
}: MatchInfoProps) => {
  return (
    <div className={styles.matchInfo}>
      {typeof radiantWin === "boolean" && (
        <h1 className={styles.victory}>
          <svg
            className={styles.victoryCrown}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
          </svg>
          <span className={styles.victoryTeam}>
            {radiantWin ? radiantName : direName}
          </span>
          <span className={styles.victoryTitle}>VICTORY!</span>
        </h1>
      )}
      {children}
    </div>
  );
};

export default MatchInfo;
