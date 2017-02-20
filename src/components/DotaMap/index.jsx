import React, { PropTypes } from 'react';
import classnames from 'classnames';
import styles from './DotaMap.css';

const setMapSizeStyle = (width, maxWidth) => ({
  width,
  height: width,
  maxWidth,
  maxHeight: maxWidth,
});

// TODO make this a generic function that can determine which of multiple maps to use
// 12/13/2016 @ 5:00pm (UTC)
const isPost700 = unixDate => unixDate > 1481648400;

const getClassName = (startTime) => {
  let className = 'map';
  // this will default the map to post 700 if the start time isn't included
  if (startTime === null || isPost700(startTime)) {
    className += '700';
  }
  return styles[className];
};

const DotaMap = ({
  className,
  startTime = null,
  maxWidth = 400,
  width = 400,
  children,
}) => (
  <div
    className={classnames(getClassName(startTime), className)}
    style={setMapSizeStyle(width, maxWidth)}
  >
    {children}
  </div>
);

const { number, node, string, oneOfType } = PropTypes;

DotaMap.propTypes = {
  startTime: number,
  maxWidth: oneOfType([number, string]),
  width: oneOfType([number, string]),
  children: oneOfType([node, string]),
  className: string,
};

export default DotaMap;
