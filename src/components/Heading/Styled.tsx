import React from "react";
import styles from "./Styled.module.css";

export const StyledDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.styledDiv} ${className || ""}`} {...props} />;

export const TwoLineDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={`${styles.styledDiv} ${styles.twoLineDiv} ${className || ""}`}
    {...props}
  />
);
