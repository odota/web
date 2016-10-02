import React from 'react';
import Heading from 'components/Heading';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, children }) => (
  <div className={styles.container} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <Heading title={title} />
      {children}
    </div>
  </div>
);

export default TableContainer;
