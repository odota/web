import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getHeroes = (state) => state[REDUCER_KEY].gotMatch.match.players.heroes.heroes;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;
console.log('inside here');
const transformPlayerHeroes = createSelector(
  [getHeroes, getConstants],
  (heroes, constants) => {
    console.log(heroes);
    return transformationFunction(heroes, constants);
  }
);

export default transformPlayerHeroes;
