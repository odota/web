import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { heroes } from "dotaconstants";
import styled from "styled-components";
import { transformations, subTextStyle, rankTierToString } from "../../utility";
import { getProMatches, getPublicMatches, getTeams } from "../../actions";
import Table from "../Table/Table";
import TableLink from "../Table/TableLink";
import { IconTrophy } from "../Icons";
import Match from "../Match/Match";
import TabBar from "../TabBar/TabBar";
import { StyledTeamIconContainer } from "../Match/StyledMatch";
import constants from "../constants";
import FromNowTooltip from "../Visualizations/FromNowTooltip";
import HeroImage from "../Visualizations/HeroImage";
import TeamLogo from "../TeamLogo/TeamLogo";
import Heading from "../Heading/Heading";
import { groupMatchesBySeries, MatchSeries } from "./series";

export const WinnerSpan = styled.span`
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
    fill: ${constants.colorGolden};
  }
`;

/**
 * Displays a muted best-of format label.
 * @param props.$type Series type code: 0 for BO1, 1 for BO3, or 2 for BO5.
 * @example
 * <SeriesFormatBadge $type={1}>BO3</SeriesFormatBadge>
 */
const SeriesFormatBadge = styled.span<{ $type: number }>`
  display: inline-flex;
  align-items: center;
  padding: 2px 6px;
  border: 1px solid ${constants.dividerColor};
  border-radius: 4px;
  background: transparent;
  color: ${constants.textColorSecondary};
  font-family: ${constants.fontFamilyFuturistic};
  font-size: ${constants.fontSizeSmall};
  font-weight: 400;
  letter-spacing: 0.01em;
  line-height: 1.4;
  white-space: nowrap;
`;

export const matchesColumns = (strings: Strings) => [
  {
    field: "version",
    displayFn: (row: any, col: any, field: any) => (
      <div>{field ? "☆" : ""}</div>
    ),
  },
  {
    displayName: strings.th_match_id,
    field: "match_id",
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <div style={{ float: "left" }}>
            <FromNowTooltip timestamp={row.start_time + row.duration} />
          </div>
          <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
          {row.league_name}
        </div>
      </div>
    ),
  },
  {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: "duration",
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: (
      <StyledTeamIconContainer>
        {strings.general_radiant}
      </StyledTeamIconContainer>
    ),
    field: "radiant_name",
    color: constants.colorGreen,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        {row.radiant_win && (
          <WinnerSpan>
            <IconTrophy />
          </WinnerSpan>
        )}
        {field}
      </div>
    ),
  },
  {
    displayName: (
      <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>
    ),
    field: "dire_name",
    color: constants.colorRed,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        {!row.radiant_win && (
          <WinnerSpan>
            <IconTrophy />
          </WinnerSpan>
        )}
        {field}
      </div>
    ),
  },
];

export type SeriesTeam = { team_id: number; logo_url: string };

/**
 * Renders a series participant with its logo and optional team profile link.
 * @param id Team identifier when available.
 * @param name Team name, or null for the unknown label.
 * @param teams Team metadata used for logo lookup.
 * @param strings Localized interface strings.
 * @returns The participant identity and logo.
 * @example
 * seriesTeam(8965331, "Chandogs", teams, strings);
 */
const seriesTeam = (id: number | null | undefined, name: string | null, teams: SeriesTeam[], strings: Strings) => {
  const src = teams.find((team) => team.team_id === id)?.logo_url || "";
  const label = name || strings.general_unknown;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: constants.fontFamilyFuturistic }}>
      <TeamLogo teamId={id} src={src} style={{ width: 32, height: 32, objectFit: "contain", flexShrink: 0 }} />
      {id ? <TableLink to={`/teams/${id}`}>{label}</TableLink> : label}
    </div>
  );
};

/**
 * Builds the shared columns for grouped professional series tables.
 * @param strings Localized column labels and fallback messages.
 * @param teams Team records used to resolve logos.
 * @param seriesLink Optional function returning each series or league detail URL.
 * @param leagueIcon Optional renderer for artwork beside the league name.
 * @returns Table column definitions for league, format, teams, score, and game links.
 * @example
 * const columns = seriesColumns(strings, teams, (row) => `/esports/leagues/${row.leagueid}`);
 * <Table data={groupMatchesBySeries(matches)} columns={columns} />
 */
export const seriesColumns = (
  strings: Strings,
  teams: SeriesTeam[],
  seriesLink = (row: MatchSeries) => `/matches/series/${row.key}`,
  leagueIcon?: (row: MatchSeries) => React.ReactNode,
) => [
  {
    displayName: strings.th_league,
    field: "league_name",
    displayFn: (row: MatchSeries) => (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {leagueIcon?.(row)}
        <div>
          <TableLink to={seriesLink(row)}>
            {row.league_name}
          </TableLink>
          <div style={{ ...subTextStyle }}>
            <FromNowTooltip timestamp={row.start_time} />
          </div>
        </div>
      </div>
    ),
  },
  {
    displayName: strings.esports_format,
    field: "series_type",
    displayFn: (row: MatchSeries) => {
      const type = row.series_type;
      return typeof type === "number" && Number.isInteger(type) && type >= 0 && type <= 2
        ? <SeriesFormatBadge $type={type}>BO{type * 2 + 1}</SeriesFormatBadge>
        : strings.general_unknown;
    },
  },
  {
    displayName: strings.th_team_name,
    field: "team1",
    displayFn: (row: MatchSeries) => seriesTeam(row.team1Id, row.team1, teams, strings),
  },
  {
    displayName: strings.th_score,
    field: "score",
    displayFn: (row: MatchSeries) => (
      <span title={strings.matches_series_score_tooltip}>
        {row.team1Wins} – {row.team2Wins}
      </span>
    ),
  },
  {
    displayName: strings.th_team_name,
    field: "team2",
    displayFn: (row: MatchSeries) => seriesTeam(row.team2Id, row.team2, teams, strings),
  },
  {
    displayName: strings.th_matches,
    field: "games",
    displayFn: (row: MatchSeries) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {row.games.map((game, index) => (
          <TableLink key={game.match_id} to={`/matches/${game.match_id}`}>
            {strings.matches_game} {index + 1} · {game.match_id}
          </TableLink>
        ))}
      </div>
    ),
  },
];

const publicMatchesColumns = (strings: Strings) => [
  {
    displayName: strings.th_match_id,
    field: "match_id",
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <div style={{ float: "left" }}>
            <FromNowTooltip timestamp={row.start_time + row.duration} />
          </div>
          <span style={{ marginLeft: 1, marginRight: 1 }}>/</span>
          {rankTierToString(row.avg_rank_tier)}
        </div>
      </div>
    ),
  },
  {
    displayName: strings.th_duration,
    tooltip: strings.tooltip_duration,
    field: "duration",
    sortFn: true,
    displayFn: transformations.duration,
  },
  {
    displayName: (
      <StyledTeamIconContainer>
        {strings.general_radiant}
      </StyledTeamIconContainer>
    ),
    field: "radiant_team",
    displayFn: (row: any, col: any, field: any[]) =>
      field?.map((heroId: keyof Heroes) =>
        heroes[heroId] ? (
          <HeroImage
            id={heroId}
            key={heroId}
            style={{ width: "50px" }}
            alt={heroId}
          />
        ) : null,
      ),
  },
  {
    displayName: (
      <StyledTeamIconContainer>{strings.general_dire}</StyledTeamIconContainer>
    ),
    field: "dire_team",
    displayFn: (row: any, col: any, field: any[]) =>
      field?.map((heroId: keyof Heroes) =>
        heroes[heroId] ? (
          <HeroImage
            id={heroId}
            key={heroId}
            style={{ width: "50px" }}
            alt={heroId}
          />
        ) : null,
      ),
  },
];

const matchTabs = (strings: Strings) => [
  {
    name: strings.hero_pro_tab,
    key: "pro",
    content: (propsPar: MatchesProps) => (
      <div>
        <Table
          className="matches-table"
          data={propsPar.proData}
          columns={matchesColumns(strings)}
          loading={propsPar.loading}
          loadingText="Loading professional matches..."
        />
      </div>
    ),
    route: "/matches/pro",
  },
  {
    name: strings.matches_series,
    key: "series",
    content: (propsPar: MatchesProps) => (
      <Table
        className="matches-table"
        data={groupMatchesBySeries(propsPar.proData)}
        columns={seriesColumns(strings, propsPar.teams)}
        keyFn={(row: MatchSeries) => row.key}
        loading={propsPar.loading}
        loadingText="Loading professional series..."
      />
    ),
    route: "/matches/series",
  },
  {
    name: strings.matches_highest_mmr,
    key: "highMmr",
    content: (propsPar: MatchesProps) => (
      <div>
        <Table
          className="matches-table"
          data={propsPar.publicData}
          columns={publicMatchesColumns(strings)}
          loading={propsPar.loading}
          loadingText="Loading top public matches..."
        />
      </div>
    ),
    route: "/matches/highMmr",
  },
];

const getData = (props: MatchesProps) => {
  const route = props.match.params.matchId || "pro";
  if (!Number.isInteger(Number(route))) {
    if (route === "series") props.dispatchTeams();
    props.dispatchProMatches();
    props.dispatchPublicMatches({ min_rank: 75 });
  }
};

type MatchesProps = {
  match: { params: { matchId: string; info?: string } };
  strings: Strings;
  dispatchProMatches: Function;
  dispatchTeams: Function;
  teams: SeriesTeam[];
  dispatchPublicMatches: Function;
  proData: any[];
  publicData: any[];
  loading: boolean;
};

class Matches extends React.Component<MatchesProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: MatchesProps) {
    if (this.props.match.params.matchId !== prevProps.match.params.matchId) {
      getData(this.props);
    }
  }
  render() {
    const { strings } = this.props;
    const route = this.props.match.params.matchId || "pro";

    if (Number.isInteger(Number(route))) {
      return <Match {...this.props} matchId={route} />;
    }

    if (route === "series" && this.props.match.params.info) {
      const series = groupMatchesBySeries(this.props.proData).find(
        (row) => row.key === this.props.match.params.info,
      );
      return (
        <div>
          <Helmet title={series?.league_name || strings.matches_series} />
          <TableLink to="/matches/series">{strings.matches_series}</TableLink>
          <Heading
            title={series?.league_name || strings.matches_series}
            subtitle={series && (
              <span>
                {strings.th_league}: {series.leagueid}
                {!!series.series_id && ` / ${strings.matches_series}: ${series.series_id}`}
              </span>
            )}
            className="top-heading"
          />
          <Table
            className="matches-table"
            data={series ? [series] : []}
            columns={seriesColumns(strings, this.props.teams)}
            loading={this.props.loading}
            loadingText="Loading professional series..."
            placeholderMessage={strings.matches_series_not_found}
          />
          {series && (
            <>
              <Heading title={strings.th_matches} />
              <p>{strings.matches_series_available_games}</p>
              <Table
                className="matches-table"
                data={series.games}
                columns={matchesColumns(strings)}
                keyFn={(game: { match_id: number }) => game.match_id}
              />
            </>
          )}
        </div>
      );
    }

    const tab = matchTabs(strings).find((_tab) => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.title_matches} />
        <Heading title={strings.th_matches} className="top-heading" />
        <TabBar tabs={matchTabs(strings).filter((item) => item.key !== "series")} />
        {tab && tab.content(this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  proData: state.app.proMatches.data,
  teams: state.app.teams.data,
  publicData: state.app.publicMatches.data,
  loading: state.app.proMatches.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchTeams: () => dispatch(getTeams()),
  dispatchProMatches: () => dispatch(getProMatches()),
  dispatchPublicMatches: (options: any) => dispatch(getPublicMatches(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Matches);
