import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from 'material-ui/LinearProgress';

const ProgressBar = ({ percent, height }) => (
  <div>
    <div style={{
      bottom: -height, marginTop: -height, position: 'relative', zIndex: '1',
    }}
    >
      {(percent * 100).toFixed(2)}%
    </div>
    <LinearProgress style={{ height }} mode="determinate" value={percent * 100} color="#FFD700" />
  </div>
);

ProgressBar.propTypes = {
  percent: PropTypes.number,
  height: PropTypes.number,
};

export default ProgressBar;
