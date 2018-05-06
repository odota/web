import React from 'react';
import ContentLoader from 'react-content-loader';

const DistributionSkeleton = props => (
  <ContentLoader
    height={160}
    width={500}
    speed={2}
    primaryColor="#666"
    {...props}
  >
    <rect x="150" y="110" rx="5" ry="5" width="5" height="100" />
    <rect x="160" y="105" rx="5" ry="5" width="5" height="105" />
    <rect x="170" y="100" rx="5" ry="5" width="5" height="110" />
    <rect x="180" y="95" rx="5" ry="5" width="5" height="115" />
    <rect x="190" y="90" rx="5" ry="5" width="5" height="120" />
    <rect x="200" y="85" rx="5" ry="5" width="5" height="125" />
    <rect x="210" y="80" rx="5" ry="5" width="5" height="130" />
    <rect x="220" y="75" rx="5" ry="5" width="5" height="135" />
    <rect x="230" y="70" rx="5" ry="5" width="5" height="140" />
    <rect x="240" y="65" rx="5" ry="5" width="5" height="145" />
    <rect x="250" y="60" rx="5" ry="5" width="5" height="150" />
    <rect x="260" y="65" rx="5" ry="5" width="5" height="155" />
    <rect x="270" y="70" rx="5" ry="5" width="5" height="160" />
    <rect x="280" y="75" rx="5" ry="5" width="5" height="165" />
    <rect x="290" y="80" rx="5" ry="5" width="5" height="170" />
    <rect x="300" y="85" rx="5" ry="5" width="5" height="175" />
    <rect x="310" y="90" rx="5" ry="5" width="5" height="180" />
    <rect x="320" y="95" rx="5" ry="5" width="5" height="185" />
    <rect x="330" y="100" rx="5" ry="5" width="5" height="190" />
    <rect x="340" y="105" rx="5" ry="5" width="5" height="195" />
    <rect x="350" y="110" rx="5" ry="5" width="5" height="200" />
  </ContentLoader>
);

export default DistributionSkeleton;
