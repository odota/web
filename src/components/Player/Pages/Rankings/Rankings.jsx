import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRankings,
} from 'actions';
import { playerRankings } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import playerRankingsColumns from './playerRankingsColumns';

const Rankings = ({ data, error, loading }) => (
  <div>
    <Container title={strings.heading_rankings} subtitle={strings.rankings_description} error={error} loading={loading}>
      <Table paginated columns={playerRankingsColumns} data={data} />
    </Container>
  </div>
);

const getData = (props) => {
  props.getPlayerRankings(props.playerId, props.location.query);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(this.props);
    }
  }

  render() {
    return <Rankings {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerRankings.getRankingList(state, playerId),
  error: playerRankings.getError(state, playerId),
  loading: playerRankings.getLoading(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerRankings: (playerId, options) => dispatch(getPlayerRankings(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
