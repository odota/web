import React from 'react';
import TableHeaderColumn from './TableHeaderColumn';

const TableHeader = ({
  columns,
  sortState,
  sortField,
  sortClick,
  setHighlightedCol,
}: {
  columns: any[],
  sortState: string,
  sortField: string,
  sortClick: Function,
  setHighlightedCol?: Function,
}) => (
  <tr>
    {columns.map((column, index) => (
      <TableHeaderColumn
        key={index}
        column={column}
        sortClick={sortClick}
        sortField={sortField}
        sortState={sortState}
        index={index}
        setHighlightedCol={setHighlightedCol}
      />
    ))}
  </tr>
);

export default TableHeader;
