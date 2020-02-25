import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPlayerMatches } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import playerMatchesColumns from './playerMatchesColumns';

const Matches = ({
  data,
  error,
  loading,
  strings,
}) => (
  <Container title={strings.heading_matches} error={error} loading={loading}>
    <Table paginated columns={playerMatchesColumns(strings, true)} data={data} />
  </Container>
);
Matches.propTypes = {
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};

const getData = (props) => {
  props.getPlayerMatches(props.playerId, props.location.search);
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
    return <Matches {...this.props} />;
  }
}

const defaultOptions = {
  limit: null,
};

const mapStateToProps = state => ({
  data: state.app.playerMatches.data,
  loading: state.app.playerMatches.loading,
  error: state.app.playerMatches.error,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
