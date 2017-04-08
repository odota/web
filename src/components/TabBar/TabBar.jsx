import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './TabBar.css';

const TabBar = ({ tabs, info, mediaQClass = null }) => (
  <main className={`${styles.container} ${mediaQClass}`}>
    <section className={styles.subContainer}>
      {tabs.map((tab, index) => (
        <Link
          key={index}
          className={tab.key === info && styles.chosen}
          to={tab.route + window.location.search}
          disabled={tab.disabled}
        >
          {tab.name}
        </Link>
      ))}
    </section>
  </main>
);

const { string, shape, arrayOf } = PropTypes;
TabBar.propTypes = {
  tabs: arrayOf(shape({})),
  info: string,
  mediaQClass: string,
};

export default TabBar;
