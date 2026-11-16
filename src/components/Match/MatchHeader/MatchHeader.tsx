import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import HistoryIcon from "@mui/icons-material/History";
import BoltIcon from "@mui/icons-material/Bolt";
import StyleIcon from "@mui/icons-material/Style";
import { transformations, isRadiant, sum } from "../../../utility";
import Warning from "../../Alerts/Warning";
import styles from "./MatchHeader.module.css";
import useStrings from "../../../hooks/useStrings.hook";

const regionCountries: Record<number, string> = {
  1: "us", 2: "us", 3: "lu", 5: "sg", 6: "ae", 7: "au",
  8: "se", 9: "at", 10: "br", 11: "za", 12: "cn", 13: "cn",
  14: "cl", 15: "pe", 16: "in", 17: "cn", 18: "cn", 19: "jp",
  20: "cn", 25: "cn", 37: "tw", 38: "ar",
};



const MatchHeader = ({ match }: { match: Match }) => {
  const strings = useStrings();
  const [copyNotification, setCopyNotification] = React.useState<"success" | "error" | null>(null);
  if (!match) {
    return null;
  }

  const copyMatchId = async () => {
    try {
      await navigator.clipboard.writeText(String(match.match_id));
      setCopyNotification("success");
    } catch {
      setCopyNotification("error");
    }
  };

  const mapPlayers =
    (key: keyof MatchPlayer, radiant: boolean | undefined) =>
    (player: MatchPlayer) =>
      radiant === undefined || radiant === isRadiant(player.player_slot)
        ? Number(player[key])
        : 0;

  const radiantName = match.radiant_team?.name || strings.general_radiant;
  const direName = match.dire_team?.name || strings.general_dire;
  const radiantScore =
    match.radiant_score ||
    match.players
      .map(mapPlayers("kills" as keyof MatchPlayer, true))
      .reduce(sum, 0);
  const direScore =
    match.dire_score ||
    match.players
      .map(mapPlayers("kills" as keyof MatchPlayer, false))
      .reduce(sum, 0);
  const gameModeIcon = match.game_mode === 2
    ? (
      <svg viewBox="0 4 24 19" aria-hidden="true">
        <path fill="currentColor" d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
      </svg>
    )
    : match.game_mode === 23 ? <BoltIcon aria-hidden="true" />
    : match.game_mode === 22 ? <StyleIcon aria-hidden="true" /> : null;
  return (
    <header className={styles.styled}>
      <div className={styles.matchInfo}>
        {typeof match.radiant_win === "boolean" && (
          <h1 className={styles.victory}>
            <svg className={styles.victoryCrown} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
            </svg>
            <span className={styles.victoryTeam}>{match.radiant_win ? radiantName : direName}</span>
            <span className={styles.victoryTitle}>VICTORY!</span>
          </h1>
        )}
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
        <div className={styles.additionalInfo}>
          <ul>
            {match.league && (
              <li>
                <span className={styles.infoKey}>league</span>
                <span className={styles.infoValue}>{match.league.name}</span>
              </li>
            )}
            <li>
              <span className={styles.infoKey}>{strings.match_id}</span>
              <Button
                onClick={copyMatchId}
                startIcon={
                  <ContentCopyIcon
                    viewBox="0 -3 30 30"
                    style={{ height: 18, width: 18 }}
                  />
                }
              >
                {match.match_id}
              </Button>
            </li>
            <li>
              <span className={styles.infoKey}>{strings.match_region}</span>
              <span className={`${styles.infoValue} ${styles.regionValue}`}>
                {regionCountries[match.region] && (
                  <img src={`/assets/images/flags/${regionCountries[match.region]}.svg`} alt="" />
                )}
                {strings[`region_${match.region}` as keyof Strings] || "-"}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {!match.version && (
        <Warning className={styles.unparsed}>{strings.tooltip_unparsed}</Warning>
      )}
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
            border: "1px solid rgba(201, 174, 106, 0.7)",
            borderRadius: "4px",
            background: "linear-gradient(135deg, rgba(43, 47, 50, 0.98), rgba(23, 27, 31, 0.98))",
            color: "#f0e6cf",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.42), inset 0 1px 0 rgba(255, 239, 194, 0.12)",
            "& .MuiAlert-icon": { color: "#d2b66d" },
            "& .MuiAlert-action": { color: "#d2b66d" },
          }}
        >
          {copyNotification === "error"
            ? "Could not copy match ID"
            : "Match ID copied to clipboard"}
        </Alert>
      </Snackbar>
      <div className={styles.matchButtons}>
        <Button
          component={Link}
          to={`/request#${match.match_id}`}
          startIcon={match.version ? <RefreshIcon /> : <DataObjectIcon />}
        >
          {match.version
            ? strings.match_button_reparse
            : strings.match_button_parse}
        </Button>
        {match.replay_url && (
          <Button
            startIcon={<DownloadIcon />}
            href={match.replay_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {strings.match_button_replay}
          </Button>
        )}
        {/* {config.VITE_ENABLE_DOTA_COACH && (
          <Button
            label={strings.app_dota_coach_button}
            icon={
              <img
                src="/assets/images/dota-coach-icon.png"
                alt="Sponsor icon dota-coach.com"
                height="24px"
              />
            }
            href="https://dota-coach.com?s=OpenDota&c=analytics"
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
        {config.VITE_ENABLE_RIVALRY && (
          <Button
            label={strings.app_rivalry}
            icon={
              <img
                src="/assets/images/rivalry-icon.png"
                alt="Sponsor icon rivalry.com"
                height="24px"
              />
            }
            href="https://www.rivalry.com/opendota"
            target="_blank"
            rel="noopener noreferrer"
          />
        )} */}
      </div>
    </header>
  );
};

export default MatchHeader;
