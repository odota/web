import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transformPlayerMatchesById from './transformPlayerMatches';

const getSortState = (state) => state[REDUCER_KEY].gotPlayer.matches.sortState;
const getSortField = (state) => state[REDUCER_KEY].gotPlayer.matches.sortField;
const getSortFn = (state) => state[REDUCER_KEY].gotPlayer.matches.sortFn;

const sortPlayerMatches = id => createSelector(
  [transformPlayerMatchesById(id), getSortState, getSortField, getSortFn],
  (matches, sortState, sortField, sortFn) =>
    (sortState === 'desc' ? matches.reverse() : sortFn(matches, sortField))
);

export default sortPlayerMatches;
