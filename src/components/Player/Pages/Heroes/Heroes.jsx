import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import {
  getPlayerHeroes,
  setPlayerHeroesSort,
} from 'actions';
import {
  sortPlayerHeroes,
  transformPlayerHeroesById,
} from 'selectors';
import { playerHeroes } from 'reducers';
import { createTable, TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import { playerHeroesColumns } from './playerHeroesColumns';

const PlayerHeroesTable = createTable(
  playerHeroes.getPlayerHeroesById,
  (state, sortState, playerId) => (sortState ? sortPlayerHeroes(playerId)(state) : transformPlayerHeroesById(playerId)(state)),
  setPlayerHeroesSort
);

const Heroes = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerHeroes} id={playerId} page="heroes" />
    <TableContainer title={strings.heading_heroes}>
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
    return <Heroes {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
