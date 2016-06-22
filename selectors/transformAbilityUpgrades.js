import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getMatch = (state) => {
  const matchArray = state[REDUCER_KEY].gotMatch.match.players.players;
  return matchArray.length > 0 && matchArray[0] && matchArray[0].ability_upgrades_arr ?
    matchArray :
    null;
};

const transformAbilityUpgrades = createSelector(
  [getMatch],
  (players) => (players !== null ? transformationFunction(players) : null)
);

export default transformAbilityUpgrades;
