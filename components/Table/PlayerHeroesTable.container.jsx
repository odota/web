import { connect } from 'react-redux';
import { REDUCER_KEY } from '../../reducers';
import Table from './Table';
import { setPlayerHeroesSort } from '../../actions';
import { playerHeroesColumns } from './columnDefinitions';
import { sortPlayerHeroes, transformPlayerHeroes } from '../../selectors';

const mapStateToProps = (state) => {
  const { error, loading, sortState, sortField } = state[REDUCER_KEY].gotPlayer.heroes;

  return {
    loading,
    error,
    data: sortState ? sortPlayerHeroes(state) : transformPlayerHeroes(state),
    sortState,
    sortField,
    // important to set the columns here since we don't have wrapper anymore
    columns: playerHeroesColumns,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sortClick: (field, sortState, sortFn) => dispatch(setPlayerHeroesSort(field, sortState, sortFn)),
});

const TableWrapper = connect(mapStateToProps, mapDispatchToProps)(Table);

export default TableWrapper;
