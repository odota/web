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
import Table from "../Table/Table";
import TableSkeleton from "../Skeletons/TableSkeleton";
import TeamLogo from "../TeamLogo/TeamLogo";
import HeroImage from "../Visualizations/HeroImage";
import FromNowTooltip from "../Visualizations/FromNowTooltip";
import useStrings from "../../hooks/useStrings.hook";
import { formatSeconds, rankTierToString } from "../../utility";
import { getPage, getTeamPicks, type DraftPlayer, type MatchSide, type MatchMetadata } from "./responsiveMatches";
import styles from "./ResponsiveMatchesTable.module.css";

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
  if (players === null) return <div className={styles.mobileHeroes} aria-label="Loading hero picks" aria-busy="true">
    {Array.from({ length: 5 }, (_, index) => <Skeleton className={styles.heroPlaceholder} variant="rectangular" key={index} />)}
  </div>;
  const picks = getTeamPicks(players, side);
  if (!picks.length) return <div className={styles.mobileHeroesUnavailable}>Hero picks unavailable</div>;
  return <div className={styles.mobileHeroes} aria-label={`${side} hero picks`}>
    {picks.map((player) => <HeroImage key={player.player_slot} id={String(player.hero_id)} alt={heroes[String(player.hero_id) as keyof Heroes].localized_name} />)}
  </div>;
}

/** Displays game mode and duration in the footer. */
function MatchMetadataLabel({ match }: { match: MatchMetadata & { match_id: number; duration: number; leagueid?: number; league_name?: string } }) {
  const strings = useStrings();
  const details = useMatchDetails(match.match_id, match.game_mode == null);
  const mode = strings[`game_mode_${match.game_mode ?? details?.game_mode}` as keyof Strings];
  return <div className={styles.mobileMatchMetadata}>
    {mode && <span className={styles.mobileMode}><SportsEsportsIcon aria-hidden="true" />{mode}</span>}
    <span className={styles.mobileDuration}><AccessTimeIcon aria-hidden="true" />{formatSeconds(match.duration)}</span>
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
  return <section className={styles.responsiveMatchesTable} aria-label="Matches" aria-busy={loading}>
    {loading ? <TableSkeleton text={loadingText} /> : <>
      {!data.length && <p className={styles.mobileStatus} role="status">No matches available</p>}
      <ul className={styles.mobileList}>
        {items.map((match) => <li key={match.match_id}>
          <Link className={styles.mobileMatch} to={`/matches/${match.match_id}`}>
            <div className={styles.mobileMeta}><FromNowTooltip timestamp={match.start_time + match.duration} /><span className={styles.mobileMatchId}>· #{match.match_id}</span></div>
            <div className={styles.mobileEyebrow}>
              <span>{match.leagueid || match.league_name ? strings.hero_pro_tab : "Public"}</span>
              {match.league_name && <span>{match.league_name}</span>}
            </div>
            {(["radiant", "dire"] as const).map((side) => {
              const lineup = match[`${side}_team`];
              const winner = typeof match.radiant_win === "boolean" && match.radiant_win === (side === "radiant");
              return <div className={styles.mobileTeam} key={side}>
                <div className={styles.mobileLabel}>{side === "radiant" ? strings.general_radiant : strings.general_dire}</div>
                {Array.isArray(lineup) ? <div className={styles.mobileHeroes}>{lineup.map((id: number) => heroes[String(id) as keyof Heroes] && <HeroImage key={id} id={String(id)} alt={heroes[String(id) as keyof Heroes].localized_name} />)}</div> : <div className={styles.mobileName}>
                  <TeamLogo teamId={match[`${side}_team_id`]} style={{ width: 24, height: 24, objectFit: "contain", flexShrink: 0 }} />
                  <span>{match[`${side}_name`] || strings.general_unknown}</span>
                  {winner && <span className={styles.mobileWin}>WIN</span>}
                </div>}
                {!Array.isArray(lineup) && <ProfessionalHeroes matchId={match.match_id} side={side} />}
              </div>;
            })}
            {!!(match.leagueid || match.league_name) && !!match.avg_rank_tier && <div className={styles.mobileContext}><span className={styles.mobileRank}><img src={`/assets/images/dota2/rank_icons/rank_icon_${Math.floor(match.avg_rank_tier / 10)}.png`} alt="" />{rankTierToString(match.avg_rank_tier)}</span></div>}
            <div className={styles.mobileFooter}>
              <div className={styles.mobileFooterDetails}>
                <MatchMetadataLabel match={match} />
                {!match.leagueid && !match.league_name && !!match.avg_rank_tier && <span className={styles.mobileRank}><img src={`/assets/images/dota2/rank_icons/rank_icon_${Math.floor(match.avg_rank_tier / 10)}.png`} alt="" />{rankTierToString(match.avg_rank_tier)}</span>}
              </div>
              <span className={styles.mobileFooterAction}>
                <span className={styles.mobileOpen}>View match ›</span>
              </span>
            </div>
          </Link>
        </li>)}
      </ul>
      {!!data.length && <nav className={styles.mobilePages} aria-label="Match pages">
        <button type="button" disabled={!currentPage} onClick={() => setPage(currentPage - 1)}>Previous</button>
        <span>{start}–{end} of {data.length}</span>
        <button type="button" disabled={currentPage + 1 >= pages} onClick={() => setPage(currentPage + 1)}>Next</button>
      </nav>}
    </>}
  </section>;
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
