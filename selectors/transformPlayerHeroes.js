import { createSelector } from 'reselect';
import { playerHeroes } from '../reducers';
import { transformationFunction } from './utility';

const getHeroes = (id, numRows) => state => playerHeroes.getHeroList(state, id).slice(0, numRows);

const transformPlayerHeroesById = (id, numRows) => createSelector(
  [getHeroes(id, numRows)],
  heroes => transformationFunction(heroes)
);

export default transformPlayerHeroesById;
