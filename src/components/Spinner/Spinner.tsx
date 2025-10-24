import React from 'react';
import { CircularProgress } from '@mui/material';

const Spinner = ({ size = 59.5 }) => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress size={Math.max(size, 4)} color="primary" />
  </div>
);

export default Spinner;
