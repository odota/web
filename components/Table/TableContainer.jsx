import React from 'react';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, children }) => (
  <div className={styles.container} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <div className={styles.tableHeading}>{title}</div>
      {children}
    </div>
  </div>
);

export default TableContainer;
