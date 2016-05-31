import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import styles from './CheeseButton.css';
import FlatButton from 'material-ui/FlatButton';

export default () => (
  <Link to="/carry">

    <FontIcon className={styles.cheese} />
    <FlatButton
      label="Help us out"
      labelStyle={{ color: '#fff' }}
      hoverColor={styles.hoverColor}
      backgroundColor={styles.backgroundColor}
      style={{ height: 50 }}
    />
    <FontIcon className={styles.cheese} />
  </Link>
);
