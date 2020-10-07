import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import {
  getPlayerCounts,
  getPlayerHeroes,
  getPlayerMatches,
  getPlayerPeers,
  getPlayerRecentMatches,
} from '../../../../actions';
import GamemodeContext from '../../../../context/GamemodeContext';
import { formatTemplateToString } from '../../../../utility';
import Collapsible from '../../../Collapsible';
import Container from '../../../Container';
import Table from '../../../Table';
import constants from '../../../constants';
import { playerHeroesOverviewColumns } from '../Heroes/playerHeroesColumns';
import playerMatchesColumns from '../Matches/playerMatchesColumns';
import { playerPeersOverviewColumns } from '../Peers/playerPeersColumns';
import CountsSummary from './CountsSummary';
import SummOfRecMatches from './Summary';

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

const getValidRecentMatches = (matches) =>
  matches.filter((match) => match.game_mode !== 19).slice(0, MAX_MATCHES_ROWS);

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
  strings,
  countsData,
  countsLoading,
  countsError,
  location,
}) => {
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
        initialMaxHeight={800}
        buttonStyle={{ top: 8 }}
      >
        <SummaryContainer
          title={strings.heading_avg_and_max}
          titleTo={`/players/${playerId}/records`}
          subtitle={formatTemplateToString(
            strings.subheading_avg_and_max,
            validRecentMatches.length
          )}
          loading={matchesLoading}
          error={matchesError}
          loaderWidth={250}
          loaderHeight={30}
          key="averages"
        >
          <Styled
            data-hint={strings.include_turbo_matches}
            data-hint-position="right"
            style={{
              display: validRecentMatches.some(
                (match) => match.game_mode === 23
              )
                ? 'inline'
                : 'none',
            }}
          >
            <Checkbox
              style={{
                display: validRecentMatches.filter(
                  (match) => showTurboGames || match.game_mode !== 23
                ),
                opacity: 0.45,
              }}
              defaultChecked
              onCheck={toggleTurboGames}
            />
          </Styled>
          <SummOfRecMatches
            matchesData={validRecentMatches.filter(
              (match) => showTurboGames || match.game_mode !== 23
            )}
          />
        </SummaryContainer>
        <SummaryContainer
          title={strings.tab_counts}
          loading={countsLoading}
          error={countsError}
          subtitle={strings.th_win}
          loaderWidth={250}
          loaderHeight={30}
          style={{ width: '100%' }}
          key="counts"
        >
          <CountsSummary data={countsData} />
        </SummaryContainer>
      </Collapsible>
      <MatchesContainer>
        <Container
          title={strings.heading_matches}
          titleTo={`/players/${playerId}/matches`}
          loading={matchesLoading}
          error={matchesError}
          loaderWidth={300}
          loaderHeight={160}
        >
          <Table
            columns={playerMatchesColumns(strings, false)}
            data={matchesData}
            maxRows={!location.search && MAX_MATCHES_ROWS}
            paginated={matchesData.length > MAX_MATCHES_ROWS}
          />
        </Container>
      </MatchesContainer>

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

Overview.propTypes = {
  recentMatches: PropTypes.shape({}),
  playerMatches: PropTypes.shape({}),
  heroesData: PropTypes.arrayOf({}),
  heroesLoading: PropTypes.bool,
  heroesError: PropTypes.string,
  peersData: PropTypes.arrayOf({}),
  peersLoading: PropTypes.bool,
  peersError: PropTypes.string,
  playerId: PropTypes.string,
  toggleTurboGames: PropTypes.func,
  showTurboGames: PropTypes.bool,
  strings: PropTypes.shape({}),
  countsData: PropTypes.arrayOf({}),
  countsLoading: PropTypes.bool,
  countsError: PropTypes.bool,
  location: PropTypes.string,
};

const getData = (props, gamemode) => {
  let params = props.location.search;
  const hasGameMode =
    props.location &&
    props.location.search &&
    props.location.search.indexOf('game_mode') !== -1;
  if (gamemode === 'turbo' && !hasGameMode) {
    params = `${props.location.search}&significant=0&game_mode=23`;
  }

  if (props.location.search) {
    props.getPlayerMatches(props.playerId, params);
  } else {
    props.getPlayerRecentMatches(props.playerId, params);
  }
  props.getPlayerHeroes(props.playerId, params);
  props.getPlayerPeers(props.playerId, params);
  props.getPlayerCounts(props.playerId, params);
};

const RequestLayer = (props) => {
  const gamemodeState = React.useContext(GamemodeContext);
  React.useEffect(() => {
    if (gamemodeState.value.gamemode) {
      getData(props, gamemodeState.value.gamemode);
    }
  }, [props.location, gamemodeState.value.gamemode]);

  return <Overview {...props} />;
};

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
  toggleTurboGames: PropTypes.func,
  showTurboGames: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const filterCounts = (counts) => {
  const countMap = {
    is_radiant: [],
    game_mode: [],
    patch: [],
    region: [],
    lane_role: [],
  };

  const limitCount = (key, field, lim) =>
    counts[key].list
      .filter((el) => el.category !== 'Unknown')
      .sort((a, b) => b[field] - a[field])
      .slice(0, lim);

  Object.keys(counts).forEach((key) => {
    switch (key) {
      case 'is_radiant':
        countMap[key] = counts[key].list;
        break;

      case 'game_mode':
        countMap[key] = limitCount(key, 'matches', 2);
        break;

      case 'patch':
        countMap[key] = limitCount(key, 'category', 2);
        break;

      case 'region':
        countMap[key] = limitCount(key, 'matches', 2);
        break;

      case 'lane_role':
        countMap[key] = limitCount(key, 'matches', 2);
        break;

      default:
        break;
    }
  });

  return [
    ...countMap.is_radiant,
    ...countMap.game_mode,
    ...countMap.region,
    ...countMap.lane_role,
    ...countMap.patch,
  ];
};

const mapStateToProps = (state) => ({
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

const mapDispatchToProps = (dispatch) => ({
  getPlayerRecentMatches: (playerId, options) =>
    dispatch(getPlayerRecentMatches(playerId, options)),
  getPlayerMatches: (playerId, options) =>
    dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId, options) =>
    dispatch(getPlayerHeroes(playerId, options)),
  getPlayerPeers: (playerId, options) =>
    dispatch(getPlayerPeers(playerId, options)),
  getPlayerCounts: (playerId, options) =>
    dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
