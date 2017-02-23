import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerPeers,
} from 'actions';
import { playerPeers } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import { playerPeersColumns } from './playerPeersColumns';

const Peers = ({ data, playerId, error, loading }) => (
  <Container title={strings.heading_peers} error={error} loading={loading}>
    <Table paginated columns={playerPeersColumns(playerId)} data={data} />
  </Container>
);

const getData = (props) => {
  props.getPlayerPeers(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Peers {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerPeers.getPeerList(state, playerId),
  error: playerPeers.getError(state, playerId),
  loading: playerPeers.getLoading(state, playerId),
});
const mapDispatchToProps = dispatch => ({
  getPlayerPeers: (playerId, options) => dispatch(getPlayerPeers(playerId, options)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
