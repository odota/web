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

export default TableHeader;
