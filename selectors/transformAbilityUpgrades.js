import { createSelector } from 'reselect';
import { REDUCER_KEY } from '../reducers';

const getMatchWithAbilities = (state) => {
  const players = state[REDUCER_KEY].gotMatch.match.players;
  return players && players[0] && players[0].ability_upgrades_arr ?
    players :
    null;
};

const transformAbilityUpgrades = createSelector(
  [getMatchWithAbilities],
  (matchArray) => matchArray
);

export default transformAbilityUpgrades;
