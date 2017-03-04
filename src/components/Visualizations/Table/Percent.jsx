import React from 'react';
import { gradient } from 'abcolor';
import styles from './Percent.css';

const percent = ({ val, smallValue, valEl }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {valEl || val} {smallValue && <small>{smallValue}</small>}
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
  smallValue: oneOfType([
    string,
    number,
  ]),
  valEl: node,
};

export default percent;
