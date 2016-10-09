import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPeers,
} from 'actions';
import { playerPeers } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerPeersColumns from './playerPeersColumns';

const Peers = ({ playerId, data }) => (
  <div>
    <TableFilterForm submitAction={getPlayerPeers} id={playerId} page="peers" />
    <TableContainer title={strings.heading_peers}>
      <Table paginated sorted columns={playerPeersColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
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

const mapStateToProps = (state, { playerId }) => ({
  data: playerPeers.getPeerList(state, playerId),
});
const mapDispatchToProps = dispatch => ({
  getPlayerPeers: playerId => dispatch(getPlayerPeers(playerId)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
