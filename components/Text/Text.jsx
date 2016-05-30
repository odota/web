import React from 'react';
import styles from './Text.css';

export default ({ color, size, children }) => {
  const propStyles = { };
  if (color) {
    propStyles.color = color;
  }
  if (size) {
    propStyles.fontSize = size;
  }
  return <div className={styles.text} style={propStyles}>{children}</div>;
};
