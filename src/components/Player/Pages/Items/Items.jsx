import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerItems } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerItemsColumns from './playerItemsColumns';

const Items = ({
  data,
  error,
  loading,
  strings,
}) => (
  <Container title="Items" error={error} loading={loading}>
    <Table paginated columns={playerItemsColumns(strings)} data={data} />
  </Container>
);

Items.propTypes = {
  data: PropTypes.shape({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerItems(props.playerId, props.location.search);
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
    return <Items {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerItems.data,
  loading: state.app.playerItems.loading,
  error: state.app.playerItems.error,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerItems: (playerId, options) => dispatch(getPlayerItems(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
