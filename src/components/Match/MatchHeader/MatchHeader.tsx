import React from "react";
import { Alert, Snackbar } from "@mui/material";
import Warning from "../../Alerts/Warning";
import styles from "./MatchHeader.module.css";
import MatchInfo from "./MatchInfo";
import ScoreSummary from "./ScoreSummary";
import AdditionalInfo from "./AdditionalInfo";
import MatchButtons from "./MatchButtons";
import {
  getTeamName,
  getTeamScore,
  getGameModeIcon,
} from "./matchHeader.utils";
import useStrings from "../../../hooks/useStrings.hook";

/**
 * Composes the match result, scores, metadata, and actions with copy feedback.
 * @param props Component props.
 * @param props.match Match to display; renders nothing when absent.
 * @returns The match header and clipboard notification, or null without a match.
 * @example
 * <MatchHeader match={match} />
 */
const MatchHeader = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [copyNotification, setCopyNotification] = React.useState<
    "success" | "error" | null
  >(null);
  if (!match) {
    return null;
  }

  const radiantName = getTeamName(match, "radiant", strings);
  const direName = getTeamName(match, "dire", strings);
  const radiantScore = getTeamScore(match, "radiant");
  const direScore = getTeamScore(match, "dire");
  const gameModeIcon = getGameModeIcon(match.game_mode);

  const copyMatchId = async () => {
    try {
      await navigator.clipboard.writeText(String(match.match_id));
      setCopyNotification("success");
    } catch {
      setCopyNotification("error");
    }
  };

  return (
    <>
      <header className={styles.styled}>
        <MatchInfo
          radiantWin={match.radiant_win}
          radiantName={radiantName}
          direName={direName}
        >
          <ScoreSummary
            match={match}
            radiantName={radiantName}
            direName={direName}
            radiantScore={radiantScore}
            direScore={direScore}
            gameModeIcon={gameModeIcon}
          />
          <AdditionalInfo match={match} onCopyMatchId={copyMatchId} />
        </MatchInfo>
        {!match.version && (
          <Warning className={styles.unparsed}>
            {strings.tooltip_unparsed}
          </Warning>
        )}
        <MatchButtons match={match} />
      </header>
      <Snackbar
        open={copyNotification !== null}
        autoHideDuration={2500}
        onClose={() => setCopyNotification(null)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={copyNotification === "error" ? "error" : "success"}
          variant="standard"
          onClose={() => setCopyNotification(null)}
          sx={{
            minWidth: 280,
            border: "1px solid rgba(102, 187, 255, 0.7)",
            borderRadius: "4px",
            background:
              "linear-gradient(135deg, rgba(43, 47, 50, 0.98), rgba(23, 27, 31, 0.98))",
            color: "var(--od-text-color-primary)",
            boxShadow:
              "0 8px 24px rgba(0, 0, 0, 0.42), inset 0 1px 0 var(--od-accent-soft)",
            "& .MuiAlert-icon": { color: "var(--od-color-blue)" },
            "& .MuiAlert-action": { color: "var(--od-color-blue)" },
          }}
        >
          {copyNotification === "error"
            ? "Could not copy match ID"
            : "Match ID copied to clipboard"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MatchHeader;
