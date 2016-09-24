import { createSelector } from 'reselect';
import { playerPros } from 'reducers';
import transformPlayerProsById from 'selectors/transformPlayerPros';
import { defaultSort } from 'utility';

const getSortState = id => state => playerPros.getSortState(state, id);
const getSortField = id => state => playerPros.getSortField(state, id);
const getSortFn = id => state => playerPros.getSortFn(state, id);

const sortPlayerPros = (id, numRows) => createSelector(
  [transformPlayerProsById(id, numRows), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerPros;
