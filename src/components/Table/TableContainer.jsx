import React from 'react';
import Heading from 'components/Heading';
import { ContentContainer } from 'components/ContentContainer';
import styles from './TableContainer.css';

const TableContainer = ({ title, style, className, children, error, loading }) => (
  <div className={`${styles.container} ${className}`} style={{ ...style }}>
    <div className={styles.heroesContainer}>
      <Heading title={title} />
      <ContentContainer error={error} loading={loading}>
        {children}
      </ContentContainer>
    </div>
  </div>
);

export default TableContainer;
