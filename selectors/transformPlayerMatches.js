import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { playerMatchTransform } from '../transformations';

const getMatches = (state) => state[REDUCER_KEY].gotPlayer.matches.matches;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;

const transformPlayerMatches = createSelector(
  [getMatches, getConstants],
  (matches, constants) => matches.map(match => {
    const transformedMatch = {};
    Object.keys(match).forEach((field) => {
      transformedMatch[`${field}`] = {
        display: playerMatchTransform(match, field, constants),
        value: match[field],
      };
    });
    return transformedMatch;
  })
);

export default transformPlayerMatches;
