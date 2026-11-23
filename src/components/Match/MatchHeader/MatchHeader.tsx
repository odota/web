import React from "react";
import Warning from "../../Alerts/Warning";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";
import MatchActions from "./MatchActions";
import MatchMetadata from "./MatchMetadata";
import MatchResult from "./MatchResult";
import MatchScoreSummary from "./MatchScoreSummary";

/**
 * Composes the match header and displays a warning for an unparsed match.
 * @param props Component props.
 * @param props.match The match to display.
 * @returns The match header, or null when the match is unavailable.
 */
const MatchHeader = ({ match }: { match: Match }) => {
  const strings = useStrings();
  if (!match) {
    return null;
  }

  return (
    <header className={styles.styled}>
      <div className={styles.matchInfo}>
        <MatchResult match={match} />
        <MatchScoreSummary match={match} />
        <MatchMetadata match={match} />
      </div>
      {!match.version && (
        <Warning className={styles.unparsed}>{strings.tooltip_unparsed}</Warning>
      )}
      <MatchActions match={match} />
    </header>
  );
};

export default MatchHeader;
