import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import createConstantsWrapper from '../Constants';
import { getPlayerMatches } from '../../actions';
import playerMatchesColumns from './playerMatchesColumns';

const mapStateToProps = (state) => {
  const { error, loading, matches } = state[REDUCER_KEY].gotPlayer.matches;
  return {
    loading,
    error,
    data: matches,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sort: (column) => dispatch(getPlayerMatches(column)),
  getPlayerMatches: (playerId, numMatches, host) => dispatch(getPlayerMatches(playerId, numMatches, host)),
});

class RequestLayer extends React.Component {
  componentDidMount() {
    this.props.getPlayerMatches(this.props.playerId, this.props.numMatches);
  }

  render() {
    return <Table {...this.props} columns={playerMatchesColumns} />;
  }
}

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(RequestLayer);

export default createConstantsWrapper(TableWrapper);
