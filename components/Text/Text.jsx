import React from 'react';
import styles from './Text.css';

export default ({ color, size, children, className }) => {
  const propStyles = { };
  if (color) {
    propStyles.color = color;
  }
  if (size) {
    propStyles.fontSize = size;
  }
  return <div className={`${styles.text} ${className}`} style={propStyles}>{children}</div>;
};
