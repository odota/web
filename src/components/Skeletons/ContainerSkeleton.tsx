import React from "react";
import styles from "./Skeleton.module.css";

const ContainerSkeleton = ({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`${styles.bulletList}${className ? ` ${className}` : ""}`}
    style={style}
    aria-busy="true"
  >
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className={styles.bulletRow}>
        <div className={`${styles.block} ${styles.bulletDot}`} />
        <div className={`${styles.block} ${styles.bulletBar}`} />
      </div>
    ))}
  </div>
);

export default ContainerSkeleton;
