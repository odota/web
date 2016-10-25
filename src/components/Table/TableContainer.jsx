import React from 'react';
import Heading from 'components/Heading';
import { ContentContainer } from 'components/ContentContainer';

const TableContainer = ({ title, style, className, children, error, loading }) => (
  <div className={className} style={{ ...style }}>
    {title && <Heading title={title} />}
    <ContentContainer error={error} loading={loading}>
      {children}
    </ContentContainer>
  </div>
);

export default TableContainer;
