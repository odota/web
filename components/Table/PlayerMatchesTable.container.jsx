import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
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
    // important to set the columns here since we don't have wrapper anymore
    columns: playerMatchesColumns,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sortClick: (field, sortState, sortFn) => dispatch(setPlayerMatchesSort(field, sortState, sortFn)),
  getPlayerMatches: (playerId, numMatches, host) => dispatch(getPlayerMatches(playerId, numMatches, host)),
});

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableWrapper;
