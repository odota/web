import React from 'react';
import strings from 'lang';
import { IconOpenSource, IconStatsBars, IconWand } from 'components/Icons';
import styles from './Home.css';

export default () => (
  <div className={styles.WhyContainer}>
    <div className={styles.whyList}>
      <div className={styles.whyElement}>
        <IconOpenSource />
        <div className={styles.headline}>
          {strings.home_opensource_title}
        </div>
        <div className={styles.description}>
          {strings.home_opensource_desc}
        </div>
      </div>
      <div className={styles.whyElement}>
        <IconStatsBars />
        <div className={styles.headline}>
          {strings.home_indepth_title}
        </div>
        <div className={styles.description}>
          {strings.home_indepth_desc}
        </div>
      </div>
      <div className={styles.whyElement}>
        <IconWand />
        <div className={styles.headline}>
          {strings.home_free_title}
        </div>
        <div className={styles.description}>
          {strings.home_free_desc}
        </div>
      </div>
    </div>
  </div>
);
