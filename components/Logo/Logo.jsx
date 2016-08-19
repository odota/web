import React from 'react';
import { Link } from 'react-router';
import { APP_NAME } from '../../config.js';

export default ({ className }) => (
  <Link to="/" className={className}>
    <strong>{APP_NAME}</strong>
  </Link>
);
