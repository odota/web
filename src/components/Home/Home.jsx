import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import styles from './Home.css';

const Home = () => (
  <div>
    <div className={styles.HeadContainer}>
      <div className={styles.headline}>
        {strings.app_name}
      </div>
      <div className={styles.description}>
        {strings.app_description}
      </div>
    </div>
  </div>
);

function mapStateToProps(data) {
  return { content: data.content };
}

export default connect(mapStateToProps)(Home);
