import React, { PropTypes } from 'react';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './Heading.css';

const Heading = ({ title = '', icon = <ActionLabelOutline />, subtitle, className }) => (
  <div className={`${styles.tableHeading} ${className}`}>
    {icon}
    <span className={styles.title}>
      {title.trim()}
    </span>
    <span className={styles.subtitle}>
      {subtitle}
    </span>
  </div>
);

const { string, element } = PropTypes;

Heading.propTypes = {
  title: string,
  icon: element,
  subtitle: string,
  className: string,
};

export default Heading;
