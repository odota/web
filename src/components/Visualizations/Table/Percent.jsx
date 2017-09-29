import React from 'react';
import PropTypes from 'prop-types';
import { gradient } from 'abcolor';
import styles from './Percent.css';

const Percent = ({ percent, altValue, valEl }) => (
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

const { number, oneOfType, string, node, bool } = PropTypes;

Percent.propTypes = {
  percent: oneOfType([
    number,
    bool,
  ]),
  altValue: oneOfType([
    string,
    number,
    bool,
  ]),
  valEl: node,
};

export default Percent;
