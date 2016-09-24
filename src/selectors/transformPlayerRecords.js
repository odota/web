import { createSelector } from 'reselect';
import { playerRecords } from 'reducers';

const getRecords = id => state => playerRecords.getRecordsList(state, id);

// We need to do this because this endpoint is returning an object instead of a list

const transformPlayerRecordsById = id => createSelector(
  [getRecords(id)],
  records => records
);

export default transformPlayerRecordsById;
