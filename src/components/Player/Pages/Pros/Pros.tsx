import React from 'react';

import { connect } from 'react-redux';
import { getPlayerPros } from '../../../../actions';
import Table from '../../../Table/Table';
import Container from '../../../Container/Container';
import playerProsColumns from './playerProsColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const Pros = ({ data, playerId, error, loading }: ProsProps) => {
  const strings = useStrings();
  return (
    <Container title={strings.heading_pros} error={error} loading={loading}>
      <Table
        paginated
        columns={playerProsColumns(playerId, strings)}
        data={data}
      />
    </Container>
  );
};

type ProsProps = {
  data: any[];
  error: string;
  playerId: string;
  loading: boolean;
  getPlayerPros: Function;
  location: {
    key?: string;
    search?: string;
  };
};

const getData = (props: ProsProps) => {
  props.getPlayerPros(props.playerId, props.location.search);
};

class ProsPage extends React.Component<ProsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: ProsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Pros {...this.props} />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerPros: (playerId: string, options: any) =>
    dispatch(getPlayerPros(playerId, options)),
});

const mapStateToProps = (state: any) => ({
  data: state.app.playerPros.data,
  error: state.app.playerPros.error,
  loading: state.app.playerPros.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProsPage);
