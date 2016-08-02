import React from 'react';
// eslint-disable-next-line camelcase
import { hero_names } from 'dotaconstants';

import { API_HOST } from './../../yasp.config';
import HeroList from './HeroList';
import style from './heroes.css';

// create new hero object
const heroList = {};
Object.keys(hero_names).forEach((key) => {
  heroList[key] = { ...hero_names[key] };
  heroList[key].img = API_HOST + heroList[key].img;
});

export default () => (
  <div>
    <h1 className={style.Header}>All Dota 2 Heroes</h1>
    <HeroList heroes={heroList} />
  </div>
);
