import React from 'react';
import { BulletList } from 'react-content-loader';

const ContainerSkeleton = props => (
  <BulletList
    primaryColor="#666"
    secondaryColor="#ecebeb"
    {...props}
  />
);

export default ContainerSkeleton;
