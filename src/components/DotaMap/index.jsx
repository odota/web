import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { patchDate } from '../../utility';

const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

const dotaMaps = [
  { patch: '7.33', images: { jpg: '/assets/images/dota2/map/detailed_733.jpg', webp: '/assets/images/dota2/map/detailed_733.webp' } },
  { patch: '7.32', images: { jpg: '/assets/images/dota2/map/detailed_732.jpg', webp: '/assets/images/dota2/map/detailed_732.webp' } },
  { patch: '7.23', images: { jpg: '/assets/images/dota2/map/detailed_723.jpg', webp: '/assets/images/dota2/map/detailed_723.webp' } },
  { patch: '7.20', images: { jpg: '/assets/images/dota2/map/detailed_720.jpg', webp: '/assets/images/dota2/map/detailed_720.webp' } },
  { patch: '7.07', images: { jpg: '/assets/images/dota2/map/detailed_707.jpg', webp: '/assets/images/dota2/map/detailed_707.webp' } },
  { patch: '7.00', images: { jpg: '/assets/images/dota2/map/detailed_700.jpg', webp: '/assets/images/dota2/map/detailed_700.webp' } },
  { patch: '6.86', images: { jpg: '/assets/images/dota2/map/detailed_686.jpg', webp: '/assets/images/dota2/map/detailed_686.webp' } },
  { patch: '6.82', images: { jpg: '/assets/images/dota2/map/detailed_682.jpg', webp: '/assets/images/dota2/map/detailed_682.webp' } },
  { patch: '6.70', images: { jpg: '/assets/images/dota2/map/detailed_pre682.jpg', webp: '/assets/images/dota2/map/detailed_pre682.webp' } },
];


const getPatchMap = (startTime) => {
  if (!startTime) return dotaMaps[0];

  const patchMap = dotaMaps.find(dotaMap => startTime >= patchDate[dotaMap.patch]);

  return patchMap || dotaMaps[0];
};

const MapContainer = styled.div`
  position: relative;
`;

const MapImage = styled.picture`
  position: relative;

  img {
    height: 100%;
    max-width: 100%;
  }
`;

const MapContent = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2;
`;

const DotaMap = ({
  startTime = null,
  maxWidth = 400,
  width = 400,
  children,
}) => {
  const mapData = getPatchMap(startTime);

  return (
    <MapContainer style={setMapSizeStyle(width, maxWidth)}>
      <MapImage>
        <source srcSet={mapData.images.webp} type="image/webp" />
        <source srcSet={mapData.images.jpg} type="image/jpeg" />
        <img src={mapData.images.jpg} alt={`Dota 2 Map - ${mapData.patch}`} />
      </MapImage>
      <MapContent>
        {children}
      </MapContent>
    </MapContainer>
  );
};

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
