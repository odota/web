import React from 'react';
import Heading from 'components/Heading';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, className, children }) => (
  <div className={className} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <Heading title={title} />
      {children}
    </div>
  </div>
);

export default TableContainer;
