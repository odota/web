import { createSelector } from 'reselect';

/**
 * Get Hero from heroes by heroId
 * @param {Array<Object>} heroes Array of heroes
 * @param {string|number} heroId
 */
export const heroSelector = (heroes, heroId) =>
  heroes.find(hero => String(hero.id) === String(heroId));

/**
 * Return ProPlayer map, where key account_id
 * @param {Object} state Redux state
 */
export const proPlayersSelector = createSelector(
  state => state.app.proPlayers.data,
  data => data.reduce((summary, item) => ({ ...summary, [item.account_id]: { ...item } }), {}),
);

export default {
  heroSelector,
  proPlayersSelector,
};
