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

const RANK_ICONS_PATH = "/assets/images/dota2/rank_icons";

/**
 * Builds the medal image source for a rank tier.
 * @example
 * getRankIconSrc(75);
 * // Returns "/assets/images/dota2/rank_icons/rank_icon_7.png".
 */
function getRankIconSrc(rankTier: number) {
  return `${RANK_ICONS_PATH}/rank_icon_${Math.floor(rankTier / 10)}.png`;
}

/** Shares pending and successful requests between team rows and page visits. */
type MatchDetails = MatchMetadata & { players?: DraftPlayer[]; radiant_score?: number; dire_score?: number };
const matchDetails = new Map<number, Promise<MatchDetails>>();

/**
 * Resolves the league title or the appropriate match category.
 * @example
 * getMobileHeading({ league_name: "The International" }, strings);
 * // Returns "The International".
 * getMobileHeading({ leagueid: 123 }, strings);
 * // Returns strings.hero_pro_tab.
 * getMobileHeading({}, strings);
 * // Returns "Public match".
 */
function getMobileHeading(match: { league_name?: string; leagueid?: number }, strings: Strings) {
  return match.league_name || (match.leagueid ? strings.hero_pro_tab : "Public match");
}

/**
 * Applies result styling only when the match has a known winner.
 * @example
 * getTeamClassName(true, "radiant");
 * // Returns `${styles.mobileTeam} ${styles.isWinner}`.
 * getTeamClassName(true, "dire");
 * // Returns `${styles.mobileTeam} ${styles.isLoser}`.
 * getTeamClassName(undefined, "radiant");
 * // Returns styles.mobileTeam.
 */
function getTeamClassName(radiantWin: boolean | null | undefined, side: MatchSide) {
  if (typeof radiantWin !== "boolean") return styles.mobileTeam;
  const resultClass = radiantWin === (side === "radiant") ? styles.isWinner : styles.isLoser;
  return `${styles.mobileTeam} ${resultClass}`;
}

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
  if (!picks.length) return <div className={styles.mobileHeroesUnavailable}>Heroes unavailable</div>;
  return <div className={styles.mobileHeroes} aria-label={`${side} hero picks`}>
    {picks.map((player) => <HeroImage key={player.player_slot} id={String(player.hero_id)} alt={heroes[String(player.hero_id) as keyof Heroes].localized_name} />)}
  </div>;
}

/** Uses list scores when available and shares the existing detail request otherwise. */
function MatchScore({ match, side, winner }: { match: { match_id: number; radiant_score?: number; dire_score?: number }; side: MatchSide; winner: boolean }) {
  const score = match[`${side}_score`];
  const details = useMatchDetails(match.match_id, score == null);
  const value = score ?? details?.[`${side}_score`];
  return <span className={`${styles.mobileScore}${winner ? ` ${styles.isWinner}` : ""}`}>
    {winner && <span className={styles.mobileScoreMarker} aria-label="Winner">▸</span>}
    {value ?? "–"}
  </span>;
}

/** Displays game mode and duration in the card metadata. */
function MatchMetadataLabel({ match }: { match: MatchMetadata & { match_id: number; duration: number; leagueid?: number; league_name?: string } }) {
  const strings = useStrings();
  const details = useMatchDetails(match.match_id, match.game_mode == null);
  const mode = strings[`game_mode_${match.game_mode ?? details?.game_mode}` as keyof Strings];
  return <div className={styles.mobileMatchMetadata}>
    {mode && <span className={styles.mobileMode}><SportsEsportsIcon aria-hidden="true" />{mode}</span>}
    <span className={styles.mobileDuration}><AccessTimeIcon aria-hidden="true" />{formatSeconds(match.duration)}</span>
  </div>;
}

type MobileMatch = MatchMetadata & {
  match_id: number;
  duration: number;
  start_time: number;
  leagueid?: number;
  league_name?: string;
  avg_rank_tier?: number;
  radiant_win?: boolean | null;
  radiant_team?: number[];
  dire_team?: number[];
  radiant_team_id?: number;
  dire_team_id?: number;
  radiant_name?: string;
  dire_name?: string;
  radiant_score?: number;
  dire_score?: number;
};

function MobileMatchHeader({ match }: { match: MobileMatch }) {
  const strings = useStrings();
  return <div className={styles.mobileHeader}>
    <h2 className={styles.mobileHeading}>{getMobileHeading(match, strings)}</h2>
    <span className={styles.mobileMatchId}>#{match.match_id}</span>
  </div>;
}

function MobileMatchMetadata({ match }: { match: MobileMatch }) {
  return <div className={styles.mobileResult}>
    <div className={styles.mobileMeta}>
      {!!match.avg_rank_tier && <span className={styles.mobileRank}>
        <img src={getRankIconSrc(match.avg_rank_tier)} alt="" />
        {rankTierToString(match.avg_rank_tier)}
      </span>}
      <MatchMetadataLabel match={match} />
    </div>
  </div>;
}

function PublicMatchHeroes({ lineup }: { lineup: number[] }) {
  const validHeroes = lineup.filter((id) => heroes[String(id) as keyof Heroes]);
  if (!validHeroes.length) return <div className={styles.mobileHeroesUnavailable}>Heroes unavailable</div>;
  return <div className={styles.mobileHeroes}>
    {validHeroes.map((id) => <HeroImage key={id} id={String(id)} alt={heroes[String(id) as keyof Heroes].localized_name} />)}
  </div>;
}

function MobileMatchTeam({ match, side }: { match: MobileMatch; side: MatchSide }) {
  const strings = useStrings();
  const lineup = match[`${side}_team`];
  const winner = typeof match.radiant_win === "boolean" && match.radiant_win === (side === "radiant");
  return <div className={getTeamClassName(match.radiant_win, side)}>
    {Array.isArray(lineup) ? <>
      <div className={styles.mobileLabel}>{side === "radiant" ? strings.general_radiant : strings.general_dire}</div>
      <PublicMatchHeroes lineup={lineup} />
    </> : <>
      <div className={styles.mobileName}>
        <TeamLogo teamId={match[`${side}_team_id`]} style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }} />
        <span className={styles.mobileTeamName}>{match[`${side}_name`] || strings.general_unknown}</span>
        <MatchScore match={match} side={side} winner={winner} />
      </div>
      <ProfessionalHeroes matchId={match.match_id} side={side} />
    </>}
  </div>;
}

function MobileMatchFooter({ match }: { match: MobileMatch }) {
  return <div className={styles.mobileFooter}>
    <div className={styles.mobileFooterDetails}>
      <FromNowTooltip timestamp={match.start_time + match.duration} />
    </div>
  </div>;
}

function MobileMatchCard({ match }: { match: MobileMatch }) {
  return <li>
    <Link className={styles.mobileMatch} to={`/matches/${match.match_id}`}>
      <MobileMatchHeader match={match} />
      <MobileMatchMetadata match={match} />
      <div className={styles.mobileTeams}>
        {(["radiant", "dire"] as const).map((side) => <MobileMatchTeam key={side} match={match} side={side} />)}
      </div>
      <MobileMatchFooter match={match} />
    </Link>
  </li>;
}

/** Displays the empty state when no matches are available. */
function EmptyDataMessage() {
  return <p className={styles.mobileStatus} role="status">No matches available</p>;
}

/** Displays match page controls and the visible range. */
function MobileMatchPagination({ currentPage, pages, start, end, total, onPageChange }: {
  currentPage: number;
  pages: number;
  start: number;
  end: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  if (!total) return null;
  return <nav className={styles.mobilePages} aria-label="Match pages">
    <button type="button" disabled={!currentPage} onClick={() => onPageChange(currentPage - 1)}>Previous</button>
    <span>{start}–{end} of {total}</span>
    <button type="button" disabled={currentPage + 1 >= pages} onClick={() => onPageChange(currentPage + 1)}>Next</button>
  </nav>;
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
  const [page, setPage] = useState(0);
  const { items, pages, currentPage, start, end } = getPage(data, page);
  return <section className={styles.responsiveMatchesTable} aria-label="Matches" aria-busy={loading}>
    {loading ? <TableSkeleton text={loadingText} /> : <>
      {!data.length && <EmptyDataMessage />}
      <ul className={styles.mobileList}>
        {items.map((match) => <MobileMatchCard key={match.match_id} match={match} />)}
      </ul>
      <MobileMatchPagination
        currentPage={currentPage}
        pages={pages}
        start={start}
        end={end}
        total={data.length}
        onPageChange={setPage}
      />
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
