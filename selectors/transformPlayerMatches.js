import { createSelector } from 'reselect';
import { playerMatches } from '../reducers';
import { transformationFunction } from './utility';

const getMatches = id => state => playerMatches.getMatchList(state, id);

const transformPlayerMatchesById = id => createSelector(
  [getMatches(id)],
  matches => transformationFunction(matches)
);

export default transformPlayerMatchesById;
