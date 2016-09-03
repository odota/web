import React from 'react';
import { connect } from 'react-redux';
import { createTable, TableContainer } from '../../Table';
import {
  getPlayerPeers,
  setPlayerPeersSort,
} from '../../../actions';
import playerPeersColumns from './playerPeersColumns';
import {
  sortPlayerPeers,
  transformPlayerPeersById,
} from '../../../selectors';
import { playerPeers } from '../../../reducers';
import { TableFilterForm } from '../../Form';

const PeersTable = createTable(
  playerPeers.getPlayerPeersById,
  (state, sortState, playerId) => (sortState ? sortPlayerPeers(playerId)(state) : transformPlayerPeersById(playerId)(state)),
  setPlayerPeersSort
);

const Peers = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerPeers} id={playerId} page="peers" />
    <TableContainer title="peers">
      <PeersTable columns={playerPeersColumns} id={playerId} />
    </TableContainer>
  </div>
);

const mapStateToProps = (state, { playerId }) => ({ playerId });

const mapDispatchToProps = (dispatch) => ({
  getPlayerPeers: (playerId) => dispatch(getPlayerPeers(playerId)),
});

const getData = props => {
  props.getPlayerPeers(props.playerId);
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
    return <Peers {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
