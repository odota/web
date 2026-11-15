import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import DataObjectIcon from "@mui/icons-material/DataObject";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { transformations, isRadiant, sum } from "../../../utility";
import { IconRadiant, IconDire } from "../../Icons";
import Warning from "../../Alerts/Warning";
import config from "../../../config";
import useStrings from "../../../hooks/useStrings.hook";
import styles from "./MatchHeader.module.css";

const getWinnerStyle = (radiantWin: boolean | undefined) => {
  if (radiantWin === null || radiantWin === undefined) {
    return styles.nowinner;
  }
  return radiantWin ? styles.radiant : styles.dire;
};

const MatchHeader = ({ match }: { match: Match }) => {
  const strings = useStrings();
  if (!match) {
    return null;
  }

  const copyMatchId = () =>
    navigator.clipboard.writeText(String(match.match_id));

  const mapPlayers =
    (key: keyof MatchPlayer, radiant: boolean | undefined) =>
    (player: MatchPlayer) =>
      radiant === undefined || radiant === isRadiant(player.player_slot)
        ? Number(player[key])
        : 0;

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
    <header className={styles.styled}>
      <div className={styles.matchInfo}>
        <div className={`${styles.team} ${getWinnerStyle(match.radiant_win)}`}>
          {match.radiant_win === null || match.radiant_win === undefined
            ? strings.td_no_result
            : victorySection}
        </div>
        <div className={styles.mainInfo}>
          <div className={`${styles.killScore} ${styles.killsRadiant}`}>
            {match.radiant_score ||
              match.players
                .map(mapPlayers("kills" as keyof MatchPlayer, true))
                .reduce(sum, 0)}
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
              match.players
                .map(mapPlayers("kills" as keyof MatchPlayer, false))
                .reduce(sum, 0)}
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
              <span className={styles.infoValue}>
                {strings[`region_${match.region}` as keyof Strings] || "-"}
              </span>
            </li>
          </ul>
        </div>
      </div>
      {!match.version && (
        <Warning className={styles.unparsed}>{strings.tooltip_unparsed}</Warning>
      )}
      <div className={styles.matchButtons}>
        <Button
          startIcon={match.version ? <RefreshIcon /> : <DataObjectIcon />}
        >
          <Link to={`/request#${match.match_id}`}>
            {match.version
              ? strings.match_button_reparse
              : strings.match_button_parse}
          </Link>
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
