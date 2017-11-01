import React from 'react';
import { string } from 'prop-types';

const Error = props => (
  <div>Whoops! Something went wrong. {props.text ? props.text : ''}</div>
);

Error.propTypes = {
  text: string,
};

export default Error;
