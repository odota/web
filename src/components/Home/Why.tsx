import React from "react";
import { IconOpenSource, IconStatsBars, IconWand } from "../Icons";
import useStrings from "../../hooks/useStrings.hook";
import styles from "./Why.module.css";

const Why = () => {
  const strings = useStrings();
  return (
    <div className={styles.styledDiv}>
      <div className={styles.whyList}>
        <div className={styles.whyElement}>
          <IconOpenSource />
          <div className={styles.headline}>{strings.home_opensource_title}</div>
          <div className={styles.description}>
            {strings.home_opensource_desc}
          </div>
        </div>
        <div className={styles.whyElement}>
          <IconStatsBars />
          <div className={styles.headline}>{strings.home_indepth_title}</div>
          <div className={styles.description}>{strings.home_indepth_desc}</div>
        </div>
        <div className={styles.whyElement}>
          <IconWand />
          <div className={styles.headline}>{strings.home_free_title}</div>
          <div className={styles.description}>{strings.home_free_desc}</div>
        </div>
      </div>
    </div>
  );
};

export default Why;
