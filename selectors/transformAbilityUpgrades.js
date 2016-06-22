import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';
import { transformationFunction } from './utility';

const getMatchWithAbilities = (state) => {
  const matchArray = state[REDUCER_KEY].gotMatch.match.players.matchArray;
  console.log(matchArray[0])
  return matchArray && matchArray[0] && matchArray[0].ability_upgrades_arr ?
    matchArray :
    null;
};

const transformAbilityUpgrades = createSelector(
  [getMatchWithAbilities],
  (matchArray) => (matchArray !== null ? transformationFunction(matchArray) : null)
);

export default transformAbilityUpgrades;
