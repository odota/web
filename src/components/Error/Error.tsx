import React from 'react';

const Error = (props: { text?: string }) => (
  <div>Whoops! Something went wrong. {props.text ? props.text : ''}</div>
);

export default Error;
