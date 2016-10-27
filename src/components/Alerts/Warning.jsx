import React, { PropTypes } from 'react';
import AlertWarning from 'material-ui/svg-icons/alert/warning';
import styles from './Warning.css';

const Warning = ({ children, className, msg }) => (
  <div className={`${styles.Warning} ${className}`}>
    <AlertWarning />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </div>
);

Warning.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  msg: PropTypes.string,
};

export default Warning;
