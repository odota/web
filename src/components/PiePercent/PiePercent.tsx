import React from "react";
import styles from "./PiePercent.module.css";

const PiePercent = ({
  percent,
  color,
  negativeColor,
}: {
  percent: number;
  color: string;
  negativeColor: string;
}) => (
  <svg
    className={styles.svg}
    viewBox="0 0 32 32"
    style={{ color: negativeColor }}
  >
    <circle
      className={styles.circle}
      r="16"
      cx="16"
      cy="16"
      shapeRendering="crispEdges"
      style={{ strokeDasharray: `${percent} 100`, color }}
    />
  </svg>
);

export default PiePercent;
