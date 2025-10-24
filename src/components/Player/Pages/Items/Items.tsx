import React from 'react';

import { connect } from 'react-redux';
import { getPlayerItems } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerItemsColumns from './playerItemsColumns';
import useStrings from '../../../../hooks/useStrings.hook';

const Items = ({ data, error, loading }: ItemsProps) => {
  const strings = useStrings();
  return <Container title="Items" error={error} loading={loading}>
    <Table paginated columns={playerItemsColumns(strings)} data={data} />
  </Container>;
};

type ItemsProps = {
  data: any[],
  error: string,
  loading: boolean,
  getPlayerItems: Function,
  location: {
    key?: string,
    search?: string,
  }
  playerId: string
};

const getData = (props: ItemsProps) => {
  props.getPlayerItems(props.playerId, props.location.search);
};

class RequestLayer extends React.Component<ItemsProps> {
  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps: ItemsProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Items {...this.props} />;
  }
}

const mapStateToProps = (state: any) => ({
  data: state.app.playerItems.data,
  loading: state.app.playerItems.loading,
  error: state.app.playerItems.error,
});

const mapDispatchToProps = (dispatch: any) => ({
  getPlayerItems: (playerId: string, options: any) =>
    dispatch(getPlayerItems(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
