import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import transformPlayerHeroes from './transformPlayerHeroes';

const getSortState = (state) => state[REDUCER_KEY].gotPlayer.heroes.sortState;
const getSortField = (state) => state[REDUCER_KEY].gotPlayer.heroes.sortField;
const getSortFn = (state) => state[REDUCER_KEY].gotPlayer.heroes.sortFn;

const sortPlayerHeroes = createSelector(
  [transformPlayerHeroes, getSortState, getSortField, getSortFn],
  (heroes, sortState, sortField, sortFn) =>
    (sortState === 'desc' ? heroes.reverse() : sortFn(heroes, sortField))
);

export default sortPlayerHeroes;
