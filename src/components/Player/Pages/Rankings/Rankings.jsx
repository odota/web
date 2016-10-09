import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRankings,
} from 'actions';
import { playerRankings } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import strings from 'lang';
import playerRankingsColumns from './playerRankingsColumns';

const Rankings = ({ data }) => (
  <div>
    <TableContainer title={strings.heading_rankings}>
      <Table paginated columns={playerRankingsColumns} data={data} />
    </TableContainer>
  </div>
);

const getData = (props) => {
  props.getPlayerRankings(props.playerId);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId) {
      getData(this.props);
    }
  }

  render() {
    return <Rankings {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerRankings.getRankingList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerRankings: (playerId, options) => dispatch(getPlayerRankings(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
