import { createSelector } from 'reselect';
import { table } from 'reducers';
import { defaultSort } from 'utility';

const getSortState = id => state => table.getSortState(state, id);
const getSortField = id => state => table.getSortField(state, id);
const getSortFn = id => state => table.getSortFn(state, id);

const getSortedTable = data => id => createSelector(
  [data, getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default getSortedTable;
