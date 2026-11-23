import React from "react";
import styles from "./Skeleton.module.css";

const ScenariosSkeleton = () => (
  <div className={styles.scenarios} aria-busy="true">
    <div className={`${styles.block} ${styles.scenariosHeader}`} />
    <div className={styles.scenariosFilters}>
      <div className={`${styles.block} ${styles.scenariosFilter}`} />
      <div className={`${styles.block} ${styles.scenariosFilter}`} />
      <div className={`${styles.block} ${styles.scenariosFilter}`} />
    </div>
    <div className={`${styles.block} ${styles.scenariosButton}`} />
  </div>
);

export default ScenariosSkeleton;
