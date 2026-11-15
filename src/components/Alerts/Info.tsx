import React from "react";
import { InfoIcon } from "../ui";
import styles from "./Info.module.css";

const Info = ({
  children,
  className,
  msg,
}: {
  children: React.ReactNode;
  className?: string;
  msg?: string;
}) => (
  <div className={`${styles.styledDiv} ${className || ""}`}>
    <InfoIcon />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </div>
);

export default Info;
