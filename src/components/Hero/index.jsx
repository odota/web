/* global API_HOST */
import React from 'react';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/json/heroes.json';
import strings from 'lang';
import { Tabs, Tab } from 'material-ui/Tabs';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import HeroBadge from './HeroBadge';

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

const Hero = (props) => (<div>
  <HeroBadge hero={getSingleHero(props.routeParams.heroId)} />
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
