import React from 'react';
import PropTypes from 'prop-types';
import { TableRow as MaterialTableRow } from 'material-ui/Table';
import TableHeaderColumn from './TableHeaderColumn';

const TableHeader = ({
  columns, sortState, sortField, sortClick, totalWidth, setHighlightedCol,
}) => (
  <MaterialTableRow>
    {columns.map((column, index) => (
      <TableHeaderColumn
        key={index}
        column={column}
        sortClick={sortClick}
        sortField={sortField}
        sortState={sortState}
        totalWidth={totalWidth}
        index={index}
        setHighlightedCol={setHighlightedCol}
      />
    ))}
  </MaterialTableRow>
);

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  sortState: PropTypes.string,
  sortField: PropTypes.string,
  sortClick: PropTypes.func,
  totalWidth: PropTypes.number,
  setHighlightedCol: PropTypes.func,
};

export default TableHeader;
