import { createSelector } from 'reselect';
import { playerRecords } from 'reducers';
import transformPlayerRecordsById from 'selectors/transformPlayerRecords';
import { defaultSort } from 'utility';

const getSortState = id => state => playerRecords.getSortState(state, id);
const getSortField = id => state => playerRecords.getSortField(state, id);
const getSortFn = id => state => playerRecords.getSortFn(state, id);

const sortPlayerRecords = id => createSelector(
  [transformPlayerRecordsById(id), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerRecords;
