import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerHeroes } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import { playerHeroesColumns } from './playerHeroesColumns';

const Heroes = ({
  data, playerId, error, loading, strings,
}) => (
  <Container title={strings.heading_heroes} error={error} loading={loading}>
    <Table paginated columns={playerHeroesColumns(playerId, strings)} data={data} />
  </Container>
);

Heroes.propTypes = {
  data: PropTypes.arrayOf({}),
  playerId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerHeroes(props.playerId, props.location.search);
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
    return <Heroes {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerHeroes.data,
  error: state.app.playerHeroes.error,
  loading: state.app.playerHeroes.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
