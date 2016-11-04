import React from 'react';
import { Link } from 'react-router';
import styles from './TabBar.css';

const TabBar = ({ tabs, info }) => (
  <main className={styles.container}>
    <section className={styles.subContainer}>
      {tabs.map((tab, index) => (
        <Link
          key={index}
          className={`${styles.tab} ${tab.key === info ? styles.sliding : ''}`}
          to={tab.route}
        >
          {tab.name}
        </Link>
      ))}
    </section>
  </main>
);

const { string, shape, arrayOf } = React.PropTypes;
TabBar.propTypes = {
  tabs: arrayOf(shape({})),
  info: string,
};

export default TabBar;
