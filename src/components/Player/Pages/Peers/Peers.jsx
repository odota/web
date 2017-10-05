import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPlayerPeers,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import { playerPeersColumns } from './playerPeersColumns';

const Peers = ({ data, playerId, error, loading }) => (
  <Container title={strings.heading_peers} error={error} loading={loading}>
    <Table paginated columns={playerPeersColumns(playerId)} data={data} />
  </Container>
);

Peers.propTypes = {
  data: PropTypes.array,
  error: PropTypes.string,
  playerId: PropTypes.string,
  loading: PropTypes.bool,
};

const getData = (props) => {
  props.getPlayerPeers(props.playerId, props.location.search);
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

RequestLayer.propTypes = {
  location: PropTypes.object,
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  data: state.app.playerPeers.data,
  error: state.app.playerPeers.error,
  loading: state.app.playerPeers.loading,
});
const mapDispatchToProps = dispatch => ({
  getPlayerPeers: (playerId, options) => dispatch(getPlayerPeers(playerId, options)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
