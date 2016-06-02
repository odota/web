import React from 'react';
import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import createConstantsWrapper from '../Constants';
import { getPlayerMatches, setPlayerMatchesSort } from '../../actions';
import { playerMatchesColumns } from './columnDefinitions';
import { sortPlayerMatches, transformPlayerMatches } from '../../selectors';

const mapStateToProps = (state) => {
  const { error, loading, sortState, sortField } = state[REDUCER_KEY].gotPlayer.matches;

  return {
    loading,
    error,
    data: sortState ? sortPlayerMatches(state) : transformPlayerMatches(state),
    sortState,
    sortField,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sortClick: (field, sortState, sortFn) => dispatch(setPlayerMatchesSort(field, sortState, sortFn)),
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
