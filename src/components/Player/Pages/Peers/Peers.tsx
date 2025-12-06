import React from 'react';

import { connect } from 'react-redux';
import { getPlayerPeers } from '../../../../actions';
import Table from '../../../Table/Table';
import Container from '../../../Container/Container';
import { playerPeersColumns } from './playerPeersColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const Peers = ({ data, playerId, error, loading }: PeersProps) => {
  const strings = useStrings();
  return (
    <Container title={strings.heading_peers} error={error} loading={loading}>
      <Table
        paginated
        columns={playerPeersColumns(playerId, strings)}
        data={data}
        placeholderMessage={strings.peers_none}
      />
    </Container>
  );
};

type PeersProps = {
  data: any[];
  error: string;
  playerId: string;
  loading: boolean;
  getPlayerPeers: Function;
  location: {
    key?: string;
    search?: string;
  };
};

const getData = (props: PeersProps) => {
  props.getPlayerPeers(props.playerId, props.location.search);
};

class PeersPage extends React.Component<PeersProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: PeersProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Peers {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerPeers.data,
  error: state.app.playerPeers.error,
  loading: state.app.playerPeers.loading,
});
const mapDispatchToProps = (dispatch: any) => ({
  getPlayerPeers: (playerId: string, options: any) =>
    dispatch(getPlayerPeers(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PeersPage);
