import React from 'react';
import ContentLoader from 'react-content-loader';

const TableSkeleton = props => (
  <ContentLoader
    height={160}
    width={500}
    primaryColor="#666"
    secondaryColor="#ecebeb"
    animate
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="25" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="40" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="55" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="70" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="85" rx="5" ry="5" width="500" height="10" />
    <rect x="0" y="100" rx="5" ry="5" width="500" height="10" />
  </ContentLoader>
);

export default TableSkeleton;
