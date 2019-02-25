import React from 'react';
import ContentLoader from 'react-content-loader';

const AbilityBuildTableSkeleton = () => (
  <ContentLoader height={600} width={1200} primaryColor="#666" secondaryColor="#ecebeb" animate>
    <rect x="0" y="0" rx="0" ry="0" width="1200" height="250" />
    <rect x="0" y="300" rx="0" ry="0" width="1200" height="250" />
  </ContentLoader>
);

export default AbilityBuildTableSkeleton;
