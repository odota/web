import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPros,
  setPlayerProsSort,
} from 'actions';
import {
  sortPlayerPros,
  transformPlayerProsById,
} from 'selectors';
import { playerPros } from 'reducers';
import { createTable, TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerProsColumns from './playerProsColumns';

const PlayerProsTable = createTable(
  playerPros.getPlayerProsById,
  (state, sortState, playerId) => (sortState ? sortPlayerPros(playerId)(state) : transformPlayerProsById(playerId)(state)),
  setPlayerProsSort
);

const Pros = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerPros} id={playerId} page="pros" />
    <TableContainer title={strings.heading_pros}>
      <PlayerProsTable columns={playerProsColumns} id={playerId} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerPros(props.playerId);
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
    return <Pros {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  getPlayerPros: (playerId, options) => dispatch(getPlayerPros(playerId, options)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
