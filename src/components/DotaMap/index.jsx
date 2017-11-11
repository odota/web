import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import patch from 'dotaconstants/build/patch.json';

const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

const dotaMaps = [
  { patchName: '7.07', mapImage: '/assets/images/dota2/map/detailed_707.png' },
  { patchName: '7.00', mapImage: '/assets/images/dota2/map/detailed_700.png' },
  { patchName: '6.86', mapImage: '/assets/images/dota2/map/detailed_686.png' },
  { patchName: '6.82', mapImage: '/assets/images/dota2/map/detailed_682.png' },
  { patchName: '6.70', mapImage: '/assets/images/dota2/map/detailed_pre682.png' },
];

const patchDate = {};
patch.forEach((patchElement) => {
  patchDate[patchElement.name] = new Date(patchElement.date).getTime() / 1000;
});

const getUrl = (startTime) => {
  if (startTime == null) return dotaMaps[0];
  for (let i = 0; i < dotaMaps.length; i += 1) {
    if (startTime >= patchDate[dotaMaps[i].patchName]) return dotaMaps[i].mapImage;
  }
  return dotaMaps[0];
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
