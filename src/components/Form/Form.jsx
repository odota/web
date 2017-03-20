import React from 'react';
import styles from './Form.css';

const onSubmit = (event) => {
  event.preventDefault();
};

export default ({ children, name, className }) => (
  <form name={name} className={`${styles.form} ${className}`} onSubmit={onSubmit}>
    {children}
  </form>
);
