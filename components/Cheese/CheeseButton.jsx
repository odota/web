import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router';
import styles from './CheeseButton.css';
import RaisedButton from 'material-ui/RaisedButton';

export default () => (
  <Link to="/carry">
    <RaisedButton
      backgroundColor={styles.backgroundColor}
      style={{ height: 50 }}
      icon={(
        <div>
          <FontIcon className={styles.cheese} />
          <span>Help us out</span>
          <FontIcon className={styles.cheese} />
        </div>
      )}
    />
  </Link>
);
