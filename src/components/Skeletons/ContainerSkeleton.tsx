import React from 'react';
import { BulletList } from 'react-content-loader';

const ContainerSkeleton = (props: any) => (
  <BulletList primaryColor="#666" secondaryColor="#ecebeb" {...props} />
);

export default ContainerSkeleton;
