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
  transformPlayerMatches,
  sortPlayerHeroes,
  transformPlayerHeroes,
} from '../../selectors';
import { Text } from '../Text';
import { Card, CardHeader } from 'material-ui/Card';

const playerMatches = (state) => state.gotPlayer.matches;
const playerHeroes = (state) => state.gotPlayer.heroes;

const PlayerMatchesTable = createTable(
  playerMatches,
  (state, sortState) => (sortState ? sortPlayerMatches(state) : transformPlayerMatches(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes,
  (state, sortState) => (sortState ? sortPlayerHeroes(state) : transformPlayerHeroes(state)),
  setPlayerHeroesSort
);

const getOverviewTab = () => (
  <div>
    <div className={styles.overviewMatches}>
      <Text className={styles.tableHeading}>RECENT MATCHES</Text>
      <Card className={styles.card}>
        <PlayerMatchesTable columns={playerMatchesColumns} />
      </Card>
    </div>
    <div className={styles.overviewHeroes}>
      <div className={styles.heroesContainer}>
        <Text className={styles.tableHeading}>HERO STATS</Text>
        <Card className={styles.card}>
          <PlayerHeroesTable columns={playerHeroesColumns} />
        </Card>
      </div>
    </div>
  </div>
);

const getPlayerSubroute = (info) => {
  switch (info) {
    case 'overview':
      return getOverviewTab();
    case 'matches':
      return <PlayerMatchesTable columns={playerMatchesColumns} />;
    case 'heroes':
      return <PlayerHeroesTable columns={playerHeroesColumns} />;
    default:
      return getOverviewTab();
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
      {getPlayerSubroute(info)}
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
