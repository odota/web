import React from 'react';
import ContentLoader from 'react-content-loader';

const BenchmarkSkeleton = props => (
  <ContentLoader
    primaryColor="#666"
    secondaryColor="#ecebeb"
    width={400}
    animate
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="25" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="40" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="55" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="70" rx="5" ry="5" width="300" height="5" />
  </ContentLoader>
);

export default BenchmarkSkeleton;
