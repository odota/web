import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerMatches,
  getPlayerHeroes,
  getPlayerPeers,
} from 'actions';
import {
  playerMatches,
  playerHeroes,
  playerPeers,
} from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import { TableFilterForm } from 'components/Form';
import playerMatchesColumns from 'components/Player/Pages/Matches/playerMatchesColumns';
import { playerHeroesOverviewColumns } from 'components/Player/Pages/Heroes/playerHeroesColumns';
import { playerPeersOverviewColumns } from 'components/Player/Pages/Peers/playerPeersColumns';
import styles from './Overview.css';

const MAX_MATCHES_ROWS = 20;
const MAX_HEROES_ROWS = 10;
const MAX_PEERS_ROWS = 5;

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
  <div>
    <TableFilterForm />
    <div className={styles.overviewContainer}>
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
  </div>
);

const getData = (props) => {
  props.getPlayerMatches(props.playerId, { ...props.location.query,
    limit: MAX_MATCHES_ROWS,
    significant: 0,
  });
  props.getPlayerHeroes(props.playerId, props.location.query);
  props.getPlayerPeers(props.playerId, props.location.query);
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

const mapStateToProps = (state, { playerId }) => ({
  matchesData: playerMatches.getMatchList(state, playerId),
  matchesLoading: playerMatches.getLoading(state, playerId),
  matchesError: playerMatches.getError(state, playerId),
  heroesData: playerHeroes.getHeroList(state, playerId),
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
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
