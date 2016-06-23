import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getMatch = (state) => state[REDUCER_KEY].gotMatch.match.players.matchArray;

const transformMatchTable = createSelector(
  [getMatch],
  (matchArray) => transformationFunction(matchArray)
);

export default transformMatchTable;
