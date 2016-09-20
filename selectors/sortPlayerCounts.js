import { createSelector } from 'reselect';
import { playerCounts } from '../reducers';
import transformPlayerCountsById from './transformPlayerCounts';
import { defaultSort } from '../utility';

const getSortState = listName => id => state => playerCounts.getSortState(listName)(state, id);
const getSortField = listName => id => state => playerCounts.getSortField(listName)(state, id);
const getSortFn = listName => id => state => playerCounts.getSortFn(listName)(state, id);

const sortPlayerCounts = listName => (id, numRows) => createSelector(
  [transformPlayerCountsById(listName)(id, numRows), getSortState(listName)(id), getSortField(listName)(id), getSortFn(listName)(id)],
  defaultSort
);

export default sortPlayerCounts;
