import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ submitForm, label = 'submit' }) => (
  <RaisedButton label={label} onClick={submitForm} />
);
