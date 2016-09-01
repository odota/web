import React from 'react';
import { connect } from 'react-redux';
import { createTable, createTables, TableContainer } from '../../Table';
import {
  getPlayerCounts,
  setPlayerCountsSort,
} from '../../../actions';
import { playerCountsColumns } from '../../Table/columnDefinitions';
import {
  sortPlayerCounts,
  transformPlayerCountsById,
} from '../../../selectors';
import { playerCounts } from '../../../reducers';
import { TableFilterForm } from '../../Form';

const Overview = ({ playerId, tables }) => (
  <div>
    <TableFilterForm submitAction={getPlayerCounts} id={playerId} page="counts" />
    <TableContainer title="Counts Played">
      {tables.map(Table => <Table columns={playerCountsColumns} id={playerId} />)}
    </TableContainer>
  </div>
);

const getData = props => {
  props.getPlayerCounts(props.playerId);
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
    return <Overview {...this.props} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  tables: createTables(
    playerCounts.getPlayerCountsById(state, ownProps.playerId),
    playerCounts.getPlayerCountsById,
    (state, sortState, playerId) => playerCounts.getPlayerCountsById(state, playerId),
    // (state, sortState, playerId) => (sortState ? sortPlayerCounts(playerId)(state) : transformPlayerCountsById(playerId)(state)),
    f => f
  ),
});

const mapDispatchToProps = (dispatch) => ({
  getPlayerCounts: (playerId, options) => dispatch(getPlayerCounts(playerId, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
