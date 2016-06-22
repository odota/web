import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getHeroes = (state) => state[REDUCER_KEY].gotPlayer.heroes.heroes;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;

const transformPlayerHeroes = createSelector(
  [getHeroes, getConstants],
  (heroes, constants) => transformationFunction(heroes, constants)
);

export default transformPlayerHeroes;
