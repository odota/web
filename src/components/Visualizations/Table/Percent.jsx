import React from 'react';
import { gradient } from 'abcolor';
import styles from './Percent.css';

const percent = ({ percent, altValue, valEl }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {valEl || percent} {altValue && <small>{altValue}</small>}
    </div>
    <div className={styles.percent}>
      <div
        style={{
          width: `${percent}%`,
          backgroundColor: gradient(percent, {
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
  percent: number,
  altValue: oneOfType([
    string,
    number,
  ]),
  valEl: node,
};

export default percent;
