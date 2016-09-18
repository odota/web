import React from 'react';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, children }) => (
  <div className={styles.container} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <div className={styles.tableHeading}>
        <HardwareKeyboardArrowRight style={{ verticalAlign: 'top', opacity: '.6', height: 26 }} />
        {title}
      </div>
      {children}
    </div>
  </div>
);

export default TableContainer;
