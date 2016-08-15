import React from 'react';
import { Text } from '../Text';
import styles from './TableContainer.css';

export const TableContainer = ({ title, style, children }) => (
  <div className={styles.container} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <Text className={styles.tableHeading}>{title}</Text>
      {children}
    </div>
  </div>
);
