import React from "react";
import ReactTooltip from "react-tooltip";
import LevelGroup from "./LevelGroup";
import styles from "./TalentsTooltip.module.css";

const TalentsTooltip = ({
  talents,
  ttId,
}: {
  talents: any[];
  ttId: string;
}) => (
  <div className={styles.wrapper}>
    <ReactTooltip id={ttId} effect="solid" place="left">
      <div className={styles.content}>
        <div className={styles.background} />
        <LevelGroup talents={talents[3]} level="25" />
        <LevelGroup talents={talents[2]} level="20" />
        <LevelGroup talents={talents[1]} level="15" />
        <LevelGroup talents={talents[0]} level="10" />
      </div>
    </ReactTooltip>
  </div>
);

export default TalentsTooltip;
