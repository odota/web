import { createSelector } from 'reselect';
import { playerHeroes } from '../reducers';

const getHeroes = (id, numRows) => state => playerHeroes.getHeroList(state, id).slice(0, numRows);

const transformPlayerHeroesById = (id, numRows) => createSelector(
  [getHeroes(id, numRows)],
  heroes => heroes
);

export default transformPlayerHeroesById;
