import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getMatch = (state) => state[REDUCER_KEY].gotMatch.match.players.players;

const transformMatchTable = createSelector(
  [getMatch],
  (players) => transformationFunction(players)
);

export default transformMatchTable;
