import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './ClearButton.css';

export default ({ clearForm, label = 'clear', style }) => (
  <RaisedButton label={label} onClick={clearForm} style={style} backgroundColor={styles.clearColor} />
);
