import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const getTotalWidth = (columns: any[]) =>
  columns.reduce((prev, current) => prev + current.width, 0);

const getWidthStyle = (column: number, total: number) => column / total;

const isSortField = (sortField: string, field: string) => sortField === field;

const getSortIcon = (
  sortState: string,
  sortField: string,
  field: string,
  style: React.CSSProperties,
) => {
  if (isSortField(sortField, field)) {
    if (sortState === "asc") {
      return <ArrowUpwardIcon style={style} />;
    }
    if (sortState === "desc") {
      return <ArrowDownwardIcon style={style} />;
    }
  }
  return null;
};

export { getTotalWidth, getWidthStyle, isSortField, getSortIcon };
