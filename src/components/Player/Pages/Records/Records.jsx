import React from 'react';
import { connect } from 'react-redux';
import {
  getPlayerRecords,
} from 'actions';
import { browserHistory } from 'react-router';
import { playerRecords } from 'reducers';
import Table from 'components/Table';
import Container from 'components/Container';
import strings from 'lang';
import dataColumns from 'components/Player/Pages/matchDataColumns';
import ButtonGarden from 'components/ButtonGarden';
import playerRecordsColumns from './playerRecordsColumns';

const excludedColumns = ['win_rate', 'level'];
const recordsColumns = dataColumns.filter(col => !excludedColumns.includes(col));

const Records = ({ routeParams, data, error, loading, playerId }) => {
  const selected = routeParams.subInfo || recordsColumns[0];
  return (<div style={{ fontSize: 10 }}>
    <ButtonGarden
      onClick={(buttonName) => {
        browserHistory.push(`/players/${playerId}/records/${buttonName}${window.location.search}`);
      }}
      buttonNames={recordsColumns}
      selectedButton={selected}
    />
    <Container title={strings.heading_records} error={error} loading={loading}>
      <Table
        columns={playerRecordsColumns.concat({
          displayName: strings[`th_${selected}`] || strings.th_record,
          displayFn: (row, col, field) => (field && field.toFixed ? Number(field.toFixed(2)) : ''),
          field: selected,
          relativeBars: true,
        })} data={data}
      />
    </Container>
  </div>);
};

const getData = (props) => {
  props.getPlayerRecords(props.playerId, props.location.query, props.routeParams.subInfo || recordsColumns[0]);
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
    return <Records {...this.props} />;
  }
}

const mapStateToProps = (state, { playerId }) => ({
  data: playerRecords.getRecordsList(state, playerId),
  error: playerRecords.getError(state, playerId),
  loading: playerRecords.getLoading(state, playerId),
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: (playerId, options, subInfo) => dispatch(getPlayerRecords(playerId, options, subInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestLayer);
