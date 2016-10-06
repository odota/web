import React from 'react';
import { connect } from 'react-redux';
import strings from 'lang';
import Buttons from './Buttons';
import Why from './Why';
import Sponsors from './Sponsors';
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
      <Buttons />
    </div>
    <Why />
    <Sponsors />
    <div className={styles.bottomText}>
      {strings.home_background_by}
      <a href="//www.artstation.com/artist/mikeazevedo" target="_blank" rel="noopener noreferrer"> Mike Azevedo</a>
    </div>
  </div>
);

function mapStateToProps(data) {
  return { content: data.content };
}

export default connect(mapStateToProps)(Home);
