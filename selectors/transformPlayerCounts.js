import { createSelector } from 'reselect';
import { playerCounts } from '../reducers';

const getCounts = (id, numRows) => state => playerCounts.getCountsList(state, id).slice(0, numRows);

const transformPlayerCountsById = (id, numRows) => createSelector(
  [getCounts(id, numRows)],
  counts => counts
);

export default transformPlayerCountsById;
