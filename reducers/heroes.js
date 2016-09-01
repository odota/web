import { heroes } from 'dotaconstants';
import { API_HOST } from './../config';

// lazy evaluation
// add API_HOST to hero img path so components
// don't need to know API_HOST
const transformHeroImagePath = (heroes) => {
  const heroList = {};
  Object.keys(heroes).forEach((key) => {
    heroList[key] = { ...heroes[key] };
    heroList[key].img = API_HOST + heroList[key].img;
  });

  return heroList;
};

// we do nothing, just put heroes to state tree
export default (state = transformHeroImagePath(heroes)) => state;
