import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import styles from '../palette.css';

const TableLink = ({ to, children }) => (
  <Link to={to}>
    {children}
    <HardwareKeyboardArrowRight
      style={{
        verticalAlign: 'text-bottom',
        opacity: '.6',
        height: 16,
        width: 16,
        color: styles.blue,
      }}
    />
  </Link>
);

const { string, node } = PropTypes;

TableLink.propTypes = {
  to: string,
  children: node,
};

export default TableLink;
