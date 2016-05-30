import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import styles from './CheeseButton.css';
import RaisedButton from 'material-ui/RaisedButton';

export default () => (
  <Link to="/carry">

    <FontIcon className={styles.cheese} />
    <RaisedButton
      label="Help us out"
      labelColor="#fff"
      backgroundColor={styles.backgroundColor}
      style={{ height: 50 }}
    />
    <FontIcon className={styles.cheese} />
  </Link>
);
