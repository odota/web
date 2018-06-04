import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import constants from '../constants';

const TableLink = ({
  to, children, target, color,
}) => (
  <Link to={to} target={target}>
    {children}
    <HardwareKeyboardArrowRight
      style={{
        verticalAlign: 'text-bottom',
        opacity: '.6',
        height: 16,
        width: 16,
        color: color || constants.colorBlue,
      }}
    />
  </Link>
);

const { string, node } = PropTypes;

TableLink.propTypes = {
  to: string,
  children: node,
  target: string,
  color: string,
};

export default TableLink;
