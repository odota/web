/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import Heading from 'components/Heading';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import styles from './Hero.css';

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

const Hero = ({ props }) => (<div className={styles.Header}>
  <Helmet title={getSingleHero(props.routeParams.heroId).localized_name} />
  <Heading
    title={getSingleHero(props.routeParams.heroId).localized_name}
    className={styles.Heading}
    icon=""
  />
  <img role="presentation" src={getSingleHero(props.routeParams.heroId).img} className={styles.image} />
  <div style={{ display: 'flex' }}>
    <div style={{ width: '50%', padding: '15px' }}>
      <Heading title={strings.tab_rankings} />
      <Ranking {...props} />
    </div>
    <div style={{ width: '50%', padding: '15px' }}>
      <Heading title={strings.tab_benchmarks} />
      <Benchmark {...props} />
    </div>
  </div>
</div>);

export default connect()(Hero);
