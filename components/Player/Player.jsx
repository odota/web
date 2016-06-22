import React from 'react';
import { createTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import { getPlayer, getPlayerMatches, setPlayerMatchesSort, setPlayerHeroesSort } from '../../actions';
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
      <Text size={25}>Matches</Text>
      <PlayerMatchesTable columns={playerMatchesColumns} />
    </div>
    <div className={styles.overviewHeroes}>
      <div className={styles.heroesContainer}>
        <Text size={25}>Heroes</Text>
        <PlayerHeroesTable columns={playerHeroesColumns} />
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
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getPlayer(this.props.playerId);
    if (this.props.info === 'matches') {
      this.props.getPlayerMatches(this.props.playerId);
    }
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      this.props.getPlayer(nextProps.playerId);
    }
    if (nextProps.info === 'matches' && this.props.playerId !== nextProps.playerId) {
      this.props.getPlayerMatches(nextProps.playerId);
    }
  }

  render() {
    return <Player {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
