import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import styles from '../palette.css';

export default ({ clearForm, label = 'clear', style }) => (
  <FlatButton
    label={label}
    onClick={clearForm}
    style={style}
    backgroundColor={styles.buttonBgDefault}
    hoverColor={styles.buttonHoverDefault}
  />
);
