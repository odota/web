import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import nanoid from 'nanoid';
import { getSortIcon } from './tableHelpers';
import { StyledHeaderCell } from './Styled';
import { getColStyle } from '../../utility';

const TableHeaderColumn = ({
  column, sortClick, sortField, sortState, index, setHighlightedCol,
}) => {
  const tooltipId = nanoid();
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
          data-tip={column.tooltip && true}
          data-for={tooltipId}
          style={{ color: column.color, width: '100%', textAlign: getColStyle(column).textAlign }}
        >
          {column.displayName}
          {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
          {column.tooltip &&
          <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
            {column.tooltip}
          </ReactTooltip>
          }
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
