import { createSelector } from 'reselect';
import { playerRankings } from '../reducers';
import transformPlayerRankingsById from './transformPlayerRankings';
import { defaultSort } from '../utility';

const getSortState = id => state => playerRankings.getSortState(state, id);
const getSortField = id => state => playerRankings.getSortField(state, id);
const getSortFn = id => state => playerRankings.getSortFn(state, id);

const sortPlayerRankings = (id, numRows) => createSelector(
  [transformPlayerRankingsById(id, numRows), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerRankings;
