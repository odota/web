/**
 * Get Hero from heroes by heroId
 * @param {Array<Object>} heroes Array of heroes
 * @param {string|number} heroId
 */
export const heroSelector = (heroes, heroId) =>
  heroes.find(hero => String(hero.id) === String(heroId));

export default {
  heroSelector,
};
