import React from 'react';
import { createTable } from '../Table';
import PlayerHeader from './PlayerHeader';
import Error from '../Error';
import { getPlayer, getPlayerMatches, setPlayerMatchesSort, setPlayerHeroesSort } from '../../actions';
import { connect } from 'react-redux';
import styles from './PlayerHeader.css';
import { playerMatchesColumns, playerHeroesColumns } from '../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatches,
  sortPlayerHeroes,
  transformPlayerHeroes,
} from '../../selectors';

const playerMatches = (state) => state.gotPlayer.matches;
const playerHeroes = (state) => state.gotPlayer.heroes;

const PlayerMatchesTable = createTable(playerMatches, transformPlayerMatches, sortPlayerMatches, setPlayerMatchesSort);
const PlayerHeroesTable = createTable(playerHeroes, transformPlayerHeroes, sortPlayerHeroes, setPlayerHeroesSort);

const getPlayerSubroute = (info) => {
  switch (info) {
    case 'overview':
      return <PlayerMatchesTable columns={playerMatchesColumns} />;
    case 'matches':
      return <PlayerMatchesTable columns={playerMatchesColumns} />;
    case 'heroes':
      return <PlayerHeroesTable columns={playerHeroesColumns} />;
    default:
      return <PlayerMatchesTable columns={playerMatchesColumns} />;
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
