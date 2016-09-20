import React from 'react';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, children }) => (
  <div className={styles.container} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <div className={styles.tableHeading}>
        <ActionLabelOutline style={{ verticalAlign: 'top', opacity: '.6', height: 26, marginRight: 5 }} />
        {title}
      </div>
      {children}
    </div>
  </div>
);

export default TableContainer;
