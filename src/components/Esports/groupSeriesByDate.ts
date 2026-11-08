/**
 * @file groupSeriesByDate.ts
 * @description Groups series chronologically by their first match’s local calendar date without mutating the input.
 */

import { MatchSeries } from "../Matches/series";

/**
 * Groups series by the local date of their earliest recorded game.
 * @param series Series to group; input order and contents are preserved.
 * @param newestFirst Whether to order dates and series newest first. Defaults to oldest first.
 * @returns Date groups and their series ordered by start time in the requested direction.
 * @example
 * // Other MatchSeries fields are omitted here for readability.
 * // Date constructors use local time, matching the grouping behavior.
 * const input = [
 *   { key: "19719:3", first_match_time: new Date(2026, 9, 21, 10).getTime() / 1000 },
 *   { key: "19719:1", first_match_time: new Date(2026, 9, 20, 9).getTime() / 1000 },
 *   { key: "19719:2", first_match_time: new Date(2026, 9, 20, 15).getTime() / 1000 },
 * ];
 * groupSeriesByDate(input);
 * // Returns:
 * // [
 * //   { date: "2026-10-20", series: [input[1], input[2]] },
 * //   { date: "2026-10-21", series: [input[0]] },
 * // ]
 * // Each series retains all its original fields; input is not reordered.
 *
 * @example
 * groupSeriesByDate([]);
 * // Returns: []
 */
export const groupSeriesByDate = (series: MatchSeries[], newestFirst = false) => {
  const days = new Map<string, MatchSeries[]>();
  [...series].sort((a, b) => (newestFirst ? -1 : 1) * (a.first_match_time - b.first_match_time)).forEach((row) => {
    const start = new Date(row.first_match_time * 1000);
    const date = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`;
    const rows = days.get(date) || [];
    rows.push(row);
    days.set(date, rows);
  });
  return Array.from(days, ([date, rows]) => ({ date, series: rows }));
};
