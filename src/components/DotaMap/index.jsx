import React, { PropTypes } from 'react';

import { isPost700 } from 'utility';
import styles from './DotaMap.css';

const bindWidth = (width, maxWidth) => (width >= maxWidth ? maxWidth : width);

const setMapSizeStyle = (width, maxWidth) => ({
  width: bindWidth(width, maxWidth),
  height: bindWidth(width, maxWidth),
  maxWidth,
  maxHeight: maxWidth,
});

const getClassName = (startTime, pre700, type) => {
  let className = 'map';
  // this will default the map to post 700 if the start time isn't included
  if (!pre700 && (startTime === null || isPost700(startTime))) {
    className += '700';
  }
  if (type === 'simple') {
    className += 'Simple';
  }
  return styles[className];
};

const DotaMap = ({ type = 'detailed', startTime = null, pre700, maxWidth = 400, width = 400, children }) => (
  <div
    className={getClassName(startTime, pre700, type)}
    style={setMapSizeStyle(width, maxWidth)}
  >
    {children}
  </div>
);

const { number, node, string, oneOfType, oneOf, bool } = PropTypes;

DotaMap.propTypes = {
  type: oneOf(['detailed', 'simple']),
  pre700: bool,
  startTime: number,
  maxWidth: number,
  width: number,
  children: oneOfType([node, string]),
};

export default DotaMap;
