import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default ({ clearForm, label = 'clear', style }) => (
  <RaisedButton label={label} onClick={clearForm} style={style} />
);
