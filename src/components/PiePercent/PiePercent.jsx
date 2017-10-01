import React from 'react';
import PropTypes from 'prop-types';
import styles from './PiePercent.css';

const PiePercent = ({ percent, color, negativeColor }) => (
  <svg viewBox="0 0 32 32" className={styles.pieChart} styles={{ color: negativeColor }}>
    <circle
      r="16"
      cx="16"
      cy="16"
      className={styles.pieInner}
      shapeRendering="crispEdges"
      style={{ strokeDasharray: `${percent} 100`, color }}
    />
  </svg>
);

PiePercent.propTypes = {
  percent: PropTypes.number,
  color: PropTypes.string,
  negativeColor: PropTypes.string,
};

export default PiePercent;
