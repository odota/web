import React from 'react';
import { gradient } from 'abcolor';
import styles from './Percent.css';

const percent = ({ val, total }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {val}% {total && <small>{total}</small>}
    </div>
    <div className={styles.percent}>
      <div
        style={{
          width: `${val}%`,
          backgroundColor: gradient(val, {
            css: true,
            from: styles.red,
            to: styles.green,
          }),
        }}
      />
    </div>
  </div>
);

const { number, oneOfType, string } = React.PropTypes;

percent.propTypes = {
  val: number,
  total: oneOfType([
    string,
    number,
  ]),
};

export default percent;
