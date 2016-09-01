import { createSelector } from 'reselect';
import { playerCounts } from '../reducers';
import transformPlayerCountsById from './transformPlayerCounts';
import { defaultSort } from '../utility';

const getSortState = id => state => playerCounts.getSortState(state, id);
const getSortField = id => state => playerCounts.getSortField(state, id);
const getSortFn = id => state => playerCounts.getSortFn(state, id);

const sortPlayerCounts = (id, numRows) => createSelector(
  [transformPlayerCountsById(id, numRows), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerCounts;
