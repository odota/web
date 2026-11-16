import React, { useState } from "react";
import { Link } from "react-router-dom";
import useStrings from "../../hooks/useStrings.hook";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TeamLogo from "../TeamLogo/TeamLogo";
import SeriesGames from "./SeriesGames";
import styles from "./SeriesAccordion.module.css";

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
    return id ? <Link className={`${winner ? styles.winner : ""}${opponent ? ` ${styles.opponent}` : ""}`.trim()} to={`/teams/${id}`}>{label}</Link>
      : <span className={`${styles.team}${winner ? ` ${styles.winner}` : ""}${opponent ? ` ${styles.opponent}` : ""}`}>{label}</span>;
  };
            const type = row.series_type;
            const knownFormat = typeof type === "number" && Number.isInteger(type) && type >= 0 && type <= 2;
            const format = knownFormat ? `BEST OF ${type * 2 + 1}` : strings.general_unknown;
            const winsNeeded = knownFormat ? type + 1 : Infinity;
  return (
              <details className={styles.series} key={row.key} open={expanded} onToggle={(event) => {
                const open = event.currentTarget.open;
                setExpanded(open);
              }}>
                <summary aria-label={`${row.team1 || strings.general_unknown} ${row.team1Wins} – ${row.team2Wins} ${row.team2 || strings.general_unknown}`}>
                  {showMetadata && <div className={styles.metadata}>
                    <span>{row.series_id && row.series_id > 0 ? `${row.league_name || strings.general_unknown} #${row.series_id}` : strings.esports_standalone_match}</span>
                    <time dateTime={new Date(row.first_match_time * 1000).toISOString()}>{new Date(row.first_match_time * 1000).toLocaleString(undefined, { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</time>
                  </div>}
                  {team(row.team1Id, row.team1, row.team1Wins >= winsNeeded)}
                  <span className={styles.score} title={strings.matches_series_score_tooltip}>
                    <small title={strings.esports_format}>{format} <span aria-hidden="true">▾</span></small>
                    <strong>{row.team1Wins} : {row.team2Wins}</strong>
                  </span>
                  {team(row.team2Id, row.team2, row.team2Wins >= winsNeeded, true)}

                </summary>
                <SeriesGames series={row} teams={teams} expanded={expanded} />
              </details>
  );
}
