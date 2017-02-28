import React from 'react';
import { gradient } from 'abcolor';
import styles from './Percent.css';

const percent = ({ val, altValue, valEl }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {valEl || val} {altValue && <small>{altValue}</small>}
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

const { number, oneOfType, string, node } = React.PropTypes;

percent.propTypes = {
  val: number,
  total: oneOfType([
    string,
    number,
  ]),
  valEl: node,
};

export default percent;
