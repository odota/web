import React from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'node-uuid';
import { TableHeaderColumn as MaterialTableHeaderColumn } from 'material-ui/Table';
import {
  getWidthStyle,
  getSortIcon,
} from './tableHelpers';
import styles from './Table.css';

export default ({ column, sortClick, sortField, sortState, totalWidth }) => {
  const tooltipId = uuid.v4();

  return (
    <MaterialTableHeaderColumn
      style={{ width: `${getWidthStyle(column.width, totalWidth)}%` }}
    >
      <div
        className={column.sortFn ? styles.headerCell : styles.headerCellNoSort}
        onClick={() => column.sortFn && sortClick(column.field, sortState, column.sortFn)}
      >
        <div>
          <div data-tip data-for={tooltipId}>
            {column.displayName}
            {column.sortFn && getSortIcon(sortState, sortField, column.field, { height: 14, width: 14 })}
            {column.tooltip &&
              <ReactTooltip id={tooltipId} place="top" type="light" effect="solid">
                <div className={styles.headerTooltip}>
                  {column.tooltip}
                </div>
              </ReactTooltip>
            }
          </div>
        </div>
      </div>
    </MaterialTableHeaderColumn>
  );
};
