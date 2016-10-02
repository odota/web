import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPeers,
  setPlayerPeersSort,
} from 'actions';
import {
  sortPlayerPeers,
  transformPlayerPeersById,
} from 'selectors';
import { playerPeers } from 'reducers';
import { createTable, TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerPeersColumns from './playerPeersColumns';

const PeersTable = createTable(
  playerPeers.getPlayerPeersById,
  (state, sortState, playerId) => (sortState ? sortPlayerPeers(playerId)(state) : transformPlayerPeersById(playerId)(state)),
  setPlayerPeersSort
);

const Peers = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerPeers} id={playerId} page="peers" />
    <TableContainer title={strings.heading_peers}>
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
