import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default ({ size = 59.5, color = '#00BCD4' }) => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress size={Math.max(size, 4)} color={color} />
  </div>
);
