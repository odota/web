import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import { setMatchSort } from '../../actions';
import { sortMatch, transformMatch } from '../../selectors';

const mapStateToProps = (state, ownProps) => {
  const { error, loading, sortState, sortField } = state[REDUCER_KEY].gotMatch.match.players;

  return {
    loading,
    error,
    data: sortState ? sortMatch(state) : transformMatch(state),
    // data: transformMatch(state),
    sortState,
    sortField,
    // important to set the columns here since we don't have wrapper anymore
    columns: ownProps.columns,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sortClick: (field, sortState, sortFn) => dispatch(setMatchSort(field, sortState, sortFn)),
});

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableWrapper;
