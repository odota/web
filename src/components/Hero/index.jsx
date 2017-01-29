/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import heroes from 'dotaconstants/build/heroes.json';
import strings from 'lang';
import { Tabs, Tab } from 'material-ui/Tabs';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import style from './Hero.css';

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

const Hero = props => (<div>
  <Helmet title={getSingleHero(props.routeParams.heroId).localized_name} />
  <div className={style.HeroBadge}>
    <img role="presentation" src={getSingleHero(props.routeParams.heroId).img} />
    <h2>{getSingleHero(props.routeParams.heroId).localized_name}</h2>
  </div>
  <Tabs>
    <Tab label={strings.tab_rankings}>
      <Ranking {...props} />
    </Tab>
    <Tab label={strings.tab_benchmarks}>
      <Benchmark {...props} />
    </Tab>
  </Tabs>
</div>);

export default connect()(Hero);
