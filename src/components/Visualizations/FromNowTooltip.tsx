import React from "react";
import { fromNow } from "../../utility";
import styles from "./FromNowTooltip.module.css";

const FromNowTooltip = ({ timestamp }: { timestamp: number }) => (
  <div
    className={styles.fromNowTooltip}
    data-hint={
      // Country Code Language List http://www.fincher.org/Utilities/CountryLanguageList.shtml
      new Date(Number(timestamp) * 1000).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    }
    data-hint-position="top"
  >
    {fromNow(timestamp)}
  </div>
);

export default FromNowTooltip;
