import React from 'react';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './Heading.css';

const Heading = ({ title, icon }) => (
  <div className={styles.tableHeading}>
    {icon || <ActionLabelOutline />}
    {title}
  </div>
);

export default Heading;
