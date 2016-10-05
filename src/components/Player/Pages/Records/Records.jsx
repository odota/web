import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRecords,
  setPlayerRecordsSort,
} from 'actions';
import {
  sortPlayerRecords,
  transformPlayerRecordsById,
} from 'selectors';
import { playerRecords } from 'reducers';
import { createTable, TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerRecordsColumns from './playerRecordsColumns';

const RecordsTable = createTable(
  playerRecords.getPlayerRecordsById,
  (state, sortState, playerId) => (sortState ? sortPlayerRecords(playerId)(state) : transformPlayerRecordsById(playerId)(state)),
  setPlayerRecordsSort
);

const Records = ({ playerId }) => (
  <div>
    <TableFilterForm submitAction={getPlayerRecords} id={playerId} page="records" />
    <TableContainer title={strings.heading_records}>
      <RecordsTable columns={playerRecordsColumns} id={playerId} />
    </TableContainer>
  </div>
);

const mapStateToProps = (state, { playerId }) => ({ playerId });

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: playerId => dispatch(getPlayerRecords(playerId)),
});

const getData = (props) => {
  props.getPlayerRecords(props.playerId);
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
    return <Records {...this.props} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
