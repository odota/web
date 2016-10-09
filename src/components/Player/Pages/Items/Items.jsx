import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerItems,
} from 'actions';
import {
  playerItems,
} from 'reducers';
import Table, {
  TableContainer,
} from 'components/Table';
import {
  TableFilterForm,
} from 'components/Form';
import playerItemsColumns from './playerItemsColumns';

const Items = ({
  playerId,
  data,
}) => (
  <div>
    <TableFilterForm submitAction={getPlayerItems} id={playerId} page="items" />
    <TableContainer title="Items">
      <Table paginated sorted columns={playerItemsColumns} data={data} />
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

const mapStateToProps = (state, { playerId }) => ({
  data: playerItems.getItemsList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerItems: playerId => dispatch(getPlayerItems(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
