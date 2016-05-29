import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import { getPlayerMatches } from '../../actions';
import { matchColumns } from '../../yasp.config';

const mapStateToProps = (state) => {
  const { error, loading, matches } = state[REDUCER_KEY].gotPlayerMatches;

  return {
    loading,
    error,
    matches,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getPlayerMatches(column)),
  getPlayerMatches: (playerId, numMatches, host) => dispatch(getPlayerMatches(playerId, numMatches, host)),
});

class TableWrapper extends React.Component {
  componentDidMount() {
    this.props.getPlayerMatches(this.props.playerId, 5);
  }

  render() {
    return <Table {...this.props} columns={matchColumns} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableWrapper);
