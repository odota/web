import React from 'react';
import PropTypes from 'prop-types';
import ActionInfo from 'material-ui/svg-icons/action/info';
import styles from './Info.css';

const Info = ({ children, className, msg }) => (
  <div className={`${styles.Info} ${className}`}>
    <ActionInfo />
    <span>
      {!children && msg}
      {!msg && children}
    </span>
  </div>
);

Info.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  msg: PropTypes.string,
};

export default Info;
