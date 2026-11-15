import React from "react";
import styles from "./Styled.module.css";

export const StyledBody: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    customWidth?: number;
    hoverRowColumn?: boolean;
  }
> = ({ customWidth, hoverRowColumn, className, ...props }) => (
  <div
    className={`${styles.styledBody}${customWidth ? ` ${styles.customWidth}` : ""}${hoverRowColumn ? ` ${styles.hoverRowColumn}` : ""}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledContainer: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledContainer}${className ? ` ${className}` : ""}`}
    {...props}
  />
);

export const StyledHeaderCell: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className, ...props }) => (
  <div
    className={`${styles.styledHeaderCell}${className ? ` ${className}` : ""}`}
    {...props}
  />
);
