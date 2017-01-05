import React, { PropTypes } from 'react';
import classnames from 'classnames';

import { isPost700 } from 'utility';
import styles from './DotaMap.css';


const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
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

const DotaMap = ({
  className,
  type = 'detailed',
  startTime = null,
  pre700,
  maxWidth = 400,
  width = 400,
  children,
}) => (
  <div
    className={classnames(getClassName(startTime, pre700, type), className)}
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
  maxWidth: oneOfType([number, string]),
  width: oneOfType([number, string]),
  children: oneOfType([node, string]),
  className: string,
};

export default DotaMap;
