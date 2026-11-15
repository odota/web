import React from "react";
import constants from "../constants";
import styles from "./Styles.module.css";

export const StyledDiv: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={`${styles.styledDiv} ${className || ""}`} {...props} />;

export const buttonStyle: React.CSSProperties = {
  marginTop: "20px",
  marginBottom: "20px",
};

export const formFieldStyle: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  marginTop: "20px",
  gap: "8px",
};

export const tabsStyle: React.CSSProperties = {
  marginBottom: "50px",
  marginTop: "10px",
  borderBottom: `1px solid ${constants.dividerColor}`,
};

export const listStyle: React.CSSProperties = {
  backgroundColor: "rgba(0, 0, 0, 0.35)",
  maxHeight: 400,
  overflow: "auto",
};
