import React from "react";

import GaugeChart from "./../../../Visualizations/GaugeChart";
import styles from "./CountsSummary.module.css";

const Summary = ({
  data,
}: {
  data: Record<string, { label: string; data: any[] }>;
}) => (
  <div className={styles.styled}>
    {Object.values(data).flatMap((group) => (
      <div className={styles.group}>
        <div className={styles.groupLabel}>{group.label}</div>
        <div className={styles.chartPair}>
          {group.data.map((el: any) => (
            <GaugeChart
              key={`${group.label}-${el.category}`}
              number={el.matches}
              percent={el.winPercent}
              caption={el.category}
            />
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default Summary;
