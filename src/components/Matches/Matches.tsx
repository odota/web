import React from "react";
import { connect } from "react-redux";
import Helmet from "react-helmet";
import { heroes } from "dotaconstants";
import styled from "styled-components";
import { transformations, subTextStyle, rankTierToString } from "../../utility";
import { getProMatches, getPublicMatches } from "../../actions";
import Table from "../Table/Table";
import TableLink from "../Table/TableLink";
import { IconTrophy } from "../Icons";
import Match from "../Match/Match";
import TabBar from "../TabBar/TabBar";
import { StyledTeamIconContainer } from "../Match/StyledMatch";
import constants from "../constants";
import FromNowTooltip from "../Visualizations/FromNowTooltip";
import HeroImage from "../Visualizations/HeroImage";
import Heading from "../Heading/Heading";

export const WinnerSpan = styled.span`
  display: inline-block;

  & svg {
    width: 10px !important;
    height: 10px !important;
    margin-right: 5px;
    fill: ${constants.colorGolden};
  }
`;

const matchesColumns = (strings: Strings) => [
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

// Columns used inside an expanded series. Same look as the pro tab but
// without the league name (it now lives on the parent series row).
const seriesMatchesColumns = (strings: Strings) => [
  {
    displayName: strings.th_match_id,
    field: "match_id",
    sortFn: true,
    displayFn: (row: any, col: any, field: any) => (
      <div>
        <TableLink to={`/matches/${field}`}>{field}</TableLink>
        <div style={{ ...subTextStyle }}>
          <FromNowTooltip timestamp={row.start_time + row.duration} />
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

// ---------------------------------------------------------------------------
// Series tab
// ---------------------------------------------------------------------------

// A series is identified by series_id. Matches without a series_id are each
// treated as their own single-match "series" (matching the existing UI).
const groupBySeries = (matches: any[]) => {
  const map = new Map<string, any[]>();
  (matches || []).forEach((m) => {
    const key =
      m.series_id != null ? `s-${m.series_id}` : `m-${m.match_id}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(m);
  });

  // Insertion order follows the original (most-recent-first) array, so the
  // series with the freshest game bubble to the top automatically.
  return Array.from(map.entries()).map(([key, seriesMatches]) => ({
    key,
    seriesId: seriesMatches[0].series_id,
    matches: seriesMatches, // already sorted newest -> oldest
    latestMatch: seriesMatches[0],
  }));
};

const SERIES_GRID = "40px minmax(180px, 1.3fr) 1fr 1fr 90px 140px";

const SeriesWrapper = styled.div`
  width: 100%;
  background: #1b2330;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
`;

const SeriesGrid = styled.div`
  display: grid;
  grid-template-columns: ${SERIES_GRID};
  align-items: center;
  column-gap: 12px;
  padding: 12px 14px;
`;

const SeriesHeaderGrid = styled(SeriesGrid)`
  background: #1e2633;
  color: #8fa3bd;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
`;

const SeriesRowGrid = styled(SeriesGrid)`
  background: #1b2330;
  color: #dfe6ee;
  font-size: 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #222c3d;
  }
`;

const Toggle = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  color: #9fb0c7;
  font-size: 13px;
  line-height: 1;
  user-select: none;
`;

const TeamOne = styled.span`
  color: ${constants.colorGreen};
`;

const TeamTwo = styled.span`
  color: ${constants.colorRed};
`;

// NOTE: `subTextStyle` is a plain CSSProperties object, so it can't be
// interpolated directly into a styled-components template literal. We apply
// it inline on the element instead.
const SeriesSubText = styled.div`
  margin-top: 3px;
`;

const SeriesMatchWrap = styled.div`
  background: #161d28;

  /* Kill the leftover spacing the Table component carries at its tail */
  & > *:last-child {
    margin-bottom: 0 !important;
    padding-bottom: 0 !important;
    border-bottom: none !important;
  }

  /* Remove the border on the very last match row so the expanded body
     ends cleanly on the row itself */
  table {
    margin-bottom: 0;
  }

  tbody tr:last-child td,
  tbody tr:last-child th {
    border-bottom: none !important;
  }
`;

const SeriesTab = ({
  data,
  loading,
  strings,
}: {
  data: any[];
  loading: boolean;
  strings: Strings;
}) => {
  const [expandedKey, setExpandedKey] = React.useState<string | null>(null);
  const seriesList = React.useMemo(() => groupBySeries(data), [data]);

  if (loading) {
    return <div style={{ padding: 20 }}>Loading series...</div>;
  }

  // `Strings` is a strict type from the app; the Series-specific keys below
  // aren't part of it yet, so we cast to `any` to fall back to English.
  const s = strings as any;

  return (
    <SeriesWrapper>
      <SeriesHeaderGrid>
        <div />
        <div>{s.th_series || "Series"}</div>
        <div>{s.th_team_1 || "Team 1"}</div>
        <div>{s.th_team_2 || "Team 2"}</div>
        <div>{s.th_matches || "Matches"}</div>
        <div>{s.th_last_played || "Last Played"}</div>
      </SeriesHeaderGrid>

      {seriesList.map((series) => {
        const isExpanded = expandedKey === series.key;
        const { latestMatch } = series;

        return (
          <div key={series.key}>
            <SeriesRowGrid
              onClick={() => setExpandedKey(isExpanded ? null : series.key)}
            >
              <div>
                <Toggle>{isExpanded ? "−" : "+"}</Toggle>
              </div>

              <div>
                {series.seriesId != null ? (
                  // `TableLink` doesn't forward `onClick`, so we wrap it in a
                  // plain div that stops the click from toggling the row.
                  <div onClick={(e) => e.stopPropagation()}>
                    <TableLink to={`/series/${series.seriesId}`}>
                      {series.seriesId}
                    </TableLink>
                  </div>
                ) : (
                  <span style={{ opacity: 0.5 }}>—</span>
                )}
                <SeriesSubText style={{ ...subTextStyle }}>
                  {(latestMatch.league_name || "").trim()}
                </SeriesSubText>
              </div>

              <div>
                <TeamOne>{latestMatch.radiant_name}</TeamOne>
              </div>

              <div>
                <TeamTwo>{latestMatch.dire_name}</TeamTwo>
              </div>

              <div>
                {series.matches.length}{" "}
                {series.matches.length === 1 ? "match" : "matches"}
              </div>

              <div>
                <FromNowTooltip
                  timestamp={latestMatch.start_time + latestMatch.duration}
                />
              </div>
            </SeriesRowGrid>

            {isExpanded && (
              <SeriesMatchWrap>
                <Table
                  data={series.matches}
                  columns={seriesMatchesColumns(strings)}
                  loading={false}
                  loadingText=""
                />
              </SeriesMatchWrap>
            )}
          </div>
        );
      })}
    </SeriesWrapper>
  );
};

// ---------------------------------------------------------------------------
// Tabs
// ---------------------------------------------------------------------------

const matchTabs = (strings: Strings) => [
  {
    name: strings.hero_pro_tab,
    key: "pro",
    content: (propsPar: MatchesProps) => (
      <div>
        <Table
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
      <SeriesTab
        data={propsPar.proData}
        loading={propsPar.loading}
        strings={strings}
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
    props.dispatchProMatches();
    props.dispatchPublicMatches({ min_rank: 75 });
  }
};

type MatchesProps = {
  match: { params: { matchId: string; info?: string } };
  strings: Strings;
  dispatchProMatches: Function;
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

    const tab = matchTabs(strings).find((_tab) => _tab.key === route);
    return (
      <div>
        <Helmet title={strings.title_matches} />
        <Heading title={strings.th_matches} className="top-heading" />
        <TabBar tabs={matchTabs(strings)} />
        {tab && tab.content(this.props)}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  proData: state.app.proMatches.data,
  publicData: state.app.publicMatches.data,
  loading: state.app.proMatches.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = (dispatch: any) => ({
  dispatchProMatches: () => dispatch(getProMatches()),
  dispatchPublicMatches: (options: any) => dispatch(getPublicMatches(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Matches);