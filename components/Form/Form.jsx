import React from 'react';
import styles from './Form.css';
// Pass down the form name to all the children as the form name
// is where those input values will live.

const onSubmit = event => {
  event.preventDefault();
};

export default ({ children, name }) => (
  <form className={styles.form} onSubmit={onSubmit}>
    {React.Children.map(children, child => React.cloneElement(child, {
      formName: name,
    }))}
  </form>
);
