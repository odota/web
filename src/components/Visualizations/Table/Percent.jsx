import React from 'react';
import palette from 'components/palette.css';
import styles from './Percent.css';

const percent = ({ val }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {val}
    </div>
    <div className={styles.percent}>
      <div
        style={{ width: `${val}%`, backgroundColor: `${val >= 50 ? palette.green : palette.yelor}` }}
      />
    </div>
  </div>
);

const { number } = React.PropTypes;

percent.propTypes = {
  val: number,
};

export default percent;
