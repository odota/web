import React from "react";
import styles from "./AghsTooltipHeader.module.css";

const AghanimsTooltipHeader = ({
  image,
  type,
  children,
}: {
  image: string;
  type: string;
  children: React.ReactNode;
}) => (
  <div className={styles.header}>
    <div className={styles.headerContent}>
      <img id={`${type}-img`} src={image} alt="" />
      <div className={styles.headerText}>{children}</div>
    </div>
  </div>
);

export default AghanimsTooltipHeader;
