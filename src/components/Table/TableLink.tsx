import React from 'react';
import { Link } from 'react-router-dom';
//@ts-expect-error
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import constants from '../constants';

const TableLink = ({ to, children, target, color }: { to: string, children: React.ReactNode, target?: string, color?: string }) => (
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

export default TableLink;
