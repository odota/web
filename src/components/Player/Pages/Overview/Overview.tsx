import React from "react";

import { connect } from "react-redux";
import styled from "styled-components";
import {
  getPlayerRecentMatches,
  getPlayerHeroes,
  getPlayerPeers,
  getPlayerCounts,
  getPlayerMatches,
} from "../../../../actions";
import Table from "../../../Table/Table";
import Container from "../../../Container/Container";
import RecentMatches from "./RecentMatches";
import { playerHeroesOverviewColumns } from "../Heroes/playerHeroesColumns";
import { playerPeersOverviewColumns } from "../Peers/playerPeersColumns";
import SummOfRecMatches from "./Summary";
import constants from "../../../constants";
import CountsSummary from "./CountsSummary";
import { formatTemplateToString } from "../../../../utility";
import Collapsible from "../../../Collapsible/Collapsible";
import useStrings from "../../../../hooks/useStrings.hook";
import { Spacer } from "../../../Spacer/Spacer";

export const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;
const MAX_PEERS_ROWS = 5;

const OverviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const SummaryContainer = styled(Container)`
  width: 100%;

  & ul {
    border: 1px solid rgb(0, 0, 0, 0.12);
    border-radius: 2px;
    background-color: rgba(255, 255, 255, 0.03);
    margin: 0;
    padding-left: 5px;

    & li {
      list-style: none;
      display: inline-block;
      margin-bottom: 10px;
      margin-right: 15px;

      & p {
        margin: 0;
        padding: 0;
        font-size: 24px;
      }

      & span {
        font-size: ${constants.fontSizeSmall};
        color: ${constants.colorMutedLight};

        &:first-child {
          text-transform: uppercase;
        }
      }

      & img {
        height: 20px;
        width: auto;
        vertical-align: text-bottom;
        transition: ${constants.normalTransition};
        margin-left: 6px;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
`;

const MatchesContainer = styled.div`
  width: calc(65% - 15px);
  margin-right: 15px;

  .recent-matches {
    width: 100%;
    font-family: ${constants.fontFamilyFuturistic};

    & * { font-family: inherit; }

    font-size: 14px;
    .match-list { list-style: none; padding: 0; margin: 0 0 20px; display: flex; flex-direction: column; gap: 10px; }
    .match-entry { position: relative; padding: 16px; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 6px; background: rgba(255, 255, 255, 0.02); }
    .match-entry-link { position: absolute; inset: 0; z-index: 1; border-radius: inherit; }
    .match-entry-header a, .match-entry-details a { position: relative; z-index: 2; }
    .match-entry:hover { background: rgba(255, 255, 255, 0.04); }
    .match-entry-header { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
    .match-entry-details { display: flex; justify-content: space-evenly; align-items: center; flex-wrap: wrap; font-weight: 400; color: ${constants.colorMutedLight}; gap: 12px 24px; margin-top: 14px; padding-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.06); }
    .match-stat { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
    .stat-label { font-size: 14px; color: ${constants.colorMutedLight}; }
    .lane-value { display: flex; align-items: center; gap: 6px; font-family: ${constants.fontFamilyFuturistic}; }
    .lane-value img { width: 20px; height: 20px; object-fit: contain; flex-shrink: 0; }
    .match-identity { display: flex; flex-direction: column; align-items: flex-start; gap: 8px; }
    .match-hero .textContainer { width: 180px; }
    .duration-details { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
    .duration-value { display: flex; align-items: center; gap: 5px; }
    .duration-value > svg { width: 20px; height: 20px; flex-shrink: 0; color: ${constants.colorBlue}; }
    .team-value { display: flex; align-items: center; gap: 5px; font-size: 14px; }
    .team-value svg { width: 20px; height: 20px; flex-shrink: 0; }
    .team-value.radiant { color: ${constants.colorSuccess}; }
    .team-value.dire { color: ${constants.colorDanger}; }
    a { font-family: ${constants.fontFamilyFuturistic}; }
    .imageContainer img.image { height: 52px; width: auto; }
    .textContainer > span, .textContainer > span a { font-size: 14px; }
    .parsed, .unparsed { height: 52px; }
    table.recent-matches-table .imageContainer img.image { height: 29px; }
    table.recent-matches-table .parsed, table.recent-matches-table .unparsed { height: 29px; }

    .recent-result { display: flex; flex-direction: column; align-items: flex-start; gap: 5px; }
    .recent-time-ago { display: flex; align-items: center; gap: 5px; font-size: 14px; }
    .recent-time-ago > svg { width: 18px !important; height: 18px !important; color: ${constants.colorBlue} !important; }
    .duration-value { font-size: 14px; }
    .result-badge {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      white-space: nowrap;
    }
    .win { color: ${constants.colorSuccess}; }
    .loss { color: ${constants.colorDanger}; }
    .unknown { color: ${constants.colorMutedLight}; }
    .recent-mode { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
    .mode-label, .rank-label { display: flex; align-items: center; gap: 6px; }
    .mode-label svg { width: 22px; height: 22px; flex-shrink: 0; color: ${constants.colorGolden}; }
    .rank-label { color: ${constants.colorMutedLight}; font-size: 14px; }
    .rank-label img { width: 30px; height: 30px; object-fit: contain; flex-shrink: 0; }
    .rank-description { display: inline-flex; align-items: baseline; gap: 5px; white-space: nowrap; }
    .rank-stars {
      color: ${constants.colorMutedLight};
      font-size: inherit;
      line-height: 1;
      letter-spacing: normal;
      white-space: nowrap;
    }

    .match-link { color: ${constants.colorMutedLight}; font-size: 14px; letter-spacing: 0.08em; line-height: 1.2; text-transform: uppercase; }
    .recent-kda { display: inline-flex; align-items: center; gap: 6px; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .recent-kda .separator { color: ${constants.colorMutedLight}; }
    .match-entry .team-value { font-weight: 400; color: ${constants.colorMutedLight}; }
    .recent-kda .kills { color: ${constants.colorSuccess}; }
    .recent-kda .deaths { color: ${constants.colorDanger}; }
    .recent-kda .assists { color: ${constants.colorMutedLight}; }
    .team-value.radiant svg { color: ${constants.colorSuccess}; }
    .team-value.dire svg { color: ${constants.colorDanger}; }
    a:focus-visible { outline: 2px solid ${constants.primaryLinkColor}; outline-offset: 3px; }
  }

  @media only screen and (max-width: 1080px) {
    width: 100%;
    margin-right: 0;
  }
`;

const HeroesContainer = styled.div`
  width: 35%;

  @media only screen and (max-width: 1080px) {
    width: 100%;
  }
`;

const Styled = styled.div`
  float: left;
  position: relative;
  width: 30px;
`;

const getValidRecentMatches = (matches: Match[]) =>
  matches.filter((match) => match.game_mode !== 19).slice(0, MAX_MATCHES_ROWS);

type OverviewProps = {
  recentMatches: any;
  playerMatches: any;
  heroesData: any[];
  heroesLoading: boolean;
  heroesError: string;
  peersData: any[];
  peersLoading: boolean;
  peersError: string;
  countsData: Record<string, { label: string; data: any[] }>;
  countsLoading: boolean;
  countsError: string;
  location: {
    key?: string;
    search?: string;
  };
  playerId: string;
  getPlayerMatches: Function;
  getPlayerRecentMatches: Function;
  getPlayerHeroes: Function;
  getPlayerPeers: Function;
  getPlayerCounts: Function;
};

const Overview = ({
  recentMatches,
  playerMatches,
  heroesData,
  heroesLoading,
  heroesError,
  peersData,
  peersLoading,
  peersError,
  playerId,
  toggleTurboGames,
  showTurboGames,
  countsData,
  countsLoading,
  countsError,
  location,
}: OverviewProps & {
  toggleTurboGames: (e: React.MouseEvent) => void;
  showTurboGames: boolean;
}) => {
  const strings = useStrings();
  const {
    data: matchesData,
    loading: matchesLoading,
    error: matchesError,
  } = location.search ? playerMatches : recentMatches;

  const validRecentMatches = getValidRecentMatches(matchesData);

  return (
    <OverviewContainer>
      <Collapsible
        name="playerSummary"
        initialMaxHeight={1200}
        buttonStyle={{ top: 8 }}
      >
        <Spacer variant="1" />
        <SummaryContainer
          title={strings.heading_avg_and_max}
          titleTo={`/players/${playerId}/records`}
          subtitle={formatTemplateToString(
            strings.subheading_avg_and_max,
            validRecentMatches.length,
          )}
          loading={matchesLoading}
          error={matchesError}
          loaderWidth={250}
          loaderHeight={30}
          key="averages"
        >
          {/* <Styled
            data-hint={strings.include_turbo_matches}
            data-hint-position="right"
            style={{
              display: validRecentMatches.some(
                (match) => match.game_mode === 23,
              )
                ? 'inline'
                : 'none',
            }}
          >
            <Checkbox
              style={{
                opacity: 0.45,
              }}
              defaultChecked
              onCheck={toggleTurboGames}
            />
          </Styled> */}
          <SummOfRecMatches
            matchesData={validRecentMatches.filter(
              (match) => showTurboGames || match.game_mode !== 23,
            )}
          />
        </SummaryContainer>
        <Spacer variant="1" />
        <SummaryContainer
          title={strings.tab_counts}
          loading={countsLoading}
          error={countsError}
          subtitle={strings.th_win}
          loaderWidth={250}
          loaderHeight={30}
          style={{ width: "100%" }}
          key="counts"
        >
          <CountsSummary data={countsData} />
        </SummaryContainer>
      </Collapsible>
      <Spacer variant="1" />
      <MatchesContainer>
        <RecentMatches
          data={matchesData}
          playerId={playerId}
          loading={matchesLoading}
          error={matchesError}
        />
      </MatchesContainer>
      <Spacer variant="1" />
      <HeroesContainer>
        <Collapsible
          name="overviewPeers"
          initialMaxHeight={400}
          buttonStyle={{ top: 18 }}
        >
          <Container
            title={strings.heading_peers}
            titleTo={`/players/${playerId}/peers`}
            loading={peersLoading}
            error={peersError}
          >
            <Table
              columns={playerPeersOverviewColumns(playerId, strings)}
              data={peersData}
              maxRows={MAX_PEERS_ROWS}
            />
          </Container>
        </Collapsible>
        <Collapsible
          name="overviewHeroes"
          initialMaxHeight={700}
          buttonStyle={{ top: 28 }}
        >
          <Container
            title={strings.heading_heroes}
            titleTo={`/players/${playerId}/heroes`}
            loading={heroesLoading}
            error={heroesError}
          >
            <Table
              columns={playerHeroesOverviewColumns(playerId, strings)}
              data={heroesData}
              maxRows={MAX_HEROES_ROWS}
            />
          </Container>
        </Collapsible>
      </HeroesContainer>
    </OverviewContainer>
  );
};

const getData = (props: OverviewProps) => {
  if (props.location.search) {
    props.getPlayerMatches(props.playerId, props.location.search);
  } else {
    props.getPlayerRecentMatches(props.playerId);
  }
  props.getPlayerHeroes(props.playerId, props.location.search);
  props.getPlayerPeers(props.playerId, props.location.search);
  props.getPlayerCounts(props.playerId, props.location.search);
};

class OverviewPage extends React.Component<
  OverviewProps,
  { showTurboGames: boolean }
> {
  constructor(props: OverviewProps) {
    super(props);
    this.state = {
      showTurboGames: true,
    };
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: OverviewProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  toggleTurboGames = () => {
    const { showTurboGames } = this.state;
    this.setState({ showTurboGames: !showTurboGames });
  };

  render() {
    return (
      <Overview
        {...this.props}
        toggleTurboGames={this.toggleTurboGames}
        showTurboGames={this.state.showTurboGames}
      />
    );
  }
}

const filterCounts = (counts: Record<string, any>) => {
  const countMap = {
    is_radiant: [],
    game_mode: [],
    patch: [],
    region: [],
    lane_role: [],
  };

  const limitCount = (key: string, field: string, lim: number) =>
    counts[key].list
      .filter((el: any) => el.category !== "Unknown")
      .sort((a: any, b: any) => b[field] - a[field])
      .slice(0, lim);

  Object.keys(counts).forEach((key) => {
    switch (key) {
      case "is_radiant":
        countMap[key] = counts[key].list;
        break;

      case "game_mode":
        countMap[key] = limitCount(key, "matches", 2);
        break;

      case "patch":
        countMap[key] = limitCount(key, "category", 2);
        break;

      case "region":
        countMap[key] = limitCount(key, "matches", 2);
        break;

      case "lane_role":
        countMap[key] = limitCount(key, "matches", 2);
        break;

      default:
        break;
    }
  });

  return {
    game_mode: {
      label: "Game Mode",
      data: countMap.game_mode,
    },
    is_radiant: {
      label: "Team",
      data: countMap.is_radiant,
    },
    region: {
      label: "Region",
      data: countMap.region,
    },
    lane_role: {
      label: "Role",
      data: countMap.lane_role,
    },
    patch: {
      label: "Patch",
      data: countMap.patch,
    },
  };
};

const mapStateToProps = (state: any) => ({
  recentMatches: {
    data: state.app.playerRecentMatches.data,
    loading: state.app.playerRecentMatches.loading,
    error: state.app.playerRecentMatches.error,
  },
  playerMatches: {
    data: state.app.playerMatches.data,
    loading: state.app.playerMatches.loading,
    error: state.app.playerMatches.error,
  },
  heroesData: state.app.playerHeroes.data,
  heroesLoading: state.app.playerHeroes.loading,
  heroesError: state.app.playerHeroes.error,
  peersData: state.app.playerPeers.data,
  peersLoading: state.app.playerPeers.loading,
  peersError: state.app.playerPeers.error,
  strings: state.app.strings,
  countsData: filterCounts(state.app.playerCounts.data),
  countsLoading: state.app.playerCounts.loading,
  countsError: state.app.playerCounts.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerRecentMatches: (playerId: string, options: any) =>
    dispatch(getPlayerRecentMatches(playerId, options)),
  getPlayerMatches: (playerId: string, options: any) =>
    dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId: string, options: any) =>
    dispatch(getPlayerHeroes(playerId, options)),
  getPlayerPeers: (playerId: string, options: any) =>
    dispatch(getPlayerPeers(playerId, options)),
  getPlayerCounts: (playerId: string, options: any) =>
    dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewPage);
