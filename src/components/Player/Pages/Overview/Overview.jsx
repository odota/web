import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerRecentMatches,
  getPlayerHeroes,
  getPlayerPeers,
  getPvgnaHeroGuides,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import { playerHeroesOverviewColumns } from 'components/Player/Pages/Heroes/playerHeroesColumns';
import { playerPeersOverviewColumns } from 'components/Player/Pages/Peers/playerPeersColumns';
import util from 'util';
import styled from 'styled-components';
import SummOfRecMatches from './Summary';
import constants from '../../../constants';

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
    margin: 0;
    padding: 0;

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

const Overview = ({
  validRecentMatches,
  numValidRecentMatches,
  matchesData,
  matchesLoading,
  matchesError,
  heroesData,
  heroesLoading,
  heroesError,
  peersData,
  peersLoading,
  peersError,
  playerId,
}) => (
  <OverviewContainer>
    <SummaryContainer
      title={strings.heading_avg_and_max}
      titleTo={`/players/${playerId}/records`}
      subtitle={util.format(strings.subheading_avg_and_max, numValidRecentMatches)}
      loading={matchesLoading}
      error={matchesError}
    >
      <SummOfRecMatches matchesData={validRecentMatches} />
    </SummaryContainer>
    <MatchesContainer>
      <Container
        title={strings.heading_matches}
        titleTo={`/players/${playerId}/matches`}
        loading={matchesLoading}
        error={matchesError}
      >
        <Table
          columns={playerMatchesColumns}
          data={matchesData}
          maxRows={MAX_MATCHES_ROWS}
        />
      </Container>
    </MatchesContainer>

    <HeroesContainer>
      <Container
        title={strings.heading_peers}
        titleTo={`/players/${playerId}/peers`}
        loading={peersLoading}
        error={peersError}
      >
        <Table
          columns={playerPeersOverviewColumns(playerId)}
          data={peersData}
          maxRows={MAX_PEERS_ROWS}
        />
      </Container>

      <Container
        title={strings.heading_heroes}
        titleTo={`/players/${playerId}/heroes`}
        loading={heroesLoading}
        error={heroesError}
      >
        <Table
          columns={playerHeroesOverviewColumns(playerId)}
          data={heroesData}
          maxRows={MAX_HEROES_ROWS}
        />
      </Container>
    </HeroesContainer>
  </OverviewContainer>
);

Overview.propTypes = {
  validRecentMatches: PropTypes.arrayOf({}),
  numValidRecentMatches: PropTypes.number,
  matchesData: PropTypes.arrayOf({}),
  matchesLoading: PropTypes.bool,
  matchesError: PropTypes.string,
  heroesData: PropTypes.arrayOf({}),
  heroesLoading: PropTypes.bool,
  heroesError: PropTypes.string,
  peersData: PropTypes.arrayOf({}),
  peersLoading: PropTypes.bool,
  peersError: PropTypes.string,
  playerId: PropTypes.string,
};


const getData = (props) => {
  props.getPlayerRecentMatches(props.playerId);
  props.getPlayerHeroes(props.playerId, props.location.search);
  props.getPlayerPeers(props.playerId, props.location.search);
  props.getPvgnaHeroGuides();
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Overview {...this.props} />;
  }
}

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
};

const mergeHeroGuides = (heroes, heroGuides) => heroes.map(hero => ({
  ...hero,
  pvgnaGuide: heroGuides[hero.hero_id],
}));

/**
 * Get the number of recent matches, filtering out Siltbreaker matches
 */
const countValidRecentMatches = matches => matches.filter(match => match.game_mode !== 19 && match.game_mode !== 23).length;

/**
 * Get the recent matches, filtering out Siltbreaker matches
 *
 * XXX - this could be switched to use playerMatches while specifying the
 * desired fields in order to request >20 matches and filter down to 20 matches.
 */
const getValidRecentMatches = matches => matches.filter(match => match.game_mode !== 19 && match.game_mode !== 23)
  .slice(0, MAX_MATCHES_ROWS);

const mapStateToProps = state => ({
  matchesData: state.app.playerRecentMatches.data,
  matchesLoading: state.app.playerRecentMatches.loading,
  matchesError: state.app.playerRecentMatches.error,
  validRecentMatches: getValidRecentMatches(state.app.playerRecentMatches.data),
  numValidRecentMatches: countValidRecentMatches(state.app.playerRecentMatches.data),
  heroesData: mergeHeroGuides(state.app.playerHeroes.data, state.app.pvgnaGuides.data),
  heroesLoading: state.app.playerHeroes.loading,
  heroesError: state.app.playerHeroes.error,
  peersData: state.app.playerPeers.data,
  peersLoading: state.app.playerPeers.loading,
  peersError: state.app.playerPeers.error,
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecentMatches: (playerId, options) => dispatch(getPlayerRecentMatches(playerId, options)),
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
  getPlayerPeers: (playerId, options) => dispatch(getPlayerPeers(playerId, options)),
  getPvgnaHeroGuides: () => dispatch(getPvgnaHeroGuides()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
