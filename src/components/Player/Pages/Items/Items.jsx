import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerItems,
  setPlayerItemsSort,
} from 'actions';
import {
  sortPlayerItems,
  transformPlayerItemsById,
} from 'selectors';
import {
  playerItems,
} from 'reducers';
import {
  createTable,
  TableContainer,
} from 'components/Table';
import {
  TableFilterForm,
} from 'components/Form';
import playerItemsColumns from './playerItemsColumns';

const ItemsTable = createTable(
  playerItems.getPlayerItemsById,
  (state, sortState, playerId) => (sortState ? sortPlayerItems(playerId)(state) : transformPlayerItemsById(playerId)(state)),
  setPlayerItemsSort
);

const Items = ({
  playerId,
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerItems} id={playerId} page="items" />
    <TableContainer title="Items">
      <ItemsTable columns={playerItemsColumns} id={playerId} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerItems(props.playerId);
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
    return <Items {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  getPlayerItems: playerId => dispatch(getPlayerItems(playerId)),
});

export default connect(null, mapDispatchToProps)(RequestLayer);
