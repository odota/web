import React from "react";
import styles from "./Skeleton.module.css";

const AbilityBuildTableSkeleton = () => (
  <div className={styles.abilityBuild} aria-busy="true">
    <div className={`${styles.block} ${styles.abilityBuildRow}`} />
    <div className={`${styles.block} ${styles.abilityBuildRow}`} />
  </div>
);

export default AbilityBuildTableSkeleton;
