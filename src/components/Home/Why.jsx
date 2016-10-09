import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import strings from 'lang';
import { IconOpenSource, IconStatsBars, IconWand } from 'components/Icons';
import styles from './Home.css';

export default () => (
  <div className={styles.AwesomeContainer}>
    <div className={styles.why}>
      {strings.home_why}
    </div>
    <Row around="xs">
      <Col xs={12} sm={3} className={styles.xsWhyElement}>
        <IconOpenSource />
        <div className={styles.headline}>
          {strings.home_opensource_title}
        </div>
        <div className={styles.description}>
          {strings.home_opensource_desc}
        </div>
      </Col>
      <Col xs={12} sm={3} className={styles.xsWhyElement}>
        <IconStatsBars />
        <div className={styles.headline}>
          {strings.home_indepth_title}
        </div>
        <div className={styles.description}>
          {strings.home_indepth_desc}
        </div>
      </Col>
      <Col xs={12} sm={3} className={styles.xsWhyElement}>
        <IconWand />
        <div className={styles.headline}>
          {strings.home_free_title}
        </div>
        <div className={styles.description}>
          {strings.home_free_desc}
        </div>
      </Col>
    </Row>
  </div>
);
