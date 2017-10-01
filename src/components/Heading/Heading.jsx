import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './Heading.css';

const Heading = ({ title = '', titleTo, icon = <ActionLabelOutline />, subtitle, className }) => (
  <div className={`${styles.tableHeading} ${className}`}>
    {icon}
    <span className={styles.title}>
      {titleTo ?
        <Link to={titleTo}>
          {title.trim()}
        </Link>
        : title.trim()}
    </span>
    <span className={styles.subtitle}>
      {subtitle}
    </span>
  </div>
);

const { string, element, oneOfType, object } = PropTypes;

Heading.propTypes = {
  title: string,
  titleTo: string,
  icon: oneOfType([
    string,
    element,
  ]),
  subtitle: object,
  className: string,
};

export default Heading;
