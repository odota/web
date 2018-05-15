import React from 'react';
import ContentLoader from 'react-content-loader';

const RecentSkeleton = props => (
  <ContentLoader
    primaryColor="#371b68"
    secondaryColor="#371b68"
    width={400}
    animate={false}
    {...props}
  >
    <rect x="0" y="10" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="25" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="40" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="55" rx="5" ry="5" width="300" height="5" />
    <rect x="0" y="70" rx="5" ry="5" width="300" height="5" />
  </ContentLoader>
);

export default RecentSkeleton;
