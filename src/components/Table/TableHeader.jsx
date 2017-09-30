import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as MaterialTableRow } from 'material-ui/Table';
import TableHeaderColumn from './TableHeaderColumn';

const TableHeader = ({ columns, sortState, sortField, sortClick, totalWidth }) => (
  <MaterialTableRow>
    {columns.map(column => (
      <TableHeaderColumn
        key={column.field}
        column={column}
        sortClick={sortClick}
        sortField={sortField}
        sortState={sortState}
        totalWidth={totalWidth}
      />
    ))}
  </MaterialTableRow>

);

TableHeader.propTypes = {
  columns: PropTypes.array,
  sortState: PropTypes.string,
  sortField: PropTypes.string,
  sortClick: PropTypes.string,
  totalWidth: PropTypes.number,
};

export default TableHeader;
