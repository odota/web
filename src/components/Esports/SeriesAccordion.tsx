import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useStrings from "../../hooks/useStrings.hook";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TeamLogo from "../TeamLogo/TeamLogo";
import constants from "../constants";
import SeriesGames from "./SeriesGames";

/**
 * Provides a collapsible matchup row with opposing teams and game details.
 * @example
 * <Series open><summary>Alpha 2 – 1 Beta</summary>{gameLinks}</Series>
 */
const Series = styled.details`
  margin-top: 8px;
  border: 1px solid #35d9cc;
  background: linear-gradient(180deg, #06302f 0%, #061719 55%, #050e12 100%);
  box-shadow: 0 4px 18px rgba(0, 0, 0, .22), inset 0 1px 0 rgba(53, 217, 204, .12);
  color: #f4ffff;
  > summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 94px minmax(0, 1fr);
    align-items: stretch;
    min-height: 76px;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker { display: none; }
    &:hover { background: rgba(53, 217, 204, .07); }
    &:focus-visible { outline: 2px solid #71fff0; outline-offset: 4px; }
    > a, > span.team {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      padding: 12px;
      color: #f4ffff;
      font-family: ${constants.fontFamilyFuturistic};
      font-size: clamp(13px, 1.2vw, 17px);
      line-height: 1.2;
      text-align: right;
      text-transform: uppercase;
      overflow-wrap: anywhere;
      min-width: 0;
    }
    > .opponent { flex-direction: row-reverse; text-align: left; }
    .winner { color: #71fff0; }
    img, .team-logo { width: 40px; height: 40px; flex-shrink: 0; object-fit: contain; }
    a:focus-visible { outline: 2px solid #71fff0; outline-offset: -4px; }
  }
  @media (max-width: 680px) {
    > summary {
      grid-template-columns: minmax(0, 1fr) 90px minmax(0, 1fr);
      min-height: 72px;
      > a, > span.team { gap: 8px; padding: 10px 8px; font-size: 13px; }
      img, .team-logo { width: 40px; height: 40px; }
    }
  }
  @media (max-width: 420px) {
    > summary > a, > summary > span.team { flex-direction: column-reverse; justify-content: center; text-align: center; }
  }
`;

/**
 * Centers the recorded series score and format between the teams.
 * @example
 * <Score><strong>2 – 1</strong><small>BO3</small></Score>
 */
const Score = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-variant-numeric: tabular-nums;
  font-family: ${constants.fontFamilyFuturistic};
  strong { font-size: 24px; font-weight: 600; line-height: 1; white-space: nowrap; }
  small {
    border: 1px solid rgba(240, 198, 108, .25);
    padding: 3px 6px;
    border-radius: 3px;
    background: rgba(240, 198, 108, .07);
    color: #c4b38f;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: .3px;
    line-height: 1.2;
    white-space: nowrap;
  }
  @media (max-width: 680px) {
    strong { font-size: 24px; }
    small { font-size: 10px; padding: 3px 6px; }
  }
`;

const Metadata = styled.div`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 12px 0;
  color: #8ba9ac;
  font-family: ${constants.fontFamilyFuturistic};
  font-size: 12px;
  font-weight: 400;
  font-variant-numeric: tabular-nums;
  time { color: #8ba9ac; }
  time { margin-left: auto; }
`;

/** Identical series presentation shared by schedule and match lists. */
export default function SeriesAccordion({ series: row, teams, defaultOpen = false, showMetadata = false }: { series: MatchSeries; teams: SeriesTeam[]; defaultOpen?: boolean; showMetadata?: boolean }) {
  const strings = useStrings();
  const [expanded, setExpanded] = useState(defaultOpen);
  /**
   * Renders one team’s name and logo with an optional winner highlight.
   * @param id Team ID used for the profile link and logo lookup.
   * @param name Display name, or null to use the localized unknown label.
   * @param winner Whether the recorded score reaches the wins required by the series format.
   * @returns A team link, or plain team identity when no ID exists.
   * @example
   * team(8965331, "Chandogs", true);
   * // Team profile link and logo with winner highlighting.
   */
  const team = (id: number | null | undefined, name: string | null, winner: boolean, opponent = false) => {
    const label = <><span>{name || strings.general_unknown}</span><TeamLogo teamId={id} src={teams.find((item) => item.team_id === id)?.logo_url} style={{ width: "clamp(28px, 3vw, 40px)", height: "clamp(28px, 3vw, 40px)", flexShrink: 0, objectFit: "contain" }} /></>;
    return id ? <Link className={`${winner ? "winner" : ""}${opponent ? " opponent" : ""}`} to={`/teams/${id}`}>{label}</Link>
      : <span className={`team ${winner ? "winner" : ""}${opponent ? " opponent" : ""}`}>{label}</span>;
  };
            const type = row.series_type;
            const knownFormat = typeof type === "number" && Number.isInteger(type) && type >= 0 && type <= 2;
            const format = knownFormat ? `BEST OF ${type * 2 + 1}` : strings.general_unknown;
            const winsNeeded = knownFormat ? type + 1 : Infinity;
  return (
              <Series key={row.key} open={expanded} onToggle={(event) => {
                const open = event.currentTarget.open;
                setExpanded(open);
              }}>
                <summary aria-label={`${row.team1 || strings.general_unknown} ${row.team1Wins} – ${row.team2Wins} ${row.team2 || strings.general_unknown}`}>
                  {showMetadata && <Metadata>
                    <span>{row.series_id && row.series_id > 0 ? `${row.league_name || strings.general_unknown} #${row.series_id}` : strings.esports_standalone_match}</span>
                    <time dateTime={new Date(row.first_match_time * 1000).toISOString()}>{new Date(row.first_match_time * 1000).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</time>
                  </Metadata>}
                  {team(row.team1Id, row.team1, row.team1Wins >= winsNeeded)}
                  <Score title={strings.matches_series_score_tooltip}>
                    <small title={strings.esports_format}>{format} <span aria-hidden="true">▾</span></small>
                    <strong>{row.team1Wins} : {row.team2Wins}</strong>
                  </Score>
                  {team(row.team2Id, row.team2, row.team2Wins >= winsNeeded, true)}

                </summary>
                <SeriesGames series={row} teams={teams} expanded={expanded} />
              </Series>
  );
}
