import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transformMatch from './transformMatch';

const getSortState = (state) => state[REDUCER_KEY].gotMatch.match.players.sortState;
const getSortField = (state) => state[REDUCER_KEY].gotMatch.match.players.sortField;
const getSortFn = (state) => state[REDUCER_KEY].gotMatch.match.players.sortFn;

const sortPlayerMatches = createSelector(
  [transformMatch, getSortState, getSortField, getSortFn],
  (matches, sortState, sortField, sortFn) => {
    if (sortState === 'desc') {
      return matches.reverse();
    }
    return sortFn(matches, sortField);
    // return (sortState === 'desc' ? matches.reverse() : sortFn(matches, sortField))
  }
);

export default sortPlayerMatches;
