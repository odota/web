import React from 'react';
import { connect } from 'react-redux';
import { createTable, TableContainer } from '../../Table';
import {
  getPlayerMatches,
  setPlayerMatchesSort,
  getPlayerHeroes,
  setPlayerHeroesSort,
} from '../../../actions';
import { playerMatchesColumns, playerHeroesOverviewColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerMatches,
  transformPlayerMatchesById,
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from '../../../selectors';
import { playerMatches, playerHeroes } from '../../../reducers';
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

const Overview = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerMatches.bind(null, playerId)} />
    <div className={styles.overviewContainer}>
      <TableContainer title="recent matches" style={{ width: '75%' }}>
        <PlayerMatchesTable columns={playerMatchesColumns} id={playerId} />
      </TableContainer>
      <TableContainer title="hero stats" style={{ marginLeft: 30, width: '25%' }}>
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
  getPlayerMatches: (playerId, numMatches) => dispatch(getPlayerMatches(playerId, numMatches)),
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
