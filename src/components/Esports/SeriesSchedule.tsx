/**
 * @file SeriesSchedule.tsx
 * @description Displays series in collapsible daily groups with team logos, scores, formats, and numbered game links.
 * @remarks Dates use the viewer’s local timezone. The latest series is expanded by default.
 */

import React from "react";
import styled from "styled-components";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import constants from "../constants";
import SeriesAccordion from "./SeriesAccordion";
import { groupSeriesByDate } from "./groupSeriesByDate";

/**
 * Arranges chronological date groups in two columns, stacking on mobile.
 * @example
 * <Schedule>{dateCards}</Schedule>
 */
const Schedule = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 16px;
  @media (max-width: 680px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

/**
 * Provides a collapsible date group with an accessible summary control.
 * @example
 * <Day open><summary>October 21, 2026</summary>{seriesRows}</Day>
 */
const Day = styled.details`
  min-width: 0;
  > summary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 0;
    margin-bottom: 4px;
    border-bottom: 0;
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
  const latestSeries = series.reduce<MatchSeries | undefined>((latest, row) =>
    !latest || row.first_match_time > latest.first_match_time ? row : latest,
  undefined);
  return (
    <Schedule>
      {groupSeriesByDate(series).map(({ date, series: rows }) => (
        <Day key={date} open>
          <summary><CalendarMonthIcon aria-hidden="true" /><time dateTime={date}>{new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</time><ExpandMoreIcon aria-hidden="true" /></summary>
          {rows.map((row) => {
            return <SeriesAccordion key={row.key} series={row} teams={teams} showMetadata defaultOpen={row.key === latestSeries?.key} />;
          })}
        </Day>
      ))}
    </Schedule>
  );
}
