/**
 * @file SeriesSchedule.tsx
 * @description Displays series in collapsible daily groups with team logos, scores, formats, and numbered game links.
 * @remarks Dates use the viewer’s local timezone. The latest series is expanded by default.
 */

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useStrings from "../../hooks/useStrings.hook";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TeamLogo from "../TeamLogo/TeamLogo";
import TableLink from "../Table/TableLink";
import constants from "../constants";
import { groupSeriesByDate } from "./groupSeriesByDate";

/**
 * Arranges date cards in a responsive schedule grid.
 * @example
 * <Schedule>{dateCards}</Schedule>
 */
const Schedule = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
  align-items: start;
  gap: 16px;
`;

/**
 * Provides a collapsible date group with an accessible summary control.
 * @example
 * <Day open><summary>October 21, 2026</summary>{seriesRows}</Day>
 */
const Day = styled.details`
  border: 1px solid ${constants.dividerColor};
  border-radius: 3px;
  overflow: hidden;
  > summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px;
    background: ${constants.tableHeaderSurfaceColor};
    font-family: ${constants.fontFamilyFuturistic};
    font-size: ${constants.fontSizeMedium};
    cursor: pointer;
    list-style: none;
    svg:first-child { color: ${constants.colorBlue}; width: 18px; height: 18px; }
    svg:last-child { margin-left: auto; width: 18px; height: 18px; }
    &::-webkit-details-marker { display: none; }
  }
  &[open] > summary > svg:last-child { transform: rotate(180deg); }
  summary:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: -2px; }
`;

/**
 * Provides a collapsible matchup row with opposing teams and game details.
 * @example
 * <Series open><summary>Alpha 2 – 1 Beta</summary>{gameLinks}</Series>
 */
const Series = styled.details`
  border-top: 1px solid ${constants.dividerColor};
  > summary {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 64px minmax(0, 1fr);
    align-items: stretch;
    cursor: pointer;
    list-style: none;
    &::-webkit-details-marker { display: none; }
    &:hover { background: ${constants.secondarySurfaceColor}; }
    > a, > span.team {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      padding: 10px 8px;
      color: ${constants.textColorPrimary};
      font-family: ${constants.fontFamilyFuturistic};
      font-size: ${constants.fontSizeSmall};
      overflow-wrap: anywhere;
    }
    > :last-child { flex-direction: row-reverse; text-align: right; }
    .winner { background: rgba(90, 180, 110, .14); color: ${constants.colorGreen}; }
    img, .team-logo { width: 28px; height: 28px; flex-shrink: 0; object-fit: contain; }
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
  gap: 3px;
  border-left: 1px solid ${constants.dividerColor};
  border-right: 1px solid ${constants.dividerColor};
  font-variant-numeric: tabular-nums;
  strong { font-size: ${constants.fontSizeMedium}; }
  small { color: ${constants.textColorSecondary}; font-size: ${constants.fontSizeTiny}; }
`;

/**
 * Styles expanded series metadata and vertically ordered game links.
 * @example
 * <Games>{numberedGameLinks}</Games>
 */
const Games = styled.div`
  padding: 12px;
  background: ${constants.secondarySurfaceColor};
  .series-meta { display: block; color: ${constants.textColorSecondary}; margin-bottom: 8px; }
  > a { display: block; margin-top: 6px; }
`;

/**
 * Series and team metadata rendered by the daily schedule.
 * @example
 * const props: SeriesScheduleProps = { series: [], teams: [] };
 */
export type SeriesScheduleProps = {
  /** Grouped series with scores and chronological game records. */
  series: MatchSeries[];
  /** Team records used to resolve logo URLs. */
  teams: SeriesTeam[];
};

/**
 * Renders series by local start date, expanding the latest series initially.
 * @param props Series schedule data.
 * @param props.series Grouped series, including team scores and chronological game lists.
 * @param props.teams Team records used to resolve logo URLs.
 * @returns Collapsible date cards containing team matchups and game links.
 * @example
 * const series = groupMatchesBySeries(leagueMatches);
 * <SeriesSchedule series={series} teams={teams} />
 * // Groups matches by date and opens the latest series.
 */
export default function SeriesSchedule({ series, teams }: SeriesScheduleProps) {
  const strings = useStrings();
  const latestSeries = series.reduce<MatchSeries | undefined>((latest, row) =>
    !latest || row.first_match_time > latest.first_match_time ? row : latest,
  undefined);
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
  const team = (id: number | null | undefined, name: string | null, winner: boolean) => {
    const label = <><span>{name || strings.general_unknown}</span><TeamLogo teamId={id} src={teams.find((item) => item.team_id === id)?.logo_url} style={{ width: 28, height: 28, flexShrink: 0, objectFit: "contain" }} /></>;
    return id ? <Link className={winner ? "winner" : undefined} to={`/teams/${id}`}>{label}</Link>
      : <span className={`team ${winner ? "winner" : ""}`}>{label}</span>;
  };
  return (
    <Schedule>
      {groupSeriesByDate(series).map(({ date, series: rows }) => (
        <Day key={date} open>
          <summary><CalendarMonthIcon aria-hidden="true" /><time dateTime={date}>{new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</time><ExpandMoreIcon aria-hidden="true" /></summary>
          {rows.map((row) => {
            const type = row.series_type;
            const knownFormat = typeof type === "number" && Number.isInteger(type) && type >= 0 && type <= 2;
            const format = knownFormat ? `BO${type * 2 + 1}` : strings.general_unknown;
            const winsNeeded = knownFormat ? type + 1 : Infinity;
            return (
              <Series key={row.key} open={row.key === latestSeries?.key}>
                <summary aria-label={`${row.team1 || strings.general_unknown} ${row.team1Wins} – ${row.team2Wins} ${row.team2 || strings.general_unknown}`}>
                  {team(row.team1Id, row.team1, row.team1Wins >= winsNeeded)}
                  <Score title={strings.matches_series_score_tooltip}>
                    <strong>{row.team1Wins} – {row.team2Wins}</strong>
                    <small title={strings.esports_format}>{format} <span aria-hidden="true">▾</span></small>
                  </Score>
                  {team(row.team2Id, row.team2, row.team2Wins >= winsNeeded)}
                </summary>
                <Games className="series-games">
                  <span className="series-meta">{row.league_name} · {row.series_id ? `#${row.series_id}` : strings.esports_standalone_match}</span>
                  <span className="series-meta">{strings.esports_format}: {format}</span>
                  {row.games.map((game, index) => <TableLink key={game.match_id} to={`/matches/${game.match_id}`}>{strings.matches_game} {index + 1} · {game.match_id}</TableLink>)}
                </Games>
              </Series>
            );
          })}
        </Day>
      ))}
    </Schedule>
  );
}
