import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  getPlayerMatches,
} from 'actions';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerMatchesColumns from './playerMatchesColumns';

const Matches = ({
  data,
  error,
  loading,
}) => (
  <Container title={strings.heading_matches} error={error} loading={loading}>
    <Table paginated columns={playerMatchesColumns} data={data} />
  </Container>
);

const getData = (props) => {
  props.getPlayerMatches(props.playerId, props.location.search);
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
});

const mapDispatchToProps = dispatch => ({
  getPlayerMatches: (playerId, options = defaultOptions) => dispatch(getPlayerMatches(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
