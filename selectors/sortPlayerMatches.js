import { createSelector } from 'reselect';
import { playerMatches } from '../reducers';
import transformPlayerMatchesById from './transformPlayerMatches';

const getSortState = id => state => playerMatches.getSortState(state, id);
const getSortField = id => state => playerMatches.getSortField(state, id);
const getSortFn = id => state => playerMatches.getSortFn(state, id);

const sortPlayerMatches = id => createSelector(
  [transformPlayerMatchesById(id), getSortState(id), getSortField(id), getSortFn(id)],
  (matches, sortState, sortField, sortFn) =>
    (sortState === 'desc' ? sortFn(matches, sortField).reverse() : sortFn(matches, sortField))
);

export default sortPlayerMatches;
