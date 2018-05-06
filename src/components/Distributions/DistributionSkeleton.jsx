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
		<rect x="150" y="60" rx="0" ry="0" width="15" height="100" /> 
		<rect x="170" y="50" rx="0" ry="0" width="15" height="110" /> 
		<rect x="190" y="40" rx="0" ry="0" width="15" height="120" /> 
		<rect x="210" y="30" rx="0" ry="0" width="15" height="130" /> 
		<rect x="230" y="20" rx="0" ry="0" width="15" height="140" /> 
		<rect x="250" y="10" rx="0" ry="0" width="15" height="150" /> 
		<rect x="270" y="20" rx="0" ry="0" width="15" height="140" /> 
		<rect x="290" y="30" rx="0" ry="0" width="15" height="130" /> 
		<rect x="310" y="40" rx="0" ry="0" width="15" height="120" /> 
		<rect x="330" y="50" rx="0" ry="0" width="15" height="110" /> 
		<rect x="350" y="60" rx="0" ry="0" width="15" height="100" />
	</ContentLoader>
)

export default DistributionSkeleton; 
