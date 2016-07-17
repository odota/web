import React from 'react';
import styles from './WinLoss.css';
// import {red500, green500, grey500} from 'material-ui/styles/colors';

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
