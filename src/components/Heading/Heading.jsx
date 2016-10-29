import React, { PropTypes } from 'react';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './Heading.css';

const Heading = ({ title, icon = <ActionLabelOutline />, subtitle, className }) => (
  <div className={`${styles.tableHeading} ${className}`}>
    {icon}
    <span className={styles.title}>
      {title}
    </span>
    <span className={styles.subtitle}>
      {subtitle}
    </span>
  </div>
);

Heading.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
};

export default Heading;
