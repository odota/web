import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getMatches = (state) => state[REDUCER_KEY].gotPlayer.matches.matchList;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;

const transformPlayerMatches = createSelector(
  [getMatches, getConstants],
  (matches, constants) => transformationFunction(matches, constants)
);

export default transformPlayerMatches;
