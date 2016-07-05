import React from 'react';
import styles from './WinLoss.css';

const getColor = result => {
  if (result.toLowerCase() === 'w') return styles.win;
  if (result.toLowerCase() === 'l') return styles.loss;
  return styles.notScored;
};

export default ({ result }) => (
  <div className={getColor(result)}>
    {result}
  </div>
);
