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
import { IconRadiant, IconDire } from "../../Icons";
import Warning from "../../Alerts/Warning";
import constants from "../../constants";
import useStrings from "../../../hooks/useStrings.hook";

const Styled = styled.header`
  width: 100vw;
  margin: 0px -50vw 0px -50vw;
  position: relative;
  left: 50%;
  right: 50%;
  box-sizing: border-box;
  padding: 28px 18px 22px;
  background: linear-gradient(180deg, ${constants.colorHeaderSection}, rgba(15, 22, 32, 0.96));
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  .matchInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .matchup {
    width: min(900px, 100%);
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: 18px;
  }

  .teamSide {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-width: 0;
    min-height: 92px;
    padding: 12px 18px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.16);
    text-align: center;
    font-family: ${constants.fontFamilyFuturistic};
    transition: transform 150ms ease, border-color 150ms ease, background 150ms ease;
  }

  .teamSide .teamName {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    font-size: clamp(1.35rem, 2.5vw, 1.9rem);
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .teamSide svg { width: 30px; height: 30px; flex: 0 0 auto; }
  .teamSide.radiant { color: ${constants.colorSuccess}; }
  .teamSide.dire { color: ${constants.colorDanger}; }
  .teamSide.radiant.winner { border-color: rgba(75, 190, 120, 0.5); background: rgba(35, 120, 70, 0.14); }
  .teamSide.dire.winner { border-color: rgba(225, 85, 85, 0.5); background: rgba(140, 45, 45, 0.14); }
  .teamSide .winnerLabel {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    position: absolute;
    top: 8px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    padding: 3px 8px;
    border: 1px solid rgba(255, 195, 80, 0.38);
    border-radius: 4px;
    background: rgba(255, 195, 80, 0.12);
    color: ${constants.colorGolden};
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    line-height: 1;
    text-transform: uppercase;
  }
  .winnerLabel svg {
    display: block;
    width: 14px;
    height: 14px;
    flex: 0 0 auto;
    fill: currentColor;
    transform: translateY(-1px);
  }
  .versus {
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    color: ${constants.colorGreyMuted};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeSmall};
    font-weight: 700;
    letter-spacing: 0.1em;
  }

  .scoreSummary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 26px;
    padding: 14px 34px;
    border: 1px solid rgba(46, 160, 214, 0.22);
    border-radius: 10px;
    background: linear-gradient(135deg, rgba(46, 160, 214, 0.09), rgba(0, 0, 0, 0.2));
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .gameInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    min-width: 150px;
    text-align: center;
  }

  .gameMode {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: ${constants.colorMutedLight};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 1.15rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }
  .gameMode svg { display: block; flex: 0 0 auto; width: 20px; height: 20px; color: ${constants.colorBlue}; }

  .scoreLine {
    display: flex;
    align-items: baseline;
    gap: 8px;
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 1.75rem;
    font-weight: 700;
  }

  .scoreLine .scoreRadiant { color: ${constants.colorSuccess}; }
  .scoreLine .scoreDire { color: ${constants.colorDanger}; }
  .matchTime {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
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
    font-size: 16px;
    font-weight: 600;
  }
  .endedTime > div { display: inline-block; color: ${constants.colorWhite}; }
  .endedTime > svg { width: 14px; height: 14px; color: ${constants.colorBlue}; }
  .matchDuration {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    color: ${constants.colorWhite};
    font-size: 16px;
    font-weight: 600;
  }
  .matchDuration svg { width: 16px; height: 16px; color: ${constants.colorBlue}; }

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
    width: min(900px, 100%);
    align-self: center;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .additionalInfo ul { justify-content: center; }

  .additionalInfo li {
    min-width: 130px;
    padding: 8px 12px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.025);
    text-align: center;
  }
  .infoKey {
    display: block;
    color: ${constants.colorMutedLight};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 14px;
    text-transform: uppercase;
  }
  .infoValue {
    display: block;
    margin-top: 4px;
    color: ${constants.colorWhite};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: 14px;
  }

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
    min-height: 30px;
    padding: 4px 10px;
    border: 1px solid #806b43;
    border-radius: 2px;
    background: linear-gradient(180deg, #343a40 0%, #20252a 100%);
    color: #e2d4b5;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255, 239, 194, 0.1), 0 2px 4px rgba(0, 0, 0, 0.3);
    &:hover { background: linear-gradient(180deg, #51452f, #30291e); border-color: #c5a75c; }
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
    .matchup { gap: 8px; }
    .teamSide { min-height: 78px; padding: 10px 7px; }
    .teamSide .teamName { flex-direction: row; gap: 5px; font-size: 1.15rem; }
    .teamSide svg { width: 24px; height: 24px; }
    .versus { width: 30px; height: 30px; font-size: 10px; }
    .scoreSummary { width: 100%; box-sizing: border-box; gap: 12px; padding: 11px 8px; }
    .gameInfo { min-width: 105px; }
    .scoreLine { font-size: 1.25rem; }
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
  const radiantCard = (
    <div
      className={`teamSide radiant${match.radiant_win === true ? " winner" : ""}`}
      key="radiant"
    >
      {match.radiant_win === true && (
        <span className="winnerLabel">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
          </svg>
          {strings.th_winner}
        </span>
      )}
      <span className="teamName">
        <IconRadiant />
        {radiantName}
      </span>
    </div>
  );
  const direCard = (
    <div
      className={`teamSide dire${match.radiant_win === false ? " winner" : ""}`}
      key="dire"
    >
      {match.radiant_win === false && (
        <span className="winnerLabel">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 20h16v2H4zm1-2-1.5-9 4.5 3L12 5l4 7 4.5-3L19 18z" />
          </svg>
          {strings.th_winner}
        </span>
      )}
      <span className="teamName">
        <IconDire />
        {direName}
      </span>
    </div>
  );
  return (
    <Styled>
      <div className="matchInfo">
        <div className="matchup">
          {radiantCard}
          <span className="versus">VS</span>
          {direCard}
        </div>
        <div className="scoreSummary">
          <div className="gameInfo">
            <span className="gameMode">
              {gameModeIcon}
              {strings[`game_mode_${match.game_mode}` as keyof Strings]}
            </span>
            <div className="scoreLine">
              <span className="scoreRadiant">{radiantScore}</span>
              <span>:</span>
              <span className="scoreDire">{direScore}</span>
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
              <span className="infoValue">
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
