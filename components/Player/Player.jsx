import React from 'react';
import { createTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import {
  getPlayer,
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
  getPlayerWinLoss,
  getPlayerPeers,
  setPlayerPeersSort,
} from '../../actions';
import { connect } from 'react-redux';
import styles from './Player.css';
import {
  playerMatchesColumns,
  playerHeroesColumns,
  playerHeroesOverviewColumns,
  playerPeersColumns,
} from '../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerPeers,
  transformPlayerPeersById,
  sortPlayerHeroes,
  transformPlayerHeroes,
} from '../../selectors';
import { Text } from '../Text';
import { Card } from 'material-ui/Card';
import { playerMatches, playerPeers, REDUCER_KEY } from '../../reducers';

const playerHeroes = (state) => state[REDUCER_KEY].gotPlayer.heroes;

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes,
  (state, sortState) => (sortState ? sortPlayerHeroes(state) : transformPlayerHeroes(state)),
  setPlayerHeroesSort
);
const PeersTable = createTable(
  playerPeers.getPlayerPeersById,
  (state, sortState, playerId) => (sortState ? sortPlayerPeers(playerId)(state) : transformPlayerPeersById(playerId)(state)),
  setPlayerPeersSort
);

const getOverviewTab = playerId => (
  <div className={styles.overviewContainer}>
    <div className={styles.overviewMatches}>
      <Text className={styles.tableHeading}>RECENT MATCHES</Text>
      <Card className={styles.card}>
        <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
      </Card>
    </div>
    <div className={styles.overviewHeroes}>
      <div className={styles.heroesContainer}>
        <Text className={styles.tableHeading}>HERO STATS</Text>
        <Card className={styles.card}>
          <PlayerHeroesTable columns={playerHeroesOverviewColumns} id={playerId} numRows={20} />
        </Card>
      </div>
    </div>
  </div>
);

const getPlayerSubroute = (info, playerId) => {
  switch (info) {
    case 'overview':
      return getOverviewTab(playerId);
    case 'matches':
      return <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />;
    case 'heroes':
      return <PlayerHeroesTable columns={playerHeroesColumns} id={playerId} />;
    case 'peers':
      return <PeersTable columns={playerPeersColumns} id={playerId} />;
    default:
      return getOverviewTab(playerId);
  }
};

const Player = ({ playerId, info }) => {
  if (!playerId) {
    return <Error />;
  }

  return (
    <div>
      <div className={styles.header}>
        <PlayerHeader playerId={playerId} />
      </div>
      {getPlayerSubroute(info, playerId)}
    </div>
  );
};

const mapStateToProps = (state, { params }) => ({ playerId: params.account_id, info: params.info });

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (playerId) => dispatch(getPlayer(playerId)),
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
  getPlayerWinLoss: (playerId) => dispatch(getPlayerWinLoss(playerId)),
  getPlayerPeers: (playerId) => dispatch(getPlayerPeers(playerId)),
});

const getData = props => {
  props.getPlayer(props.playerId);
  props.getPlayerMatches(props.playerId, 20);
  props.getPlayerHeroes(props.playerId);
  props.getPlayerWinLoss(props.playerId);
  props.getPlayerPeers(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
