import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerPros } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerProsColumns from './playerProsColumns';

const Pros = ({
  data, playerId, error, loading, strings,
}) => (
  <Container title={strings.heading_pros} error={error} loading={loading}>
    <Table paginated columns={playerProsColumns(playerId, strings)} data={data} />
  </Container>
);

Pros.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  playerId: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerPros(props.playerId, props.location.search);
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
    return <Pros {...this.props} />;
  }
}

const mapDispatchToProps = dispatch => ({
  getPlayerPros: (playerId, options) => dispatch(getPlayerPros(playerId, options)),
});

const mapStateToProps = state => ({
  data: state.app.playerPros.data,
  error: state.app.playerPros.error,
  loading: state.app.playerPros.loading,
  strings: state.app.strings,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
