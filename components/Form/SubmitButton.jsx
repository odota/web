import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from './SubmitButton.css';

export default ({ submitForm, label = 'submit', style }) => (
  <RaisedButton label={label} onClick={submitForm} style={style} labelColor={styles.textColor} backgroundColor={styles.submitColor} />
);
