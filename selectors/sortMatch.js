import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transformMatch from './transformMatch';

const getSortState = (state) => state[REDUCER_KEY].gotMatch.match.sortState;
const getSortField = (state) => state[REDUCER_KEY].gotMatch.match.sortField;
const getSortFn = (state) => state[REDUCER_KEY].gotMatch.match.sortFn;

const sortMatch = createSelector(
  [transformMatch, getSortState, getSortField, getSortFn],
  (matches, sortState, sortField, sortFn) =>
    (sortState === 'desc' ? matches.reverse() : sortFn(matches, sortField))
);

export default sortMatch;
