import React from "react";
import { Link } from "react-router-dom";
import { Alert, Button, Snackbar } from "@mui/material";
import styled from "styled-components";
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
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";

const regionCountries: Record<number, string> = {
  1: "us", 2: "us", 3: "lu", 5: "sg", 6: "ae", 7: "au",
  8: "se", 9: "at", 10: "br", 11: "za", 12: "cn", 13: "cn",
  14: "cl", 15: "pe", 16: "in", 17: "cn", 18: "cn", 19: "jp",
  20: "cn", 25: "cn", 37: "tw", 38: "ar",
};

const Styled = styled.header`
  width: 100vw;
  margin: 0px -50vw 0px -50vw;
  position: relative;
  left: 50%;
  right: 50%;
  box-sizing: border-box;
  padding: 28px 18px 22px;
  background: linear-gradient(180deg, ${constants.colorHeaderSection}, rgba(16, 16, 18, 0.96));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .matchInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .victory {
    margin: 0;
    padding: 18px 32px 24px;
    text-align: center;
    font-family: ${constants.fontFamilyFuturistic};
    font-weight: 400;
    color: ${constants.colorGolden};
    background: radial-gradient(ellipse at center, var(--od-accent-soft), transparent 70%);
    animation: victory-appear 450ms ease-out both;
  }
  .victory::after {
    content: "";
    display: block;
    width: min(260px, 60vw);
    height: 1px;
    margin: 18px auto 0;
    background: linear-gradient(90deg, transparent, ${constants.colorGolden}, transparent);
  }
  .victory-crown { display: block; width: 30px; height: 30px; margin: 0 auto 10px; fill: currentColor; }
  .victory-team { display: block; font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.12em; overflow-wrap: anywhere; }
  .victory-title {
    display: block;
    margin-top: 4px;
    font-size: clamp(28px, 5vw, 48px);
    line-height: 1.2;
    letter-spacing: 0.08em;
    text-shadow: 0 0 28px rgba(200, 164, 93, 0.3);
  }
  @keyframes victory-appear {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .victory { animation: none; }
  }

  .scoreSummary {
    width: min(760px, 100%);
    box-sizing: border-box;
    padding: 0 16px 18px;
  }
  .gameInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  .gameMode { order: 2; }
  .scoreLine { order: 1; }
  .matchTime { order: 3; }

  .gameMode {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: ${constants.colorMutedLight};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .gameMode svg { display: block; flex: 0 0 auto; width: 20px; height: 20px; color: ${constants.colorGolden}; }

  .scoreLine {
    display: flex;
    align-items: center;
    gap: 28px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: clamp(36px, 5vw, 48px);
    font-weight: 700;
  }

  .scoreTeam { display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .scoreTeamName { max-width: 130px; font-size: 11px; font-weight: 400; color: ${constants.colorMutedLight}; text-align: center; overflow-wrap: anywhere; }
  .scoreSeparator { color: ${constants.colorMuted}; font-size: 20px; }
  .scoreLine .scoreRadiant { color: ${constants.colorSuccess}; }
  .scoreLine .scoreDire { color: ${constants.colorDanger}; }
  .matchTime {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 12px 24px;
    color: ${constants.colorMutedLight};
    font-size: 14px;
    font-family: ${constants.fontFamilyFuturistic};
    white-space: nowrap;
  }
  .endedTime {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: ${constants.colorWhite};
    font-size: 14px;
    font-weight: 400;
  }
  .endedTime > div { display: inline-block; color: ${constants.colorWhite}; }
  .endedTime > svg { width: 16px; height: 16px; color: ${constants.colorGolden}; }
  .matchDuration {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${constants.colorWhite};
    font-size: 14px;
    font-weight: 400;
  }
  .matchDuration svg { width: 16px; height: 16px; color: ${constants.colorGolden}; }

  .additionalInfo ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px 12px;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .additionalInfo {
    width: min(760px, 100%);
    align-self: center;
    padding: 14px 0;
    border-top: 1px solid var(--od-accent-border);
    border-bottom: 1px solid var(--od-accent-border);
  }

  .additionalInfo ul { justify-content: center; }

  .additionalInfo li {
    flex: 0 1 auto;
    min-width: 0;
    padding: 0 24px;
    text-align: center;
  }
  .infoKey {
    display: block;
    color: ${constants.colorMutedLight};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .infoValue {
    display: block;
    margin-top: 4px;
    color: ${constants.colorWhite};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 14px;
  }
  .regionValue { display: flex; align-items: center; justify-content: center; gap: 6px; }
  .regionValue img { width: 20px; height: 14px; object-fit: contain; }

  .matchButtons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 2px auto 0;

    .MuiButton-root {
      margin: 5px !important;
      min-height: 38px;
      padding: 7px 16px;
      border: 1px solid #806b43;
      border-radius: 2px;
      background: linear-gradient(180deg, #343a40 0%, #20252a 48%, #171b20 100%);
      color: #e2d4b5;
      font-family: ${constants.fontFamilyFuturistic};
      font-size: ${constants.fontSizeSmall};
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-shadow: 0 1px 1px #000;
      text-decoration: none;
      transition: background 140ms ease, border-color 140ms ease, box-shadow 140ms ease;
      box-shadow: inset 0 1px 0 rgba(255, 239, 194, 0.12), inset 0 -2px 0 rgba(0, 0, 0, 0.42), 0 2px 5px rgba(0, 0, 0, 0.35);

      &:hover {
        background: linear-gradient(180deg, #51452f 0%, #30291e 50%, #211e19 100%);
        border-color: #c5a75c;
        box-shadow: inset 0 1px 0 rgba(255, 239, 194, 0.2), 0 0 9px rgba(197, 167, 92, 0.22);
      }

      &:active { background: linear-gradient(180deg, #181b1f, #2b2e32); box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.55); }
      &:focus-visible { outline: 2px solid #d7b763; outline-offset: 2px; }
    }

    .MuiButton-root:first-child {
      border-color: #b3934d;
      background: linear-gradient(180deg, #705b2d 0%, #4c3b1d 50%, #332817 100%);
      color: #fff0c4;
      &:hover { background: linear-gradient(180deg, #8a7139 0%, #5d4925 50%, #3f311b 100%); border-color: #e0c16d; }
    }

    .MuiButton-startIcon { color: #c9ae6a; }

    & a.MuiButton-root {
      text-decoration: none;
    }

    @media only screen and (max-width: 620px) {
      .MuiButton-root {
        min-width: 24px !important;
      }
    }
  }

  .additionalInfo .MuiButton-root {
    min-height: 28px;
    margin: 2px auto 0;
    padding: 2px 6px;
    color: ${constants.colorGolden};
    font-size: 14px;
    font-family: ${constants.fontFamilyFuturistic};
    &:hover { background: var(--od-accent-soft); }
    &:focus-visible { outline: 2px solid ${constants.colorGolden}; outline-offset: 2px; }
  }

  .unparsed {
    margin-top: 12px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
    text-align: center;
  }

  @media only screen and (max-width: 600px) {
    padding: 22px 12px 18px;
    .matchInfo { gap: 17px; }
    .scoreSummary { padding: 0 8px 12px; }
    .gameInfo { gap: 12px; }
    .scoreLine { justify-content: center; }
    .gameMode { font-size: 12px; }
    .matchTime { font-size: 12px; }
    .additionalInfo ul { gap: 12px 18px; }
    .additionalInfo li { min-width: 0; padding: 7px 8px; }
  }
`;

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
    <Styled>
      <div className="matchInfo">
        {typeof match.radiant_win === "boolean" && (
          <h1 className="victory">
            <svg className="victory-crown" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
            </svg>
            <span className="victory-team">{match.radiant_win ? radiantName : direName}</span>
            <span className="victory-title">VICTORY!</span>
          </h1>
        )}
        <div className="scoreSummary">
          <div className="gameInfo">
            <span className="gameMode">
              {gameModeIcon}
              {strings[`game_mode_${match.game_mode}` as keyof Strings]}
            </span>
            <div className="scoreLine">
              <span className="scoreTeam">
                <span className="scoreRadiant">{radiantScore}</span>
                <span className="scoreTeamName">{radiantName}</span>
              </span>
              <span className="scoreSeparator">:</span>
              <span className="scoreTeam">
                <span className="scoreDire">{direScore}</span>
                <span className="scoreTeamName">{direName}</span>
              </span>
            </div>
            <span className="matchTime">
              <span className="matchDuration">
                <AccessTimeIcon aria-hidden="true" />
                {transformations.duration(null, null, match.duration)}
              </span>
              <span className="endedTime">
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
        <div className="additionalInfo">
          <ul>
            {match.league && (
              <li>
                <span className="infoKey">league</span>
                <span className="infoValue">{match.league.name}</span>
              </li>
            )}
            <li>
              <span className="infoKey">{strings.match_id}</span>
              <Button
                className="matchIdButton"
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
              <span className="infoKey">{strings.match_region}</span>
              <span className="infoValue regionValue">
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
        <Warning className="unparsed">{strings.tooltip_unparsed}</Warning>
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
      <div className="matchButtons">
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
    </Styled>
  );
};

export default MatchHeader;
