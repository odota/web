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
} from '../../actions';
import { connect } from 'react-redux';
import styles from './Player.css';
import {
  playerMatchesColumns,
  playerHeroesColumns,
  playerHeroesOverviewColumns,
} from '../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroes,
} from '../../selectors';
import { PeersPage } from './Pages';
import { Text } from '../Text';
import { Card } from 'material-ui/Card';
import { playerMatches, playerHeroes } from '../../reducers';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroes(playerId)(state)),
  setPlayerHeroesSort
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
      return <PeersPage playerId={playerId} />;
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
});

const getData = props => {
  props.getPlayer(props.playerId);
  props.getPlayerMatches(props.playerId, 20);
  props.getPlayerHeroes(props.playerId);
  props.getPlayerWinLoss(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(nextProps);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
