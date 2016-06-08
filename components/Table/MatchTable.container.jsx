import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import createConstantsWrapper from '../Constants';
import { getMatch, setMatchSort } from '../../actions';
import { overviewColumns } from './columnDefinitions';
import { sortMatch, transformMatch } from '../../selectors';

const mapStateToProps = (state) => {
  const { error, loading, sortState, sortField } = state[REDUCER_KEY].gotMatch.match.players;

  return {
    loading,
    error,
    data: sortState ? sortMatch(state) : transformMatch(state),
    // data: transformMatch(state),
    sortState,
    sortField,
    // important to set the columns here since we don't have wrapper anymore
    columns: overviewColumns,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sortClick: (field, sortState, sortFn) => dispatch(setMatchSort(field, sortState, sortFn)),
  getMatch: (playerId, numMatches, host) => dispatch(getMatch(playerId, numMatches, host)),
});

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(Table);

export default createConstantsWrapper(TableWrapper);
