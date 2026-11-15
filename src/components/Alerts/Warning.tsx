import React from "react";
import { WarningIcon } from "../ui";
import styles from "./Warning.module.css";

const Warning = ({
  children,
  className,
  msg,
}: {
  children: React.ReactNode;
  className: string;
  msg?: string;
}) => (
  <div className={`${styles.styledDiv} ${className || ""}`}>
    <WarningIcon />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </div>
);

export default Warning;
