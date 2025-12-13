import { createSelector } from "reselect";

/**
 * Get Hero from heroes by heroId
 * @param {Array<Object>} heroes Array of heroes
 * @param {string|number} heroId
 */
export const heroSelector = (heroes: any[], heroId: string | number) =>
  heroes.find((hero) => String(hero.id) === String(heroId));

/**
 * Return ProPlayer map, where key account_id
 * @param {Object} state Redux state
 */
//@ts-expect-error
export const proPlayersSelector = createSelector(
  (state) => state.app.proPlayers.data,
  (data: any[]) =>
    data.reduce(
      (summary, item) => ({ ...summary, [item.account_id]: { ...item } }),
      {},
    ),
);

export default {
  heroSelector,
  proPlayersSelector,
};
