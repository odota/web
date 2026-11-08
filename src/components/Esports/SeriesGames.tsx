import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import useStrings from "../../hooks/useStrings.hook";
import { MatchSeries } from "../Matches/series";
import { SeriesTeam } from "../Matches/Matches";
import TableLink from "../Table/TableLink";
import constants from "../constants";
import GameHeroes from "./GameHeroes";

/**
 * Styles expanded series metadata and vertically ordered game links.
 * @example
 * <Games>{numberedGameLinks}</Games>
 */
const Games = styled.div`
  padding: 14px;
  font-family: ${constants.fontFamilyFuturistic};
  border-top: 1px solid rgba(53, 217, 204, .3);
  background: linear-gradient(135deg, #0b2428, #091519);
  .series-meta {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px 12px;
    margin-bottom: 12px;
    color: #c3dbdc;
    font-size: 12px;
    line-height: 1.5;
    > span:last-child { color: #8ba9ac; font-variant-numeric: tabular-nums; }
  }
  .game-links {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
    > a {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      border: 1px solid rgba(53, 217, 204, .25);
      border-radius: 3px;
      background: rgba(53, 217, 204, .05);
      color: #edffff;
      text-decoration: none;
      transition: background .15s, border-color .15s;
      &:hover { background: rgba(53, 217, 204, .14); border-color: #35d9cc; }
      &:focus-visible { outline: 2px solid #71fff0; outline-offset: 2px; }
      > .game-preview { display: grid; gap: 10px; min-width: 0; flex: 1; }
      .game-heading { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px; }
      .game-team { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 12px; }
      .game-team, .game-team > span { font-family: ${constants.fontFamilyFuturistic}; }
      .game-team > span { overflow-wrap: anywhere; }
      .game-team small { margin-left: auto; flex-shrink: 0; }
      .game-winner { color: #71fff0; }
      .game-team .winner-label { margin-left: 0; color: #75d890; }
      .game-heroes { display: grid; gap: 12px; }
      .hero-lineup { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 12px; }
      .hero-lineup > .game-team { order: 1; justify-content: flex-end; text-align: right; }
      .hero-portraits { display: flex; gap: 4px; min-width: 0; }
      .hero-portraits img, .hero-placeholder { width: clamp(28px, 3vw, 44px); aspect-ratio: 16 / 9; object-fit: cover; border-radius: 2px; }
      .hero-placeholder { background: rgba(169, 194, 197, .12); }
      .game-info { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 11px; color: #a9c2c5; }
      .game-duration { display: inline-flex; align-items: center; gap: 5px; color: #73bfff; }
      .game-duration svg { width: 14px; height: 14px; }
      .game-info time { margin-left: auto; color: #73bfff; }
      strong { font-size: 12px; color: #71fff0; }
      small { font-size: 11px; color: #a9c2c5; overflow-wrap: anywhere; }
      > svg { margin-left: auto; flex-shrink: 0; }
    }
  }
`;

/** Shared expanded game cards for series and match lists. */
export default function SeriesGames({ series: row, teams, expanded }: { series: MatchSeries; teams: SeriesTeam[]; expanded: boolean }) {
  const strings = useStrings();
  return (
                <Games className="series-games">
                  <div className="series-meta">
                    <span>{row.league_name}</span>
                    <span>{row.series_id ? `#${row.series_id}` : strings.esports_standalone_match}</span>
                  </div>
                  <div className="game-links">
                    {row.games.map((game, index) => (
                      <TableLink key={game.match_id} to={`/matches/${game.match_id}`}>
                        <span className="game-preview">
                          <span className="game-heading"><strong>{strings.matches_game} {index + 1}</strong><small>#{game.match_id}</small></span>
                          {expanded && <GameHeroes game={game} teams={teams} />}
                          <span className="game-info">
                            <span className="game-duration" title={strings.heading_duration} aria-label={`${strings.heading_duration}: ${Math.floor(game.duration / 60)}:${String(Math.floor(game.duration % 60)).padStart(2, "0")}`}><AccessTimeIcon aria-hidden="true" />{Math.floor(game.duration / 60)}:{String(Math.floor(game.duration % 60)).padStart(2, "0")}</span>
                            <time dateTime={new Date(game.start_time * 1000).toISOString()}>{new Date(game.start_time * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}</time>
                          </span>
                        </span>
                      </TableLink>
                    ))}
                  </div>
                </Games>
  );
}
