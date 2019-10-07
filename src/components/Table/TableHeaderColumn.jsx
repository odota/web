import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { StyledHeaderCell } from './Styled';
import { getColStyle } from '../../utility';

const TableHeaderColumn = ({
  column, sortClick, sortState, index, setHighlightedCol,
}) => {
  const style = {
    justifyContent: column.center ? 'center' : null,
  };
  return (
    <th
      style={{
        backgroundColor: column.colColor,
        ...getColStyle(column),
      }}
      {...(setHighlightedCol && setHighlightedCol(index))}
      className={column.className}
    >
      <StyledHeaderCell
        onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
        style={style}
      >
        <div
          style={{ color: column.color, width: '100%', textAlign: getColStyle(column).textAlign }}
        >
          { !column.tooltip ? column.displayName : (
            <Tooltip title={column.tooltip}>
              <span>
                {column.displayName}
              </span>
            </Tooltip>
          ) }
        </div>
      </StyledHeaderCell>
    </th>
  );
};

TableHeaderColumn.propTypes = {
  column: PropTypes.shape({}),
  sortClick: PropTypes.func,
  sortField: PropTypes.string,
  sortState: PropTypes.string,
  setHighlightedCol: PropTypes.func,
  index: PropTypes.number,
};

export default TableHeaderColumn;
