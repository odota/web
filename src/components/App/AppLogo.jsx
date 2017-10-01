import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import strings from 'lang';
import styles from './App.css';

const AppLogo = ({ size }) => (
  <Link to="/" className={styles.AppLogo}>
    <big style={{ fontSize: size }}>
      {`<${strings.app_name}/>`}
    </big>
  </Link>
);

AppLogo.propTypes = {
  size: PropTypes.string,
};

export default AppLogo;
