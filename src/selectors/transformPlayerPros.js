import { createSelector } from 'reselect';
import { playerPros } from 'reducers';

const getPros = (id, numRows) => state => playerPros.getProsList(state, id).slice(0, numRows);

const transformPlayerProsById = (id, numRows) => createSelector(
  [getPros(id, numRows)],
  pros => pros
);

export default transformPlayerProsById;
