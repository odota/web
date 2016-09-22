import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import styles from '../palette.css';

export default ({ submitForm, label = 'submit', style }) => (
  <FlatButton
    label={label}
    onClick={submitForm}
    style={style}
    backgroundColor={styles.buttonBgSubmit}
    hoverColor={styles.buttonHoverSubmit}
    labelStyle={{ color: styles.textSecondary }}
  />
);
