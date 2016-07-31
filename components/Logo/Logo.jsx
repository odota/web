import React from 'react';
import { Link } from 'react-router';

export default ({ className }) => (
  <Link to="/" className={className}>
    <strong>YASP</strong>
  </Link>
);
