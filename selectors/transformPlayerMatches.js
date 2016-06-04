import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { playerMatchTransform } from '../transformations';

const getMatches = (state) => state[REDUCER_KEY].gotPlayer.matches.matches;
const getHeroes = (state) => state[REDUCER_KEY].gotConstants.heroes;

const transformPlayerMatches = createSelector(
  [getMatches, getHeroes],
  (matches, heroes) => matches.map(match => {
    const transformedMatch = {};
    Object.keys(match).forEach((field) => {
      transformedMatch[`${field}`] = {
        display: playerMatchTransform(match, field, heroes),
        value: match[field],
      };
    });
    return transformedMatch;
  })
);

export default transformPlayerMatches;
