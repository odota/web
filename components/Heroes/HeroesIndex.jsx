import React from 'react';
import { hero_names } from 'dotaconstants';

import { API_HOST } from './../../yasp.config';
import HeroList from './HeroList';
import style from './heroes.css';

// create new hero object
const hero_list = {}
Object.keys(hero_names).forEach((key) => {
  hero_list[key] = {...hero_names[key]}
  hero_list[key].img = API_HOST + hero_list[key].img
});

export default () => (
  <div>
    <h1 className={style.Header}>All Dota 2 Heroes</h1> {/*TODO change with variable*/}
    <HeroList heroes={hero_list}/>
  </div>
)
