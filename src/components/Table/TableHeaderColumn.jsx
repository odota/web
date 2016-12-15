import React, { PropTypes } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import { getSortIcon } from './tableHelpers';
import styles from './Table.css';

const TableHeaderColumn = ({ column, sortClick, sortField, sortState }) => {
  const tooltipId = uuid.v4();
  if (!column) {
    return null;
  }

  return (
    <MaterialTableHeaderColumn
      onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
    >
      <div
        className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
      >
        <div data-tip={column.tooltip && true} data-for={tooltipId} style={{ color: column.color }}>
          {column.displayName}
          {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
          {column.tooltip &&
          <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
            {column.tooltip}
          </ReactTooltip>
          }
        </div>
      </div>
    </MaterialTableHeaderColumn>
  );
};

const {
  bool,
  oneOfType,
  string,
  func,
  shape,
} = PropTypes;

TableHeaderColumn.propTypes = {
  column: shape({
    displayFn: func,
    sortFn: oneOfType([func, bool]),
    field: string.isRequired,
    tooltip: string,
    displayName: string,
  }).isRequired,
  sortState: string,
  sortField: string,
  sortClick: func,
};

export default TableHeaderColumn;
