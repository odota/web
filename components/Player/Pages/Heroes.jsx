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
import { TableFilterForm } from '../../Form';

const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const Overview = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerHeroes} id={playerId} page="heroes" />
    <TableContainer title="Heroes Played">
      <PlayerHeroesTable columns={playerHeroesColumns} id={playerId} />
    </TableContainer>
  </div>
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
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
