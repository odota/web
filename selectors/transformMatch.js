import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getMatch = (state) => state[REDUCER_KEY].gotMatch.match.players;

const transformMatch = createSelector(
  [getMatch],
  (matchArray) => matchArray
);

export default transformMatch;
