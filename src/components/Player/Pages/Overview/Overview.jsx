import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerMatches,
  getPlayerHeroes,
  getPlayerPeers,
  getPvgnaHeroGuides,
} from 'actions';
import {
  playerMatches,
  playerHeroes,
  playerPeers,
} from 'reducers';
import {
  getPvgnaGuides,
} from 'reducers/pvgnaGuides';
import Table from 'components/Table';
import Container from 'components/Container';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import { playerHeroesOverviewColumns } from 'components/Player/Pages/Heroes/playerHeroesColumns';
import { playerPeersOverviewColumns } from 'components/Player/Pages/Peers/playerPeersColumns';
import {
  isRadiant,
  sum,
  formatSeconds,
  abbreviateNumber,
} from 'utility';
import { defaultPlayerMatchesOptions } from 'actions/player/playerMatchesActions';
import styles from './Overview.css';

const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;
const MAX_PEERS_ROWS = 5;

const SummOfRecMatches = ({ matchesLoading, matchesError, matchesData }) => {
  // initial values
  const data = {
    duration: [],
    kills: [],
    deaths: [],
    assists: [],
    xp_per_min: [],
    gold_per_min: [],
    hero_damage: [],
    hero_healing: [],
    last_hits: [],

    wins: [],
  };

  const computed = {};

  if (!matchesLoading && !matchesError) {
    const dataKeys = Object.keys(data);

    for (let i = 0; i < MAX_MATCHES_ROWS; i += 1) {
      dataKeys.map((key) => {
        if (key === 'wins') {
          data.wins.push(matchesData[i].radiant_win === isRadiant(matchesData[i].player_slot));
        } else {
          data[key].push(matchesData[i][key]);
        }

        return null;
      });
    }

    dataKeys.map((key) => {
      if (key !== 'wins') {
        const avg = data[key].reduce(sum, 0) / MAX_MATCHES_ROWS;
        const max = Math.max(...data[key]);
        const maxMatch = matchesData.find(match => match[key] === max);

        let color;

        switch (key) {
          case 'kills':
            color = 'green';
            break;
          case 'deaths':
            color = 'red';
            break;
          case 'assists':
            color = 'lightGray';
            break;
          case 'gold_per_min':
            color = 'golden';
            break;
          default:
            color = false;
        }

        computed[key] = {
          avg,
          color,
          max: {
            value: max,
            matchId: maxMatch.match_id,
            heroId: maxMatch.hero_id,
            // ended: maxMatch.start_time + maxMatch.duration,
          },
        };
      }

      return null;
    });
  }

  return (
    <Container
      title="Summary of Recent Matches"
      className={styles.summaryContainer}
      loading={matchesLoading}
      error={matchesError}
    >
      <div>
        <ul>
          {Object.keys(computed).map((key) => {
            const c = computed[key];

            return (
              <li key={key}>
                <span>{key}</span>
                <p style={{ color: styles[c.color] }}>
                  {key === 'duration' ? formatSeconds(c.avg) : abbreviateNumber(c.avg)}
                  &nbsp;
                  <span>
                    {key === 'duration' ? formatSeconds(c.max.value) : abbreviateNumber(c.max.value)}
                  </span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

const Overview = ({
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
  <div className={styles.overviewContainer}>
    <SummOfRecMatches
      matchesLoading={matchesLoading}
      matchesError={matchesError}
      matchesData={matchesData}
    />
    <Container
      title={strings.heading_matches}
      className={styles.matchesContainer}
      loading={matchesLoading}
      error={matchesError}
    >
      <Table
        columns={playerMatchesColumns}
        data={matchesData}
        maxRows={MAX_MATCHES_ROWS}
      />
    </Container>

    <div className={styles.heroesContainer}>
      <Container
        title={strings.heading_peers}
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
        loading={heroesLoading}
        error={heroesError}
      >
        <Table
          columns={playerHeroesOverviewColumns(playerId)}
          data={heroesData}
          maxRows={MAX_HEROES_ROWS}
        />
      </Container>
    </div>
  </div>
);

const getData = (props) => {
  props.getPlayerMatches(props.playerId, { ...props.location.query,
    limit: MAX_MATCHES_ROWS,
    significant: 0,
    project: defaultPlayerMatchesOptions.project
      .concat([
        'xp_per_min',
        'gold_per_min',
        'hero_damage',
        'hero_healing',
        'last_hits',
      ]),
  });
  props.getPlayerHeroes(props.playerId, props.location.query);
  props.getPlayerPeers(props.playerId, props.location.query);
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

const mergeHeroGuides = (heroes, heroGuides) => heroes.map(hero => ({
  ...hero,
  pvgnaGuide: heroGuides[hero.hero_id],
}));

const mapStateToProps = (state, { playerId }) => ({
  matchesData: playerMatches.getMatchList(state, playerId),
  matchesLoading: playerMatches.getLoading(state, playerId),
  matchesError: playerMatches.getError(state, playerId),
  heroesData: mergeHeroGuides(playerHeroes.getHeroList(state, playerId), getPvgnaGuides(state)),
  heroesLoading: playerHeroes.getLoading(state, playerId),
  heroesError: playerHeroes.getError(state, playerId),
  peersData: playerPeers.getPeerList(state, playerId),
  peersLoading: playerPeers.getLoading(state, playerId),
  peersError: playerPeers.getError(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options) => dispatch(getPlayerMatches(playerId, options)),
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
  getPlayerPeers: (playerId, options) => dispatch(getPlayerPeers(playerId, options)),
  getPvgnaHeroGuides: () => dispatch(getPvgnaHeroGuides()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
