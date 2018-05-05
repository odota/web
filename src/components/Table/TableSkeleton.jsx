import React from 'react';
import ContentLoader from 'react-content-loader';

const TableSkeleton = props => (
	<ContentLoader
		height={160}
    width={500}
    primaryColor="#666"
    secondaryColor="#666"
		{...props}
	>
		<rect x="0" y="10" rx="5" ry="5" width="500" height="20" /> 
		<rect x="0" y="35" rx="5" ry="5" width="500" height="20" /> 
		<rect x="0" y="60" rx="5" ry="5" width="500" height="20" /> 
		<rect x="0" y="85" rx="5" ry="5" width="500" height="20" /> 
		<rect x="0" y="110" rx="5" ry="5" width="500" height="20" />
	</ContentLoader>
)

export default TableSkeleton;
