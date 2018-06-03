import React from 'react';
import ContentLoader from 'react-content-loader';

const DistributionsSkeleton = props => (
  <ContentLoader
    height={200}
    width={500}
    primaryColor="#666"
    secondaryColor="#ecebeb"
    animate
    {...props}
  >
    <rect x="150" y="50" rx="5" ry="5" width="5" height="100" />
    <rect x="160" y="45" rx="5" ry="5" width="5" height="105" />
    <rect x="170" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="180" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="190" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="200" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="210" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="220" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="230" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="240" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="250" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="260" y="14" rx="5" ry="5" width="5" height="136" />
    <rect x="270" y="15" rx="5" ry="5" width="5" height="135" />
    <rect x="280" y="18" rx="5" ry="5" width="5" height="132" />
    <rect x="290" y="21" rx="5" ry="5" width="5" height="129" />
    <rect x="300" y="25" rx="5" ry="5" width="5" height="125" />
    <rect x="310" y="29" rx="5" ry="5" width="5" height="121" />
    <rect x="320" y="33" rx="5" ry="5" width="5" height="117" />
    <rect x="330" y="37" rx="5" ry="5" width="5" height="113" />
    <rect x="340" y="41" rx="5" ry="5" width="5" height="109" />
    <rect x="350" y="45" rx="5" ry="5" width="5" height="105" />
  </ContentLoader>
);

export default DistributionsSkeleton;
