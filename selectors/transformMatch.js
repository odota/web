import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getMatch = (state) => state[REDUCER_KEY].match.match.players;

const transformMatch = createSelector(
  [getMatch],
  (matchPlayers) => matchPlayers
);

export default transformMatch;
