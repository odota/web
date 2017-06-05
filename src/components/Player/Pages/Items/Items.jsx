import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerItems,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import playerItemsColumns from './playerItemsColumns';

const Items = ({
  data,
  error,
  loading,
}) => (
  <Container title="Items" error={error} loading={loading}>
    <Table paginated columns={playerItemsColumns} data={data} />
  </Container>
);

const getData = (props) => {
  props.getPlayerItems(props.playerId, props.location.search);
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
    return <Items {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerItems.data,
  loading: state.app.playerItems.loading,
  error: state.app.playerItems.error,
});

const mapDispatchToProps = dispatch => ({
  getPlayerItems: (playerId, options) => dispatch(getPlayerItems(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
