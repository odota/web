import React from "react";
import styles from "./Attribute.module.css";

const Attribute = ({
  style,
  children,
}: {
  style?: any;
  children: React.ReactNode;
}) => (
  <span className={styles.wrapper} style={style}>
    {children}
  </span>
);

export default Attribute;
