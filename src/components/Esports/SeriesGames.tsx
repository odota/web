import React from "react";
import { AccessTimeIcon } from "../ui";
import useStrings from "../../hooks/useStrings.hook";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TableLink from "../Table/TableLink";
import GameHeroes from "./GameHeroes";
import styles from "./SeriesGames.module.css";

/** Shared expanded game cards for series and match lists. */
export default function SeriesGames({ series: row, teams, expanded }: { series: MatchSeries; teams: SeriesTeam[]; expanded: boolean }) {
  const strings = useStrings();
  return (
                <div className={`${styles.games} series-games`}>
                  <div className={styles.seriesMeta}>
                    <span>{row.league_name}</span>
                    <span>{row.series_id ? `#${row.series_id}` : strings.esports_standalone_match}</span>
                  </div>
                  <div className={styles.gameLinks}>
                    {row.games.map((game, index) => (
                      <TableLink key={game.match_id} to={`/matches/${game.match_id}`}>
                        <span className={styles.gamePreview}>
                          <span className={styles.gameHeading}><strong>{strings.matches_game} {index + 1}</strong><small>#{game.match_id}</small></span>
                          {expanded && <GameHeroes game={game} teams={teams} />}
                          <span className={styles.gameInfo}>
                            <span className={styles.gameDuration} title={strings.heading_duration} aria-label={`${strings.heading_duration}: ${Math.floor(game.duration / 60)}:${String(Math.floor(game.duration % 60)).padStart(2, "0")}`}><AccessTimeIcon aria-hidden="true" />{Math.floor(game.duration / 60)}:{String(Math.floor(game.duration % 60)).padStart(2, "0")}</span>
                            <time dateTime={new Date(game.start_time * 1000).toISOString()}>{new Date(game.start_time * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</time>
                          </span>
                        </span>
                      </TableLink>
                    ))}
                  </div>
                </div>
  );
}
