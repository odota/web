import React from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import { StyledHeaderCell } from "./Styled";
import { getSortIcon } from "./tableHelpers";
import { getColStyle } from "../../utility";

const HeaderCellContent = styled.div`
  position: relative;
`;

const HeaderCellImageContent = styled.img`
  height: 24px;
  width: 24px;
`;

const HeaderCellSortIconWrapper = styled.div`
  height: 14px;
  margin-left: 0px;
  position: absolute;
  width: 10px;
  left: -5px;
  bottom: -12px;
`;

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
              <HeaderCellContent>
                {column.displayIcon ? (
                  <React.Fragment>
                    <span> {column.displayName} </span>
                    <HeaderCellImageContent src={column.displayIcon} />
                  </React.Fragment>
                ) : (
                  <span>{column.displayName}</span>
                )}
                {column.sortFn && (
                  <HeaderCellSortIconWrapper>
                    {getSortIcon(sortState, sortField, column.field, {
                      height: 12,
                      width: 12,
                    })}
                  </HeaderCellSortIconWrapper>
                )}
              </HeaderCellContent>
            </Tooltip>
          )}
        </div>
      </StyledHeaderCell>
    </th>
  );
};

export default TableHeaderColumn;
