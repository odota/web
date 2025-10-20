import React from 'react';
import constants from '../constants';

const Error = (props: { text: string }) => (
  <div style={{ backgroundColor: constants.colorDanger, padding: '15px', color: 'white' }}>
    Whoops! Something went wrong. {props.text ? props.text : ''}
  </div>
);

export default Error;
