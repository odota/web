import React from 'react';

const ProgressBar = ({
  percent,
  height,
}: {
  percent: number;
  height: number;
}) => (
  <div>
    <div
      style={{
        bottom: -height,
        marginTop: -height,
        position: 'relative',
        zIndex: '1',
      }}
    >
      {(percent * 100).toFixed(2)}%
    </div>
    {/* <LinearProgress
      style={{ height }}
      mode="determinate"
      value={percent * 100}
      color="#FFD700"
    /> */}
  </div>
);

export default ProgressBar;
