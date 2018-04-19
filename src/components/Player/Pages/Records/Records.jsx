import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getPlayerRecords } from '../../../../actions';
import Table from '../../../Table';
import Container from '../../../Container';
import strings from '../../../../lang';
import dataColumns from '../matchDataColumns';
import ButtonGarden from '../../../ButtonGarden';
import playerRecordsColumns from './playerRecordsColumns';

const excludedColumns = ['win_rate', 'level'];
const recordsColumns = dataColumns.filter(col => !excludedColumns.includes(col));

const Records = ({
  routeParams, data, error, loading, playerId, history,
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
          columns={playerRecordsColumns.concat({
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
};


const getData = (props) => {
  props.getPlayerRecords(props.playerId, props.location.search, props.routeParams.subInfo || recordsColumns[0]);
};

class RequestLayer extends React.Component {
  componentDidMount() {
    getData(this.props);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props.playerId !== nextProps.playerId || this.props.location.key !== nextProps.location.key) {
      getData(nextProps);
    }
  }

  render() {
    return <Records {...this.props} />;
  }
}

RequestLayer.propTypes = {
  location: PropTypes.shape({
    key: PropTypes.string,
  }),
  playerId: PropTypes.string,
};

const mapStateToProps = state => ({
  data: state.app.playerRecords.data,
  error: state.app.playerRecords.error,
  loading: state.app.playerRecords.loading,
});

const mapDispatchToProps = dispatch => ({
  getPlayerRecords: (playerId, options, subInfo) => dispatch(getPlayerRecords(playerId, options, subInfo)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RequestLayer));
