import React from 'react';
import styles from './FormGroup.css';

export default ({ children, className, allSelectedElements, addChip, deleteChip }) => (
  <div className={`${styles.formGroup} ${className}`}>
    {React.Children.map(children, child => React.cloneElement(child, {
      selectedElements: [].concat(allSelectedElements[child.props.name] || []),
      addChip,
      deleteChip,
    }))}
  </div>
);
