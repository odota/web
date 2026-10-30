/**
 * @file Esports.tsx
 * @description Renders the Esports overview, tournament directory, player directory, and league detail routes.
 * @remarks Joins recent professional matches to leagues by leagueid; league pages load their own match history.
 */

import React, { useMemo, useState } from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import { Breadcrumbs, Button, TextField } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InsightsIcon from "@mui/icons-material/Insights";
import constants from "../constants";
import Heading from "../Heading/Heading";
import useStrings from "../../hooks/useStrings.hook";
import TeamLogo from "../TeamLogo/TeamLogo";
import Table from "../Table/Table";
import TableLink from "../Table/TableLink";
import HeroImage from "../Visualizations/HeroImage";
import FromNowTooltip from "../Visualizations/FromNowTooltip";
import { seriesColumns } from "../Matches/Matches";
import { groupMatchesBySeries, ProfessionalMatch, MatchSeries } from "../Matches/series";
import LeagueIcon from "./LeagueIcon";
import TournamentDetails from "./TournamentDetails";
import MatchList from "./MatchList";
import SeriesSchedule from "./SeriesSchedule";
import useEsportsData from "./useEsportsData";
import { Hub, PhotoBanner, Intro, Navigation, Grid, Panel, PanelHeader, Cards, TournamentCard, Identity, TierBadge, Metric, Summary } from "./Styled";

const tierOrder = ["premium", "professional", "amateur", "excluded", "unknown"];
/**
 * Resolves the configured display priority for a tournament tier.
 * @param tier Tier identifier returned by the API.
 * @returns A zero-based rank; unrecognized tiers sort after known tiers.
 * @example
 * tierRank("premium"); // 0
 * tierRank("professional"); // 1
 * tierRank("unlisted"); // 5
 */
const tierRank = (tier: string) => {
  const rank = tierOrder.indexOf(tier);
  return rank === -1 ? tierOrder.length : rank;
};

type League = { leagueid: number; name: string; tier: string | null; banner?: string | null; ticket?: string | null };
type Team = { team_id: number; name: string; logo_url: string; rating: number; last_match_time: number };
type Player = { account_id: number; name: string; personaname: string; team_name: string; avatar: string };
type Hero = { id: number; localized_name: string; pro_pick: number; pro_ban: number; pro_win: number };
type LeagueMatch = ProfessionalMatch & { radiant_team_name: string | null; dire_team_name: string | null };
type Resource = { loading: boolean; error: boolean; retry: () => void };

/**
 * Loading and empty-state inputs for an independent API-backed section.
 * @example
 * const props: ResourceStatusProps = {
 *   resource: { loading: false, error: false, retry: () => {} }, empty: true,
 * };
 */
type ResourceStatusProps = {
  /** Request state and action for retrying a failed request. */
  resource: Resource;
  /** Whether the section contains no visible records. */
  empty: boolean;
};

/**
 * Displays loading, retry, or empty-state feedback for an independent data resource.
 * @param props Resource state and empty-result indicator.
 * @param props.resource Loading/error flags and the retry callback.
 * @param props.empty Whether the resource has no entries to show.
 * @returns Status feedback, or null when data is ready and nonempty.
 * @example
 * <ResourceStatus resource={{ loading: false, error: false, retry: reload }} empty />
 * // Displays the localized empty-results message.
 */
const ResourceStatus = ({ resource, empty }: ResourceStatusProps) => {
  const strings = useStrings();
  if (resource.loading) return <p role="status">{strings.esports_loading}</p>;
  if (resource.error) return (
    <div role="alert">
      <p>{strings.esports_error}</p>
      <Button onClick={resource.retry}>{strings.esports_retry}</Button>
    </div>
  );
  return empty ? <p>{strings.esports_empty}</p> : null;
};

/**
 * Route parameters supported by the Esports page.
 * @example
 * const params: EsportsRouteParams = { leagueId: "19719" };
 */
export type EsportsRouteParams = {
  /** Optional directory view, such as tournaments or players. */
  view?: string;
  /** League identifier when displaying tournament details. */
  leagueId?: string;
};

/**
 * Router-provided props for the Esports page, including match, location, and history.
 * @example
 * // React Router supplies EsportsProps when rendering the route.
 * <Route path="/esports/leagues/:leagueId" component={Esports} />
 */
export type EsportsProps = RouteComponentProps<EsportsRouteParams>;

/**
 * Renders the Esports route selected by the router parameters.
 * @param props React Router route props.
 * @param props.match Route match containing an optional directory view or league ID.
 * @returns The Esports overview, directory, or tournament detail page.
 * @example
 * <Route exact path="/esports/leagues/:leagueId" component={Esports} />
 * // /esports/leagues/19719 renders the league detail view.
 */
export default function Esports({ match }: EsportsProps) {
  const strings = useStrings();
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState("all");
  const { leagueId, view } = match.params;
  const tournamentsView = view === "tournaments";
  const playersView = view === "players";
  const leagues = useEsportsData<League>("leagues");
  const teams = useEsportsData<Team>("teams");
  const recent = useEsportsData<ProfessionalMatch>(leagueId ? null : "proMatches");
  const leaguesWithProMatches = useMemo(() => {
    const matchesByLeague = new Map<number, ProfessionalMatch[]>();
    recent.data.forEach((match) => {
      const matches = matchesByLeague.get(match.leagueid) || [];
      matches.push(match);
      matchesByLeague.set(match.leagueid, matches);
    });
    return leagues.data.map((league) => ({
      ...league,
      tier: league.tier || "unknown",
      matches: (matchesByLeague.get(league.leagueid) || []).map((match) => ({
        ...match,
        league_name: league.name,
      })),
    }));
  }, [leagues.data, recent.data]);
  const proMatchesWithLeagues = useMemo(
    () => leaguesWithProMatches.flatMap((league) => league.matches),
    [leaguesWithProMatches],
  );

  const players = useEsportsData<Player>(playersView ? "proPlayers" : null);
  const heroes = useEsportsData<Hero>(leagueId || tournamentsView || playersView ? null : "heroStats");
  const leagueGames = useEsportsData<LeagueMatch>(leagueId ? `leagues/${leagueId}/matches` : null);
  const league = leagues.data.find((item) => String(item.leagueid) === leagueId);
  const normalizedSearch = search.trim().toLowerCase();
  const availableTiers = useMemo(
    () => [...new Set(leaguesWithProMatches.map((league) => league.tier))].sort((a, b) => tierRank(a) - tierRank(b) || a.localeCompare(b)),
    [leaguesWithProMatches],
  );
  const activity = useMemo(() => {
    const result = new Map<number, { count: number; latest: number }>();
    proMatchesWithLeagues.forEach((game) => {
      const previous = result.get(game.leagueid);
      result.set(game.leagueid, { count: (previous?.count || 0) + 1, latest: Math.max(previous?.latest || 0, game.start_time) });
    });
    return result;
  }, [proMatchesWithLeagues]);
  const tournamentRows = useMemo(() => leaguesWithProMatches
    .map((item) => ({ ...item, latest: activity.get(item.leagueid)?.latest || 0 }))
    .filter((item) => (tier === "all" || item.tier === tier) && item.name.toLowerCase().includes(normalizedSearch))
    .sort((a, b) => b.latest - a.latest || tierRank(a.tier) - tierRank(b.tier) || b.leagueid - a.leagueid),
  [leaguesWithProMatches, activity, normalizedSearch, tier]);
  const recentLeagues = tournamentRows.filter((item) => activity.has(item.leagueid)).slice(0, 6);
  const normalizedLeagueGames = useMemo(() => leagueGames.data.map((game) => ({
    ...game,
    league_name: league?.name || "",
    radiant_name: game.radiant_team_name || game.radiant_name || teams.data.find((team) => team.team_id === game.radiant_team_id)?.name || null,
    dire_name: game.dire_team_name || game.dire_name || teams.data.find((team) => team.team_id === game.dire_team_id)?.name || null,
  })), [leagueGames.data, league?.name, teams.data]);
  const series = groupMatchesBySeries(leagueId ? normalizedLeagueGames : proMatchesWithLeagues);
  const filteredSeries = series.filter((item) => [item.league_name, item.team1, item.team2].some((name) => name?.toLowerCase().includes(normalizedSearch)));
  const topTeams = [...teams.data].filter((team) => team.last_match_time > Date.now() / 1000 - 180 * 86400)
    .sort((a, b) => b.rating - a.rating).slice(0, 10);
  const topHeroes = [...heroes.data].sort((a, b) => (b.pro_pick + b.pro_ban) - (a.pro_pick + a.pro_ban)).slice(0, 10);
  const filteredPlayers = players.data.filter((player) => [player.name, player.personaname, player.team_name].some((name) => name?.toLowerCase().includes(normalizedSearch)));
  const sectionIcons: Record<string, React.ReactNode> = {
    [strings.esports_tournaments]: <EmojiEventsIcon style={{ color: constants.colorGolden }} />,
    [strings.esports_recent_tournaments]: <EmojiEventsIcon style={{ color: constants.colorGolden }} />,
    [strings.esports_tournament_details]: <EmojiEventsIcon style={{ color: constants.colorGolden }} />,
    [strings.esports_players]: <PersonIcon style={{ color: constants.colorBlue }} />,
    [strings.esports_top_teams]: <GroupsIcon style={{ color: constants.colorGreen }} />,
    [strings.esports_contested_heroes]: <InsightsIcon style={{ color: constants.colorGolden }} />,
  };
  /**
   * Returns a localized tier name, retaining readable labels for unfamiliar tiers.
   * @param value API tier identifier, or null for an unknown tier.
   * @returns A localized display label.
   * @example
   * tierLabel("premium"); // "Premium" in the English locale
   * tierLabel(null); // "Unknown" in the English locale
   */
  const tierLabel = (value: string | null) => {
    switch (value) {
      case "premium": return strings.tier_premium;
      case "professional": return strings.tier_professional;
      case "amateur": return strings.esports_amateur;
      case "excluded": return strings.esports_excluded;
      case "unknown":
      case null: return strings.general_unknown;
      default: return value.charAt(0).toUpperCase() + value.slice(1);
    }
  };
  /**
   * Chooses the theme accent used for a tournament tier.
   * @param value API tier identifier, or null when unavailable.
   * @returns A theme color token.
   * @example
   * tierColor("professional"); // constants.colorBlue
   */
  const tierColor = (value: string | null) => {
    switch (value) {
      case "premium": return constants.colorGolden;
      case "professional": return constants.colorBlue;
      case "amateur": return constants.colorGreen;
      default: return constants.textColorSecondary;
    }
  };
  /**
   * Renders a tournament tier as a compact colored badge.
   * @param value Tier identifier to label and color.
   * @returns A tier badge with a decorative trophy icon.
   * @example
   * tierBadge("premium"); // Trophy badge with the localized Premium label
   */
  const tierBadge = (value: string | null) => (
    <TierBadge $premium={value === "premium"} style={{ color: tierColor(value) }}>
      <EmojiEventsIcon aria-hidden="true" />
      {tierLabel(value)}
    </TierBadge>
  );
  /**
   * Renders a section heading and an optional navigation link.
   * @param title Localized heading text used to select a section icon.
   * @param to Optional destination for the view-all link.
   * @returns An icon heading with an optional view-all link.
   * @example
   * panelHeader(strings.esports_tournaments, "/esports/tournaments");
   */
  const panelHeader = (title: string, to?: string) => (
    <PanelHeader><h2>{sectionIcons[title] || <FormatListBulletedIcon style={{ color: constants.colorBlue }} />}{title}</h2>{to && <Link to={to}>{strings.esports_view_all} →</Link>}</PanelHeader>
  );
  const participatingTeams = new Set(normalizedLeagueGames.flatMap((game) =>
    [game.radiant_team_id, game.dire_team_id].filter((id) => !!id),
  )).size;
  const tournamentColumns = [
    {
      field: "name",
      displayName: strings.esports_tournaments,
      displayFn: (row: League) => (
        <Identity>
          <EmojiEventsIcon
            aria-hidden="true"
            style={{ color: tierColor(row.tier) }}
          />
          <TableLink to={`/esports/leagues/${row.leagueid}`}>{row.name}</TableLink>
        </Identity>
      ),
    },
    { field: "tier", displayName: strings.esports_tier, displayFn: (row: League) => tierBadge(row.tier) },
    { field: "leagueid", displayName: strings.th_league, sortFn: true },
    { field: "latest", displayName: strings.esports_latest_match, sortFn: true, displayFn: (row: { latest: number }) => row.latest ? <FromNowTooltip timestamp={row.latest} /> : "—" },
  ];
  /**
   * Resolves artwork for the league associated with a series.
   * @param row Series containing the league ID and display name.
   * @returns A league image with initials as its fallback.
   * @example
   * leagueIcon(seriesRow); // Artwork for seriesRow.leagueid, or league initials
   */
  const leagueIcon = (row: MatchSeries) => {
    const league = leagues.data.find((item) => item.leagueid === row.leagueid);
    return <LeagueIcon name={row.league_name} banner={league?.banner} ticket={league?.ticket} />;
  };
  const playerColumns = [
    { field: "name", displayName: strings.esports_players, displayFn: (row: Player) => <Identity><img src={row.avatar} alt="" loading="lazy" /><TableLink to={`/players/${row.account_id}`}>{row.name || row.personaname || row.account_id}</TableLink></Identity> },
    { field: "team_name", displayName: strings.th_team_name, sortFn: true },
  ];

  const pageHeading = (
    <Heading
        title={leagueId ? league?.name || strings.esports_tournament_details : strings.esports_title}
        subtitle={leagueId ? strings.esports_league_description : strings.esports_description}
      icon={<EmojiEventsIcon />}
      className="top-heading"
    />
  );

  return (
    <Hub>
      <Helmet title={league?.name || strings.esports_title} />
      <PhotoBanner>
        {pageHeading}
      </PhotoBanner>
      <Intro>
        <Navigation aria-label={strings.esports_title}>
          <Link to="/esports" aria-current={!view && !leagueId ? "page" : undefined}><SportsEsportsIcon />{strings.esports_overview}</Link>
          <Link to="/esports/tournaments" aria-current={tournamentsView ? "page" : undefined}><EmojiEventsIcon />{strings.esports_tournaments}</Link>
        </Navigation>
      </Intro>
      <Breadcrumbs aria-label={strings.esports_title} sx={{ mb: 2, fontSize: constants.fontSizeSmall, fontFamily: constants.fontFamilyFuturistic }}>
        <Link to="/esports">{strings.esports_title}</Link>
        {leagueId && <Link to="/esports/tournaments">{strings.esports_tournaments}</Link>}
        <span aria-current="page">
          {leagueId
            ? league?.name.trim() || leagueId
            : tournamentsView ? strings.esports_tournaments
              : playersView ? strings.esports_players : strings.esports_overview}
        </span>
      </Breadcrumbs>

      {(tournamentsView || playersView || !leagueId) && (
        <Panel>
          <TextField fullWidth label={playersView ? strings.esports_search_players : strings.esports_search} value={search} onChange={(event) => setSearch(event.target.value)} size="small" />
        </Panel>
      )}

      {leagueId ? (
        <>
          <Panel>
            {panelHeader(strings.esports_tournament_details, "/esports/tournaments")}
            <ResourceStatus resource={leagues} empty={!league} />
            {league && <TournamentDetails
              key={league.leagueid}
              league={league}
              tier={tierBadge(league.tier)}
              games={normalizedLeagueGames}
              teams={teams.data}
              historyReady={!leagueGames.loading && !leagueGames.error}
            />}
            <p>{strings.esports_league_coverage}</p>
            {!leagueGames.loading && !leagueGames.error && (
              <Summary>
                <div><FormatListBulletedIcon /><strong>{series.length}</strong><span>{strings.matches_series}</span></div>
                <div><SportsEsportsIcon /><strong>{normalizedLeagueGames.length}</strong><span>{strings.th_matches}</span></div>
                <div><GroupsIcon /><strong>{participatingTeams}</strong><span>{strings.header_teams}</span></div>
              </Summary>
            )}
          </Panel>
          <Panel>
            {panelHeader(strings.matches_series)}
            <ResourceStatus resource={leagueGames} empty={!series.length} />
            <p>{strings.esports_schedule_hint}</p>
            {!leagueGames.loading && <SeriesSchedule key={leagueId} series={series} teams={teams.data} />}
          </Panel>
          <Panel>
            {panelHeader(strings.th_matches)}
            <ResourceStatus resource={leagueGames} empty={!series.length} />
            {!leagueGames.loading && !leagueGames.error && <MatchList key={leagueId} games={normalizedLeagueGames} teams={teams.data} />}
          </Panel>
        </>
      ) : tournamentsView ? (
        <Panel>
          {panelHeader(strings.esports_tournaments)}
          <p>{strings.esports_directory_description}</p>
          <TextField select SelectProps={{ native: true }} label={strings.esports_tier} value={tier} onChange={(event) => setTier(event.target.value)} size="small" style={{ marginBottom: 20 }}>
            <option value="all">{strings.esports_all_tiers}</option>
            {availableTiers.map((value) => <option key={value} value={value}>{tierLabel(value)}</option>)}
          </TextField>
          <ResourceStatus resource={leagues} empty={!tournamentRows.length} />
          <Table key={`${search}:${tier}`} data={tournamentRows} columns={tournamentColumns} loading={leagues.loading} paginated keyFn={(row: League) => row.leagueid} />
        </Panel>
      ) : playersView ? (
        <Panel>
          {panelHeader(strings.esports_players)}
          <ResourceStatus resource={players} empty={!filteredPlayers.length} />
          <Table key={search} data={filteredPlayers} columns={playerColumns} loading={players.loading} paginated keyFn={(row: Player) => row.account_id} />
        </Panel>
      ) : (
        <>
          <Panel>
            {panelHeader(strings.esports_recent_tournaments, "/esports/tournaments")}
            <p>{strings.esports_recent_coverage}</p>
            <ResourceStatus resource={leagues.error ? leagues : recent} empty={!recentLeagues.length} />
            <Cards>{recentLeagues.map((item) => (
              <TournamentCard key={item.leagueid} to={`/esports/leagues/${item.leagueid}`}>
                <EmojiEventsIcon aria-hidden="true" />
                <strong>{item.name}</strong>
                {tierBadge(item.tier)}
                <small><FromNowTooltip timestamp={item.latest} /></small>
              </TournamentCard>
            ))}</Cards>
          </Panel>
          <Panel>
                {panelHeader(strings.esports_recent_series, "/matches/series")}
                <ResourceStatus resource={recent} empty={!filteredSeries.length} />
                <Table data={filteredSeries.slice(0, 12)} columns={seriesColumns(strings, teams.data, (row) => `/esports/leagues/${row.leagueid}`, leagueIcon)} loading={recent.loading} keyFn={(row: { key: string }) => row.key} />
          </Panel>
          <Grid>
              <Panel>
                {panelHeader(strings.esports_top_teams, "/teams")}
                <p>{strings.esports_team_coverage}</p>
                <ResourceStatus resource={teams} empty={!topTeams.length} />
                <Table data={topTeams} loading={teams.loading} columns={[
                  { field: "name", displayName: strings.th_team_name, displayFn: (row: Team) => <Identity><TeamLogo teamId={row.team_id} src={row.logo_url} /><TableLink to={`/teams/${row.team_id}`}>{row.name}</TableLink></Identity> },
                  { field: "rating", displayName: strings.th_rating, displayFn: (row: Team) => <Metric>{Math.round(row.rating)}</Metric> },
                ]} />
              </Panel>
              <Panel>
                {panelHeader(strings.esports_contested_heroes, "/heroes")}
                <p>{strings.esports_meta_coverage}</p>
                <ResourceStatus resource={heroes} empty={!topHeroes.length} />
                <Table data={topHeroes} loading={heroes.loading} columns={[
                  { field: "localized_name", displayName: strings.th_heroes, displayFn: (row: Hero) => <Identity><HeroImage id={String(row.id)} /><TableLink to={`/heroes/${row.id}`}>{row.localized_name}</TableLink></Identity> },
                  { field: "contested", displayName: strings.esports_picks_bans, displayFn: (row: Hero) => row.pro_pick + row.pro_ban },
                  { field: "winrate", displayName: strings.th_winrate, displayFn: (row: Hero) => <Metric $positive={row.pro_pick > 0 && row.pro_win / row.pro_pick >= 0.5}>{row.pro_pick ? `${Math.round(row.pro_win / row.pro_pick * 100)}%` : "—"}</Metric> },
                ]} />
              </Panel>
          </Grid>
        </>
      )}
    </Hub>
  );
}
