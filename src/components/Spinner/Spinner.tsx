import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./Spinner.module.css";

const Spinner = ({
  size = 24,
  text,
  textSize,
}: {
  size?: number;
  text?: string;
  textSize?: number;
  enableTrackSlot?: boolean;
}) => {
  return (
    <div className={styles.spinnerContainer}>
      <CircularProgress
        className={styles.slowSpinner}
        size={Math.max(size, 4)}
        color="primary"
        thickness={2}
        enableTrackSlot
      />
      {text && <span className={styles.spinnerText} style={{ fontSize: textSize }}>{text}</span>}
    </div>
  );
};

export default Spinner;
