import React from 'react';
import styles from './FormGroup.css';

export default ({ children, formName, className }) => (
  <div className={`${styles.formGroup} ${className}`}>
    {React.Children.map(children, child => React.cloneElement(child, {
      formName,
    }))}
  </div>
);
