import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlayerRecords } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import dataColumns from '../matchDataColumns';
import ButtonGarden from '../../../ButtonGarden';
import playerRecordsColumns from './playerRecordsColumns';

const excludedColumns = ['win_rate', 'level'];
const recordsColumns = dataColumns.filter(col => !excludedColumns.includes(col));

const Records = ({
  routeParams, data, error, loading, playerId, history, strings,
}) => {
  const selected = routeParams.subInfo || recordsColumns[0];
  return (
    <div style={{ fontSize: 10 }}>
      <ButtonGarden
        onClick={(buttonName) => {
          history.push(`/players/${playerId}/records/${buttonName}${window.location.search}`);
        }}
        buttonNames={recordsColumns}
        selectedButton={selected}
      />
      <Container title={strings.heading_records} error={error} loading={loading}>
        <Table
          columns={playerRecordsColumns(strings).concat({
            displayName: strings[`th_${selected}`] || strings.th_record,
            displayFn: (row, col, field) => (field && field.toFixed ? Number(field.toFixed(2)) : ''),
            field: selected,
            relativeBars: true,
          })}
          data={data}
        />
      </Container>
    </div>);
};

Records.propTypes = {
  routeParams: PropTypes.shape({}),
  history: PropTypes.shape({}),
  data: PropTypes.arrayOf({}),
  error: PropTypes.string,
  playerId: PropTypes.string,
  loading: PropTypes.bool,
  strings: PropTypes.shape({}),
};


const getData = (props) => {
  props.getPlayerRecords(props.playerId, props.location.search, props.routeParams.subInfo || recordsColumns[0]);
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
    return <Records {...this.props} />;
  }
}

const mapStateToProps = state => ({
  data: state.app.playerRecords.data,
  error: state.app.playerRecords.error,
  loading: state.app.playerRecords.loading,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: (playerId, options, subInfo) => dispatch(getPlayerRecords(playerId, options, subInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
