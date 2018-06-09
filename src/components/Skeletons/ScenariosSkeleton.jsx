import React from 'react';
import ContentLoader from 'react-content-loader';

const ScenariosSkeleton = () => (
  <ContentLoader height={300} width={800} primaryColor="#666" secondaryColor="#ecebeb" animate>
    <rect x="0" y="55" rx="0" ry="0" width="800" height="50" />
    <rect x="0" y="140" rx="0" ry="0" width="160" height="35" />
    <rect x="180" y="140" rx="0" ry="0" width="160" height="35" />
    <rect x="360" y="140" rx="0" ry="0" width="160" height="35" />
    <rect x="0" y="200" rx="0" ry="0" width="82" height="30" />
  </ContentLoader>
);

export default ScenariosSkeleton;
