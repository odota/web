import { createSelector } from 'reselect';
import { playerItems } from 'reducers';

const getItems = id => state => playerItems.getItemsList(state, id);

const transformPlayerItemsById = id => createSelector(
  [getItems(id)],
  items => items
);

export default transformPlayerItemsById;
