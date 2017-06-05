import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { getSortState, getSortField, getSortedData } from 'components/Table/readTable';
import { sortTable } from 'actions';

// We have to give the table an id so we can hold all tables currentPage in memory.
export default (Table, id = uuid.v4()) => {
  const SortedTable = ({ data, sortState, sortField, sortTable, ...rest }) => {
    if (data) {
      return (
        <div>
          <Table
            {...rest}
            sortState={sortState}
            sortClick={sortTable}
            sortField={sortField}
            data={data}
          />
        </div>
      );
    }
    return <span />;
  };

  SortedTable.propTypes = {
    data: PropTypes.array,
    sortState: PropTypes.string,
    sortField: PropTypes.string,
    sortTable: PropTypes.func,
  };

  const mapStateToProps = (state, { data }) => ({
    sortState: getSortState(state, id),
    sortField: getSortField(state, id),
    data: getSortedData(data)(state, id),
  });

  return connect(mapStateToProps, {
    sortTable: sortTable(id),
  })(SortedTable);
};
