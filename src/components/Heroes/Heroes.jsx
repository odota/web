/* global API_HOST */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/json/heroes.json';
import { Tabs, Tab } from 'material-ui/Tabs';
import HeroList from './HeroList';
import style from './Heroes.css';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import HeroBadge from './HeroBadge';

const createHeroList = (heroes) => {
  const result = Object.keys(heroes)
    .map(key => ({ ...heroes[key], img: API_HOST + heroes[key].img }))
    .sort((a, b) => (a.localized_name.localeCompare(b.localized_name)));
  return result;
};

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

const HeroesIndex = ({ heroes }) => (
  <div>
    <h1 className={style.Header}>Heroes</h1>
    <HeroList heroes={heroes} />
  </div>
);

class Heroes extends Component {
  componentDidMount() {
    // console.log(this.props);
  }
  render() {
    if (this.props.routeParams && this.props.routeParams.heroId) {
      return (<div>
        <HeroBadge hero={getSingleHero(this.props.routeParams.heroId)} />
        <Tabs>
          <Tab label="Rankings">
            <Ranking {...this.props} />
          </Tab>
          <Tab label="Benchmarks">
            <Benchmark {...this.props} />
          </Tab>
        </Tabs>
      </div>);
    }
    return <HeroesIndex heroes={createHeroList(heroes)} />;
  }
}

export default connect()(Heroes);
