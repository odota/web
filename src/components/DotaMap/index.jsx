import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

// 12/13/2016 @ 5:00pm (UTC)
const isPost700 = unixDate => unixDate > 1481648400;

// TODO make this a generic function that can determine which of multiple maps to use
const getUrl = (startTime) => {
  if (startTime === null || isPost700(startTime)) {
    return '/assets/images/dota2/map/detailed_700.png';
  }
  return '/assets/images/dota2/map/detailed.png';
};

const MapContainer = styled.div`
  position: relative;
  background: url("${props => getUrl(props.startTime)}");
  background-size: contain;
`;

const DotaMap = ({
  startTime = null,
  maxWidth = 400,
  width = 400,
  children,
}) => (
  <MapContainer
    startTime={startTime}
    style={setMapSizeStyle(width, maxWidth)}
  >
    {children}
  </MapContainer>
);

const {
  number, node, string, oneOfType,
} = PropTypes;

DotaMap.propTypes = {
  startTime: number,
  maxWidth: oneOfType([number, string]),
  width: oneOfType([number, string]),
  children: oneOfType([node, string]),
};

export default DotaMap;
