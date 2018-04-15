import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import strings from '../../../../lang';
import { getPlayerHeroes } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import { playerHeroesColumns } from './playerHeroesColumns';

const Heroes = ({
  data, playerId, error, loading,
}) => (
  <Container title={strings.heading_heroes} error={error} loading={loading}>
    <Table paginated columns={playerHeroesColumns(playerId)} data={data} />
  </Container>
);

Heroes.propTypes = {
  data: PropTypes.arrayOf({}),
  playerId: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const getData = (props) => {
  props.getPlayerHeroes(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Heroes {...this.props} />;
  }
}

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  data: state.app.playerHeroes.data,
  error: state.app.playerHeroes.error,
  loading: state.app.playerHeroes.loading,
});

const mapDispatchToProps = dispatch => ({
  getPlayerHeroes: (playerId, options) => dispatch(getPlayerHeroes(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
