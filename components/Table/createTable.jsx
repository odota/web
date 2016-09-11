import React from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import TableContainer from './TableContainer';
import withPagination from './PaginatedTable';
import { deSnake } from '../../utility';

const createTable = (getStateFn, getData, sortAction) => {
  const mapStateToProps = (state, ownProps) => {
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

const createTableWithSelectors = (selectors, getData, sortAction) => {
  const mapStateToProps = (state, ownProps) => {
    const sortState = selectors.getSortState(state, ownProps.id);
    return {
      loading: selectors.getLoading(state, ownProps.id),
      error: selectors.getError(state, ownProps.id),
      data: getData(state, sortState, ownProps.id),
      sortState,
      sortField: selectors.getSortField(state, ownProps.id),
      columns: ownProps.columns,
    };
  };

  const mapDispatchToProps = (dispatch, ownProps) => ({
    sortClick: (field, sortState, sortFn) => dispatch(sortAction(field, sortState, sortFn, ownProps.id)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(withPagination(Table));
};

export const createTables = (tablesObject, columns, id) =>
  (selectors, getData, sortAction) =>
    Object.keys(tablesObject.data).map(key => {
      const Table = createTableWithSelectors(
        {
          ...selectors,
          getSortState: selectors.getSortState(key),
          getSortField: selectors.getSortField(key),
        },
        (state, sortState, id) => getData(key)(state, sortState, id),
        (field, sortState, sortFn, id) => sortAction(key)(field, sortState, sortFn, id)
      );
      return (
        <TableContainer title={deSnake(tablesObject.data[key].name)}>
          <Table columns={columns} id={id} />
        </TableContainer>
      );
    });

export default createTable;
