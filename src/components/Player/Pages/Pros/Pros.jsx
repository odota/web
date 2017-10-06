import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getPlayerPros,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerProsColumns from './playerProsColumns';

const Pros = ({ data, playerId, error, loading }) => (
  <Container title={strings.heading_pros} error={error} loading={loading}>
    <Table paginated columns={playerProsColumns(playerId)} data={data} />
  </Container>
);

Pros.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  playerId: PropTypes.string,
  loading: PropTypes.bool,
};

const getData = (props) => {
  props.getPlayerPros(props.playerId, props.location.search);
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
    return <Pros {...this.props} />;
  }
}

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  getPlayerPros: (playerId, options) => dispatch(getPlayerPros(playerId, options)),
});

const mapStateToProps = state => ({
  data: state.app.playerPros.data,
  error: state.app.playerPros.error,
  loading: state.app.playerPros.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
