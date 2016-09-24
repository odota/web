import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
} from 'actions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from 'selectors';
import { playerMatches, playerHeroes } from 'reducers';
import { createTable, TableContainer } from '../../Table';
import playerMatchesColumns from './playerMatchesColumns';
import { playerHeroesOverviewColumns } from './playerHeroesColumns';
import { TableFilterForm } from '../../Form';
import styles from './Overview.css';

const PlayerMatchesTable = createTable(
  playerMatches.getPlayerMatchesById,
  (state, sortState, playerId) => (sortState ? sortPlayerMatches(playerId)(state) : transformPlayerMatchesById(playerId)(state)),
  setPlayerMatchesSort
);
const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId, 20)(state) : transformPlayerHeroesById(playerId, 20)(state)),
  setPlayerHeroesSort
);

const getPlayerMatchesAndHeroes = (playerId, options) => dispatch => {
  dispatch(getPlayerMatches(playerId, options));
  dispatch(getPlayerHeroes(playerId, options));
};

const Overview = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatchesAndHeroes} id={playerId} page="overview" />
    <div className={styles.overviewContainer}>
      <TableContainer title="Recent matches" style={{ width: '70%' }}>
        <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
      </TableContainer>
      <TableContainer title="Heroes played" style={{ marginLeft: 30, width: '30%' }}>
        <PlayerHeroesTable columns={playerHeroesOverviewColumns} id={playerId} />
      </TableContainer>
    </div>
  </div>
);

const getData = props => {
  props.getPlayerMatches(props.playerId);
  props.getPlayerHeroes(props.playerId);
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
    return <Overview {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerMatches: (playerId) => dispatch(getPlayerMatches(playerId)),
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
