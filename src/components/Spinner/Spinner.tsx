import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = ({ size = 59.5, color = '#00BCD4' }) => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress size={Math.max(size, 4)} color={color} />
  </div>
);

export default Spinner;
