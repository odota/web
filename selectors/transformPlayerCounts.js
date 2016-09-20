import { createSelector } from 'reselect';
import { playerCounts } from '../reducers';

const getCounts = listName => (id, numRows) => state => playerCounts.getCountsList(listName)(state, id).slice(0, numRows);

const transformPlayerCountsById = listName => (id, numRows) => createSelector(
  [getCounts(listName)(id, numRows)],
  counts => counts
);

export default transformPlayerCountsById;
