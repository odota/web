import { connect } from 'react-redux';
import Table from './Table';
import withPagination from './PaginatedTable';

const createTable = (getStateFn, getData, sortAction) => {
  const mapStateToProps = (state, ownProps) => {
    console.log('wow', getStateFn(state, ownProps.id), state, ownProps.id)
    const { error, loading, sortState, sortField } = getStateFn(state, ownProps.id);
    return {
      loading,
      error,
      data: getData(state, sortState, ownProps.id),
      sortState,
      sortField,
      columns: ownProps.columns,
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    sortClick: (field, sortState, sortFn) => dispatch(sortAction(field, sortState, sortFn, ownProps.id)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(withPagination(Table));
};

export const createTables = (tablesObject, getStateFn, getData, sortAction) =>
  Object.keys(tablesObject.data).map(key => {
    console.log('key', tablesObject.data, key)
    return createTable(
      (state, id) => getStateFn(state, id),
      (state, sortState, id) => getStateFn(state, id).data[key],
      f => f
      // (field, sortState, sortFn, id) => sortAction(key)(field, sortState, sortFn, id)
    )});

export default createTable;
