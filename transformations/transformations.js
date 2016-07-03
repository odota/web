import { HOST_URL } from '../yasp.config';
import moment from 'moment';
import { formatSeconds, isRadiant } from '../util/utility';
const constants = require('../constants');

const transformation = {
  hero_id: ({ field }) => constants.heroes[field],
  radiant_win: ({ field, match }) => {
    const isRadiantResult = isRadiant(match.player_slot);
    return ((isRadiantResult && field) || (!isRadiantResult && !field) ? 'W' : 'L');
  },
  game_mode: ({ field }) => (constants.game_mode[field] ? constants.game_mode[field].name : field),
  start_time: ({ field }) => moment.unix(field).fromNow(),
  last_played: ({ field }) => moment.unix(field).fromNow(),
  duration: ({ field }) => formatSeconds(field),
};

/* ---------------------------- match item_n transformation ---------------------------- */
// This code is used to transform the items in the match.players (array of players with match data).
// the items for each player are stored as item_0, item_1, ..., item_5. If there is no item, we
// have a value of 0 there, so we return false for those cases so we don't render a broken image link.
// Otherwise, we just put the url in the image. THis will also contain the tooltip stuff as well
// (once I get to the tooltips).

const transformMatchItem = ({ field }) => {
  if (field === 0) {
    return false;
  }
  return `${HOST_URL}${constants.items[constants.item_ids[field]].img}`;
};

for (let i = 0; i < 6; i++) {
  transformation[`item_${i}`] = transformMatchItem;
}

/* -------------------------------------------------------- */

const transform = (match, field) => {
  if (transformation[field]) {
    return transformation[field]({ match, field: match[field] });
  }
  return match[field];
};

export default transform;
export { transformation };
