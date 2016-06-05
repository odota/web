import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transform from '../transformations';

const getMatches = (state) => state[REDUCER_KEY].gotMatch.players;

const transformMatch = createSelector(
  [getMatches],
  (matches) => matches.map(match => {
    const transformedMatch = {};
    Object.keys(match).forEach((field) => {
      transformedMatch[`${field}`] = {
        display: transform(match, field),
        value: match[field],
      };
    });
    return transformedMatch;
  })
);

export default transformMatch;
