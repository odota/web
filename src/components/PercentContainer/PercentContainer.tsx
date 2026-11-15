import React from "react";
import { LinearProgress } from "../ui";
import { getPercentWin } from "../../utility";
import styles from "./PercentContainer.module.css";
// const getPercentWin = (wins, games) => (games ? Math.ceil(1000 * (wins / games)) / 10 : 0);

// the LinearProgress can be swapped for PiePercent if it turns out people prefer that
const PercentContainer = ({
  wins,
  games,
  percent,
}: {
  wins: number;
  games: number;
  percent: number;
}) => (
  <div className={styles.percentContainer}>
    <div className={styles.textContainer}>
      {percent || getPercentWin(wins, games).toFixed(1)}
    </div>
    <LinearProgress
      style={{ height: 5 }}
      // color={styles.lineColor}
      variant="determinate"
      value={percent || getPercentWin(wins, games)}
      color="warning"
    />
  </div>
);
