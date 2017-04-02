import React from 'react';
import { TableRow as MaterialTableRow } from 'material-ui/Table';
import TableHeaderColumn from './TableHeaderColumn';

const TableHeader = ({ columns, sortState, sortField, sortClick, totalWidth }) => (
  <MaterialTableRow>
    {columns.map((column, index) => (
      <TableHeaderColumn
        key={index}
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
  columns: React.PropTypes.array,
  sortState: React.PropTypes.string,
  sortField: React.PropTypes.string,
  sortClick: React.PropTypes.string,
  totalWidth: React.PropTypes.number,
};

export default TableHeader;
