/**
 * @file SeriesSchedule.tsx
 * @description Displays series in collapsible daily groups with team logos, scores, formats, and numbered game links.
 * @remarks Dates use the viewer’s local timezone. The latest series is expanded by default.
 */

import React from "react";
import { CalendarMonthIcon, ExpandMoreIcon } from "../ui";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import SeriesAccordion from "./SeriesAccordion";
import { groupSeriesByDate } from "./groupSeriesByDate";
import styles from "./SeriesSchedule.module.css";

/**
 * Series and team metadata rendered by the daily schedule.
 * @example
 * const props: SeriesScheduleProps = { series: [], teams: [] };
 */
export type SeriesScheduleProps = {
  singleColumn?: boolean;
  newestFirst?: boolean;
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
export default function SeriesSchedule({ series, teams, singleColumn = false, newestFirst = false }: SeriesScheduleProps) {
  const latestSeries = series.reduce<MatchSeries | undefined>((latest, row) =>
    !latest || row.first_match_time > latest.first_match_time ? row : latest,
  undefined);
  return (
    <div className={`${styles.schedule}${singleColumn ? ` ${styles.scheduleSingleColumn}` : ""}`}>
      {groupSeriesByDate(series, newestFirst).map(({ date, series: rows }) => (
        <details className={styles.day} key={date} open>
          <summary><CalendarMonthIcon aria-hidden="true" /><time dateTime={date}>{new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</time><ExpandMoreIcon aria-hidden="true" /></summary>
          {rows.map((row) => {
            return <SeriesAccordion key={row.key} series={row} teams={teams} showMetadata defaultOpen={row.key === latestSeries?.key} />;
          })}
        </details>
      ))}
    </div>
  );
}
