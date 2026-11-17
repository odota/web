import React from "react";
import { CircularProgress } from "@mui/material";
import styles from "./Spinner.module.css";

const Spinner = ({
  size = 24,
  text,
}: {
  size?: number;
  text?: string;
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
      {text && <span className={styles.spinnerText}>{text}</span>}
    </div>
  );
};

export default Spinner;
