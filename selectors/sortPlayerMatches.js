import { createSelector } from 'reselect';
import { playerMatches } from '../reducers';
import transformPlayerMatchesById from './transformPlayerMatches';
import { defaultSort } from '../utility';

const getSortState = id => state => playerMatches.getSortState(state, id);
const getSortField = id => state => playerMatches.getSortField(state, id);
const getSortFn = id => state => playerMatches.getSortFn(state, id);

const sortPlayerMatches = id => createSelector(
  [transformPlayerMatchesById(id), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerMatches;
