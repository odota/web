import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerPeers } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import { playerPeersColumns } from './playerPeersColumns';

const Peers = ({
  data, playerId, error, loading, strings,
}) => (
  <Container title={strings.heading_peers} error={error} loading={loading}>
    <Table paginated columns={playerPeersColumns(playerId, strings)} data={data} placeholderMessage={strings.peers_none} />
  </Container>
);

Peers.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  playerId: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerPeers(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  }

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.playerId !== prevProps.playerId || this.props.location.key !== prevProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return <Peers {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerPeers.data,
  error: state.app.playerPeers.error,
  loading: state.app.playerPeers.loading,
  strings: state.app.strings,
});
const mapDispatchToProps = dispatch => ({
  getPlayerPeers: (playerId, options) => dispatch(getPlayerPeers(playerId, options)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
