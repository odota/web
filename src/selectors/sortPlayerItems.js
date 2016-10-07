import { createSelector } from 'reselect';
import { playerItems } from 'reducers';
import transformPlayerItemsById from 'selectors/transformPlayerItems';
import { defaultSort } from 'utility';

const getSortState = id => state => playerItems.getSortState(state, id);
const getSortField = id => state => playerItems.getSortField(state, id);
const getSortFn = id => state => playerItems.getSortFn(state, id);

const sortPlayerItems = id => createSelector(
  [transformPlayerItemsById(id), getSortState(id), getSortField(id), getSortFn(id)],
  defaultSort
);

export default sortPlayerItems;
