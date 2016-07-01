import React from 'react';
import { createTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import { getPlayer, getPlayerMatches, getPlayerHeroes, getPlayerWinLoss, setPlayerMatchesSort, setPlayerHeroesSort } from '../../actions';
import { connect } from 'react-redux';
import styles from './Player.css';
import { playerMatchesColumns, playerHeroesColumns } from '../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroes,
} from '../../selectors';
import { Text } from '../Text';
import { Card } from 'material-ui/Card';

const playerMatches = (state) => state.gotPlayer.matches;
const playerHeroes = (state) => state.gotPlayer.heroes;

const PlayerMatchesTable = createTable(
  playerMatches,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes,
  (state, sortState) => (sortState ? sortPlayerHeroes(state) : transformPlayerHeroes(state)),
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
          <PlayerHeroesTable columns={playerHeroesColumns} id={playerId} />
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

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
    this.props.getPlayerMatches(this.props.playerId, 10);
    this.props.getPlayerHeroes(this.props.playerId);
    this.props.getPlayerWinLoss(this.props.playerId);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      this.props.getPlayer(nextProps.playerId);
      this.props.getPlayerMatches(nextProps.playerId, 10);
      this.props.getPlayerHeroes(this.props.playerId);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
