import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

// 10/31/2017 @ 5:00pm (UTC) - patch 7.07
const is707 = unixDate => unixDate > 1509426000;
// 12/13/2016 @ 5:00pm (UTC) - patch 7.00
const is700 = unixDate => unixDate > 1481648400 && unixDate < 1509426000;
// 12/16/2015 @ 5:00pm (UTC) - patch 6.86
const is686 = unixDate => unixDate > 1450242000 && unixDate < 1481648400;
// 09/25/2014 @ 5:00pm (UTC) - patch 6.82
const is682 = unixDate => unixDate > 1411621200 && unixDate < 1450242000;
// Before 09/25/2014 @ 5:00pm (UTC) - pre patch 6.82
const isPre682 = unixDate => unixDate < 1411621200;

// TODO make this a generic function that can determine which of multiple maps to use
const getUrl = (startTime) => {
  if (startTime === null || is707(startTime)) {
    return '/assets/images/dota2/map/detailed_707.png';
  } else if (startTime === null || is700(startTime)) {
    return '/assets/images/dota2/map/detailed_700.png';
  } else if (startTime === null || is686(startTime)) {
    return '/assets/images/dota2/map/detailed_686.png';
  } else if (startTime === null || is682(startTime)) {
    return '/assets/images/dota2/map/detailed_682.png';
  } else if (startTime === null || isPre682(startTime)) {
    return '/assets/images/dota2/map/detailed_pre682.png';
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
