import React from "react";
import { Tooltip } from "@mui/material";
import { StyledHeaderCell } from "./Styled";
import { getSortIcon } from "./tableHelpers";
import { getColStyle } from "../../utility";
import styles from "./TableHeaderColumn.module.css";

const TableHeaderColumn = ({
  column,
  sortClick,
  sortState,
  sortField,
  index,
  setHighlightedCol,
}: {
  column: any;
  sortClick: Function;
  sortField: string;
  sortState: string;
  setHighlightedCol?: Function;
  index: number;
}) => {
  const style: React.CSSProperties = {
    justifyContent: column.center ? "center" : undefined,
  };
  return (
    <th
      style={{
        ...getColStyle(column),
      }}
      {...(setHighlightedCol && setHighlightedCol(index))}
      className={column.className}
    >
      <StyledHeaderCell
        onClick={() =>
          column.sortFn && sortClick(column.field, sortState, column.sortFn)
        }
        style={style}
      >
        <div
          style={{
            color: column.color,
            width: "100%",
            textAlign: getColStyle(column).textAlign,
          }}
        >
          {!column.tooltip ? (
            column.displayName
          ) : (
            <Tooltip title={column.tooltip}>
              <div className={styles.headerCellContent}>
                {column.displayIcon ? (
                  <React.Fragment>
                    <span> {column.displayName} </span>
                    <img
                      className={styles.headerCellImageContent}
                      src={column.displayIcon}
                    />
                  </React.Fragment>
                ) : (
                  <span>{column.displayName}</span>
                )}
                {column.sortFn && (
                  <div className={styles.headerCellSortIconWrapper}>
                    {getSortIcon(sortState, sortField, column.field, {
                      height: 12,
                      width: 12,
                    })}
                  </div>
                )}
              </div>
            </Tooltip>
          )}
        </div>
      </StyledHeaderCell>
    </th>
  );
};

export default TableHeaderColumn;
