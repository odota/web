import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getHeroes = (state) => state[REDUCER_KEY].gotMatch.match.players.heroes_list;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;

const transformMatchTable = createSelector(
  [getHeroes, getConstants],
  (players, constants) => transformationFunction(players, constants)
);

export default transformMatchTable;
