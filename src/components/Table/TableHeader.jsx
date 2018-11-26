import React from 'react';
import PropTypes from 'prop-types';
import TableHeaderColumn from './TableHeaderColumn';

const TableHeader = ({
  columns, sortState, sortField, sortClick, totalWidth, setHighlightedCol,
}) => (
  <tr>
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
  </tr>
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
