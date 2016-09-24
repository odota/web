import React from 'react';
import { Link } from 'react-router';
import { APP_NAME } from 'config';

export default (props) => (
  <Link to="/" style={{ textTransform: 'uppercase' }}>
    <strong {...props}>{`<${APP_NAME} />`}</strong>
  </Link>
);
