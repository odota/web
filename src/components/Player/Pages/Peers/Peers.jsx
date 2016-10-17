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
    <TableFilterForm id={playerId} page="peers" />
    <TableContainer title={strings.heading_peers}>
      <Table paginated columns={playerPeersColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerPeers(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.accountId !== nextProps.accountId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
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
