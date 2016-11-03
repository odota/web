import React from 'react';
import { Link } from 'react-router';
// import { Tabs, Tab } from 'material-ui/Tabs';
// import { browserHistory } from 'react-router';
import styles from './TabBar.css';

const TabBar = ({ tabs, info }) => (
  <div className={styles.container}>
    <div className={styles.subContainer}>
      {tabs.map((tab, index) => (
        <Link
          key={index}
          className={`${styles.tab} ${tab.key === info ? styles.sliding : ''}`}
          to={tab.route}
        >
          {tab.name}
        </Link>
      ))}
    </div>
  </div>
);

const { string, shape, arrayOf } = React.PropTypes;
TabBar.propTypes = {
  tabs: arrayOf(shape({})),
  info: string,
};

export default TabBar;
