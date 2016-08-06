import { createSelector } from 'reselect';
import { playerRecords } from '../reducers';
import { transformationFunction } from './utility';

const getRecords = id => state => playerRecords.getRecordsList(state, id);

// We need to do this because this endpoint is returning an object instead of a list


const transformPlayerRecordsById = id => createSelector(
  [getRecords(id)],
  records => transformationFunction(records)
);

export default transformPlayerRecordsById;
