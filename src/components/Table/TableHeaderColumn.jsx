import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'uuid';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import { getSortIcon } from './tableHelpers';
import styles from './Table.css';

export default ({ column, sortClick, sortField, sortState }) => {
  const tooltipId = uuid.v4();
  const style = {};

  if (column.center) {
    style.justifyContent = 'center';
  }

  return (
    <MaterialTableHeaderColumn>
      <div
        className={styles.headerCell}
        onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
        style={style}
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
