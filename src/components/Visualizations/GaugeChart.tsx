import React from "react";
import { abbreviateNumber } from "../../utility";
import styles from "./GaugeChart.module.css";

const computeMeterPercent = (value: number) => 0.005 * value;

const computeMeterColor = (value: number) => {
  if (value < 20) {
    return "#1769AA";
  } else if (value < 40) {
    return "#0078D4";
  } else if (value < 80) {
    return "#149BD7";
  }
  return "#50E6FF";
};

const GaugeChart = ({
  number,
  percent,
  caption,
}: {
  number: number;
  percent: number;
  caption: string;
}) => {
  const meterPercent = computeMeterPercent(percent);
  const meterColor = computeMeterColor(percent);

  return (
    <div className={`${styles.gaugeChart} gauge-chart`}>
      <div className={styles.caption}>{caption}</div>
      <div className={styles.gauge}>
        <div
          className={styles.meter}
          style={{
            transform: `rotate(${meterPercent}turn)`,
            background: meterColor,
          }}
        />
        <div className={styles.percentageContainer}>
          <div
            className={styles.percentageIndicator}
            style={{ color: meterColor }}
          >
            {`${Math.round(percent * 10) / 10}%`}
          </div>
        </div>
      </div>
      <div className={styles.winNumber}>
        {abbreviateNumber(Math.round((number / 100) * percent))}
      </div>
      <div className={styles.lossNumber}>
        {abbreviateNumber(Math.round((number / 100) * (100 - percent)))}
      </div>
      <div className={styles.totalMatches}>{number}</div>
    </div>
  );
};

export default GaugeChart;
