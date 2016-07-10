import { createSelector } from 'reselect';
import { playerHeroes } from '../reducers';
import { transformationFunction } from './utility';

const getHeroes = id => state => playerHeroes.getHeroList(state, id);

const transformPlayerHeroesById = id => createSelector(
  [getHeroes(id)],
  heroes => transformationFunction(heroes)
);

export default transformPlayerHeroesById;
