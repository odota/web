/**
 * @file ResponsiveMatchesTable.tsx
 * @description Displays the original desktop table or mobile match cards.
 */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import config from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";
import { heroes } from "dotaconstants";
import styled from "styled-components";
import Table from "../Table/Table";
import TableSkeleton from "../Skeletons/TableSkeleton";
import TeamLogo from "../TeamLogo/TeamLogo";
import HeroImage from "../Visualizations/HeroImage";
import FromNowTooltip from "../Visualizations/FromNowTooltip";
import useStrings from "../../hooks/useStrings.hook";
import { formatSeconds, rankTierToString } from "../../utility";
import constants from "../constants";
import { getPage, getTeamPicks, type DraftPlayer, type MatchSide, type MatchMetadata } from "./responsiveMatches";

const Styled = styled.section`
  min-width: 0;
  font-family: ${constants.fontFamilyFuturistic}, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  /* Extend cards across the App body's 25px side gutters. */
  .mobile-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0; width: calc(100% + 50px); padding: 0; margin: 0 -25px; list-style: none; }
  .mobile-match { display: block; box-sizing: border-box; width: 100%; padding: 24px 25px; border: 0; border-radius: 0; background: ${constants.primarySurfaceColor}; color: ${constants.textColorPrimary}; }
  .mobile-list > li + li { border-top: 1px solid color-mix(in srgb, ${constants.colorBlueGray} 45%, ${constants.dividerColor}); }
  .mobile-match:hover, .mobile-match:focus-visible { background: color-mix(in srgb, ${constants.primaryLinkColor} 9%, ${constants.primarySurfaceColor}); text-decoration: none; }
  a:focus-visible, button:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 2px; }
  .mobile-eyebrow { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; color: ${constants.textColorSecondary}; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
  .mobile-match-metadata { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; color: ${constants.textColorSecondary}; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
  .mobile-match-metadata > span { display: inline-flex; align-items: center; gap: 6px; }
  .mobile-eyebrow > span + span::before { content: "·"; margin-right: 6px; }
  .mobile-match-metadata > span + span::before { content: "·"; }
  .mobile-mode svg, .mobile-duration svg { width: 16px; height: 16px; flex-shrink: 0; }
  .mobile-meta { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; color: ${constants.textColorSecondary}; font-size: 11px; }
  .mobile-duration { white-space: nowrap; font-variant-numeric: tabular-nums; }
  .mobile-team + .mobile-team { margin-top: 12px; }
  .mobile-label { margin-bottom: 5px; color: ${constants.textColorSecondary}; font-size: 10px; letter-spacing: 0.06em; text-transform: uppercase; }
  .mobile-name { display: flex; align-items: center; gap: 8px; min-width: 0; font-size: 12px; font-weight: 400; }
  .mobile-name > span { overflow-wrap: anywhere; }
  .mobile-win { font-weight: 700; margin-left: auto; color: ${constants.colorGreen}; font-size: 10px; }
  .mobile-heroes { display: flex; gap: 4px; }
  .mobile-name + .mobile-heroes, .mobile-name + .mobile-heroes-unavailable { margin-top: 8px; }
  .mobile-heroes-unavailable { color: ${constants.textColorSecondary}; font-size: 10px; }
  .mobile-heroes .hero-placeholder { width: clamp(28px, 10vw, 48px); aspect-ratio: 256 / 144; height: auto; }
  .mobile-heroes img { width: clamp(28px, 10vw, 48px); border-radius: 3px; }
  .mobile-context { margin-top: 14px; color: ${constants.textColorSecondary}; font-size: 12px; overflow-wrap: anywhere; }
  .mobile-rank { display: inline-flex; align-items: center; gap: 6px; }
  .mobile-rank img { width: 28px; height: 28px; object-fit: contain; }
  .mobile-footer .mobile-rank img { width: 16px; height: 16px; }
  .mobile-footer-details > .mobile-rank::before { content: "·"; }
  .mobile-footer { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; padding-top: 10px; border-top: 1px solid color-mix(in srgb, ${constants.colorBlueGray} 45%, ${constants.dividerColor}); color: ${constants.textColorSecondary}; font-size: 10px; }
  .mobile-footer-details { display: flex; align-items: center; flex-wrap: wrap; gap: 6px; min-width: 0; }
  .mobile-match-id { white-space: nowrap; }
  .mobile-footer-action { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; }
  .mobile-open { flex-shrink: 0; color: ${constants.primaryLinkColor}; font-size: 12px; }
  .mobile-pages { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 16px; color: ${constants.textColorSecondary}; font-size: 12px; }
  .mobile-pages button { min-height: 44px; padding: 8px 12px; border: 1px solid color-mix(in srgb, ${constants.colorBlueGray} 45%, ${constants.dividerColor}); border-radius: 6px; background: ${constants.primarySurfaceColor}; color: ${constants.primaryLinkColor}; font: inherit; cursor: pointer; }
  .mobile-pages button:disabled { opacity: 0.4; cursor: default; }
  .mobile-status { padding: 24px 8px; color: ${constants.textColorSecondary}; text-align: center; }
`;

/** Shares pending and successful requests between team rows and page visits. */
type MatchDetails = MatchMetadata & { players?: DraftPlayer[] };
const matchDetails = new Map<number, Promise<MatchDetails>>();

/**
 * Loads player picks from match details, which are absent from the pro match list.
 * Failed requests are evicted so a later mount can retry them.
 * @param matchId OpenDota match ID.
 * @returns A shared promise resolving to match metadata and player records.
 */
function getMatchDetails(matchId: number) {
  const cached = matchDetails.get(matchId);
  if (cached) return cached;

  const request = fetch(`${config.VITE_API_HOST}/api/matches/${matchId}`, { credentials: "include" })
    .then((response) => {
      if (!response.ok) throw new Error(String(response.status));
      return response.json();
    })
    .then((match) => match as MatchDetails)
    .catch((error) => {
      matchDetails.delete(matchId);
      throw error;
    });
  matchDetails.set(matchId, request);
  return request;
}

/** Keeps request effects separate from lineup selection and rendering. */
function useMatchDetails(matchId: number, enabled = true) {
  const [result, setResult] = useState<{ matchId: number; details: MatchDetails } | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    getMatchDetails(matchId).then(
      (details) => { if (active) setResult({ matchId, details }); },
      () => { if (active) setResult({ matchId, details: {} }); },
    );
    return () => { active = false; };
  }, [matchId, enabled]);
  return result?.matchId === matchId ? result.details : null;
}

/**
 * Renders one professional team's heroes in player-slot order.
 * Shows skeletons while loading and a fallback when picks are unavailable.
 * @param props Match identity and the side whose heroes should be displayed.
 * @param props.matchId OpenDota match ID used for the cached detail request.
 * @param props.side Radiant or Dire; slots below 128 belong to Radiant.
 * @returns Hero portraits, loading placeholders, or an unavailable message.
 */
function ProfessionalHeroes({ matchId, side }: { matchId: number; side: MatchSide }) {
  const details = useMatchDetails(matchId);
  const players = details ? details.players || [] : null;
  if (players === null) return <div className="mobile-heroes" aria-label="Loading hero picks" aria-busy="true">
    {Array.from({ length: 5 }, (_, index) => <Skeleton className="hero-placeholder" variant="rectangular" key={index} />)}
  </div>;
  const picks = getTeamPicks(players, side);
  if (!picks.length) return <div className="mobile-heroes-unavailable">Hero picks unavailable</div>;
  return <div className="mobile-heroes" aria-label={`${side} hero picks`}>
    {picks.map((player) => <HeroImage key={player.player_slot} id={String(player.hero_id)} alt={heroes[String(player.hero_id) as keyof Heroes].localized_name} />)}
  </div>;
}

/** Displays game mode and duration in the footer. */
function MatchMetadataLabel({ match }: { match: MatchMetadata & { match_id: number; duration: number; leagueid?: number; league_name?: string } }) {
  const strings = useStrings();
  const details = useMatchDetails(match.match_id, match.game_mode == null);
  const mode = strings[`game_mode_${match.game_mode ?? details?.game_mode}` as keyof Strings];
  return <div className="mobile-match-metadata">
    {mode && <span className="mobile-mode"><SportsEsportsIcon aria-hidden="true" />{mode}</span>}
    <span className="mobile-duration"><AccessTimeIcon aria-hidden="true" />{formatSeconds(match.duration)}</span>
  </div>;
}

/**
 * Displays twenty tappable match cards per page with the shared table loader.
 * Public matches supply hero arrays; professional matches load picks on demand.
 * @param props Table props supplying match data and loading state.
 * @param props.data Professional or public match records, in display order.
 * @param props.loading Whether the match list is loading.
 * @param props.loadingText Message passed to the existing table skeleton.
 * @returns Mobile cards with team details, rank or league, and pagination.
 */
function MobileMatches({ data, loading, loadingText }: React.ComponentProps<typeof Table>) {
  const strings = useStrings();
  const [page, setPage] = useState(0);
  const { items, pages, currentPage, start, end } = getPage(data, page);
  return <Styled aria-label="Matches" aria-busy={loading}>
    {loading ? <TableSkeleton text={loadingText} /> : <>
      {!data.length && <p className="mobile-status" role="status">No matches available</p>}
      <ul className="mobile-list">
        {items.map((match) => <li key={match.match_id}>
          <Link className="mobile-match" to={`/matches/${match.match_id}`}>
            <div className="mobile-meta"><FromNowTooltip timestamp={match.start_time + match.duration} /><span className="mobile-match-id">· #{match.match_id}</span></div>
            <div className="mobile-eyebrow">
              <span>{match.leagueid || match.league_name ? strings.hero_pro_tab : "Public"}</span>
              {match.league_name && <span>{match.league_name}</span>}
            </div>
            {(["radiant", "dire"] as const).map((side) => {
              const lineup = match[`${side}_team`];
              const winner = typeof match.radiant_win === "boolean" && match.radiant_win === (side === "radiant");
              return <div className="mobile-team" key={side}>
                <div className="mobile-label">{side === "radiant" ? strings.general_radiant : strings.general_dire}</div>
                {Array.isArray(lineup) ? <div className="mobile-heroes">{lineup.map((id: number) => heroes[String(id) as keyof Heroes] && <HeroImage key={id} id={String(id)} alt={heroes[String(id) as keyof Heroes].localized_name} />)}</div> : <div className="mobile-name">
                  <TeamLogo teamId={match[`${side}_team_id`]} style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }} />
                  <span>{match[`${side}_name`] || strings.general_unknown}</span>
                  {winner && <span className="mobile-win">WIN</span>}
                </div>}
                {!Array.isArray(lineup) && <ProfessionalHeroes matchId={match.match_id} side={side} />}
              </div>;
            })}
            {!!(match.leagueid || match.league_name) && !!match.avg_rank_tier && <div className="mobile-context"><span className="mobile-rank"><img src={`/assets/images/dota2/rank_icons/rank_icon_${Math.floor(match.avg_rank_tier / 10)}.png`} alt="" />{rankTierToString(match.avg_rank_tier)}</span></div>}
            <div className="mobile-footer">
              <div className="mobile-footer-details">
                <MatchMetadataLabel match={match} />
                {!match.leagueid && !match.league_name && !!match.avg_rank_tier && <span className="mobile-rank"><img src={`/assets/images/dota2/rank_icons/rank_icon_${Math.floor(match.avg_rank_tier / 10)}.png`} alt="" />{rankTierToString(match.avg_rank_tier)}</span>}
              </div>
              <span className="mobile-footer-action">
                <span className="mobile-open">View match ›</span>
              </span>
            </div>
          </Link>
        </li>)}
      </ul>
      {!!data.length && <nav className="mobile-pages" aria-label="Match pages">
        <button type="button" disabled={!currentPage} onClick={() => setPage(currentPage - 1)}>Previous</button>
        <span>{start}–{end} of {data.length}</span>
        <button type="button" disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>Next</button>
      </nav>}
    </>}
  </Styled>;
}

/**
 * Selects mobile cards at widths up to 767px and the shared table above that.
 * Desktop table props are forwarded unchanged. Mobile pagination uses twenty rows.
 * @param props Props accepted by the shared Table component.
 * @returns The match presentation appropriate for the current viewport.
 * @example
 * <ResponsiveMatchesTable data={matches} columns={columns} loading={loading} />
 */
export default function ResponsiveMatchesTable(props: React.ComponentProps<typeof Table>) {
  const mobile = useMediaQuery("(max-width: 767px)");
  return mobile ? <MobileMatches {...props} /> : <Table {...props} />;
}
