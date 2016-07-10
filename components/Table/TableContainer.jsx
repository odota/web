import React from 'react';
import { Text } from '../Text';
import { Card } from 'material-ui/Card';
import styles from './TableContainer.css';

export const TableContainer = ({ title, style, children }) => (
  <div className={styles.overviewHeroes} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <Text className={styles.tableHeading}>{title}</Text>
      <Card className={styles.card}>
        {children}
      </Card>
    </div>
  </div>
);
