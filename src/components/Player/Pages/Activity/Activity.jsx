import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ActivityCalendar from './ActivityCalendar';
import { getPlayerMatches } from '../../../../actions';
import Container from '../../../Container';

const defaultOptions = {
  limit: null,
};

const Activity = ({
  error, loading, strings, data,
}) => (
  <Container title={strings.tab_activity} subtitle={strings.activity_subtitle} error={error} loading={loading}>
    <ActivityCalendar strings={strings} data={data} />
  </Container>
);

Activity.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

const getData = (props) => {
  props.getPlayerMatches(props.playerId, props.location.search);
};

class RequestLayer extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    location: PropTypes.shape({
      key: PropTypes.string,
    }),
    strings: PropTypes.shape({}),
  };

  componentDidMount() {
    getData(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.playerId !== prevProps.playerId ||
      this.props.location.key !== prevProps.location.key
    ) {
      getData(this.props);
    }
  }

  render() {
    return <Activity {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerMatches.data,
  loading: state.app.playerMatches.loading,
  error: state.app.playerMatches.error,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) =>
    dispatch(getPlayerMatches(playerId, options)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestLayer);
