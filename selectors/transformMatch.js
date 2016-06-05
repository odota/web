import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transform from '../transformations';

const getMatches = (state) => state[REDUCER_KEY].gotMatch.players;
const getConstants = (state) => state[REDUCER_KEY].gotConstants;

const transformMatch = createSelector(
  [getMatches, getConstants],
  (matches, constants) => matches.map(match => {
    const transformedMatch = {};
    Object.keys(match).forEach((field) => {
      transformedMatch[`${field}`] = {
        display: transform(match, field, constants),
        value: match[field],
      };
    });
    return transformedMatch;
  })
);

export default transformMatch;
