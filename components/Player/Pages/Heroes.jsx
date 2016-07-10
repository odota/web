import React from 'react';
import { connect } from 'react-redux';
import { createTable, TableContainer } from '../../Table';
import {
  getPlayerHeroes,
  setPlayerHeroesSort,
} from '../../../actions';
import { playerHeroesColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from '../../../selectors';
import { playerHeroes } from '../../../reducers';

const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const Overview = ({ playerId }) => (
  <TableContainer title="hero stats">
    <PlayerHeroesTable columns={playerHeroesColumns} id={playerId} />
  </TableContainer>
);

const getData = props => {
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
  getPlayerHeroes: (playerId) => dispatch(getPlayerHeroes(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
