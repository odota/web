/* global API_HOST */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import heroes from 'dotaconstants/json/heroes.json';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import HeroList from './HeroList';
import style from './Heroes.css';
import Ranking from './Ranking';
import Benchmark from './Benchmark';
import HeroBadge from './HeroBadge';

const createHeroList = (heroes, filter) => {
  const filteredHeroes = [];

  Object.keys(heroes).forEach((key) => {
    if (typeof filter === 'undefined' || filter.length === 0) {
      filteredHeroes[key] = {
        ...heroes[key],
        img: API_HOST + heroes[key].img,
      };
    }

    if (heroes[key].localized_name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
      // localized name of hero contains the substring of filter
      filteredHeroes[key] = {
        ...heroes[key],
        img: API_HOST + heroes[key].img,
      };
    }
  });

  return filteredHeroes.sort((a, b) => (a.localized_name.localeCompare(b.localized_name)));
};

const getSingleHero = heroId => ({ ...heroes[heroId], img: API_HOST + heroes[heroId].img });

class Heroes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: '',
    };
  }

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

    return (
      <div>
        <h1 className={style.Header}>Heroes</h1>
        <div className={style.SearchBar}>
          <TextField
            hintText={'Filter Heroes'}
            value={this.state.filter}
            onChange={e => this.setState({ filter: e.target.value })}
            fullWidth
            underlineFocusStyle={{ borderColor: style.filterBarColor }}
            underlineStyle={{ borderColor: 'transparent' }}
          />
        </div>
        <HeroList heroes={createHeroList(heroes, this.state.filter)} />
      </div>
    );
  }
}

export default connect()(Heroes);
