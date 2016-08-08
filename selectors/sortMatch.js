import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transformMatch from './transformMatch';
import { defaultSort } from '../utility';

const getSortState = (state) => state[REDUCER_KEY].gotMatch.match.sortState;
const getSortField = (state) => state[REDUCER_KEY].gotMatch.match.sortField;
const getSortFn = (state) => state[REDUCER_KEY].gotMatch.match.sortFn;

const sortMatch = createSelector(
  [transformMatch, getSortState, getSortField, getSortFn],
  defaultSort
);

export default sortMatch;
