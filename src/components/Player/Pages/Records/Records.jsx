import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRecords,
} from 'actions';
import { playerRecords } from 'reducers';
import Table, { TableContainer } from 'components/Table';
import { TableFilterForm } from 'components/Form';
import strings from 'lang';
import playerRecordsColumns from './playerRecordsColumns';

const Records = ({ playerId, data }) => (
  <div>
    <TableFilterForm submitAction={getPlayerRecords} id={playerId} page="records" />
    <TableContainer title={strings.heading_records}>
      <Table columns={playerRecordsColumns} data={data} />
    </TableContainer>
  </div>
);

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

const mapStateToProps = (state, { playerId }) => ({
  data: playerRecords.getRecordsList(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: playerId => dispatch(getPlayerRecords(playerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
