import React from 'react';
import { connect } from 'react-redux';
import uuid from 'node-uuid';
import { table } from 'reducers';
import { sortTable } from 'actions';
// TODO - get sorting to actually work. Nothing happens when I click right now.
// We have to give the table an id so we can hold all tables currentPage in memory.
export default (Table, id = uuid.v4()) => {
  const SortedTable = ({ data, sortState, sortTable, ...rest }) => {
    console.log('sortedTable', sortState, sortTable);
    if (data) {
      return (
        <div>
          <Table
            {...rest}
            sortState={sortState}
            sortClick={sortTable}
            data={data}
          />
        </div>
      );
    }
    return <span />;
  };

  const mapStateToProps = (state, { data }) => ({
    sortState: table.getSortState(state, id),
    data: table.getSortedData(data)(state, id),
  });

  return connect(mapStateToProps, {
    sortTable: sortTable(id),
  })(SortedTable);
};
