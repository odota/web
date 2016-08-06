import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getMatch = (state) => state[REDUCER_KEY].gotMatch.match.players;

// Currently a no-op
const transformMatchTable = createSelector(
  [getMatch],
  (matchArray) => matchArray
);

export default transformMatchTable;
