import React from 'react';
import ActionLabelOutline from 'material-ui/svg-icons/action/label-outline';
import styles from './Heading.css';

const Heading = ({
  title,
}) => (
  <div className={styles.tableHeading}>
    <ActionLabelOutline style={{ verticalAlign: 'top', opacity: '.6', height: 26, marginRight: 5 }} />
    {title}
  </div>);

export default Heading;
