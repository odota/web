import { createSelector } from 'reselect';
import { playerMatches } from 'reducers';

// TODO - take in the field name and then return the cumulative array of values
const getMatches = id => state => playerMatches.getMatchList(state, id);

const transformPlayerMatchesById = id => createSelector(
  [getMatches(id)],
  matches => matches
);

export default transformPlayerMatchesById;
