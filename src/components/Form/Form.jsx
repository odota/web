import React from 'react';

const onSubmit = (event) => {
  event.preventDefault();
};

export default ({ children, name, className }) => (
  <form name={name} className={className} onSubmit={onSubmit}>
    {children}
  </form>
);
