import { createSelector } from 'reselect';
import { playerMatches } from 'reducers';

const getMatches = id => state => playerMatches.getMatchList(state, id);

const transformPlayerMatchesById = id => createSelector(
  [getMatches(id)],
  matches => matches
);

export default transformPlayerMatchesById;
