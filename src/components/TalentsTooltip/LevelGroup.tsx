import React from "react";
import styles from "./LevelGroup.module.css";

const LevelGroup = ({ talents, level }: { talents: any[]; level: string }) => (
  <div className={styles.wrapper}>
    <div className={styles.talentContent}>
      {talents && talents[0] && talents[0].name}
    </div>
    <div className={styles.level}>{level}</div>
    <div className={styles.talentContent}>
      {talents && talents[1] && talents[1].name}
    </div>
  </div>
);

export default LevelGroup;
