import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default ({ size = 59.5, color = '#00BCD4' }) => (
  <div style={{ textAlign: 'center' }}>
    <CircularProgress size={size} color={color} />
  </div>
);
