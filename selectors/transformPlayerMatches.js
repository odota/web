import { createSelector } from 'reselect';
import { playerMatches } from '../reducers';
import { transformationFunction } from './utility';

const getMatches = id => state => {
  console.log('matches', playerMatches, id, state)
  return playerMatches.getMatchList(state, id)
};

const transformPlayerMatchesById = id => createSelector(
  [getMatches(id)],
  matches => transformationFunction(matches)
);

export default transformPlayerMatchesById;
