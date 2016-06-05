import { HOST_URL } from '../yasp.config';
import moment from 'moment';
import { isRadiant, formatSeconds } from '../util/utility.js';
import constants from '../constants.json';

export const transformation = {
  hero_id: ({ field }) => `${HOST_URL}${constants.heroes[field]}`,
  radiant_win: ({ field, match }) => (isRadiant(match.player_slot) === field ? 'W' : 'L'),
  game_mode: ({ field }) => (constants.game_mode[field] ? constants.game_mode[field].name : field),
  start_time: ({ field }) => moment.unix(field).fromNow(),
  duration: ({ field }) => formatSeconds(field),
};

const transform = (match, field) => {
  if (transformation[field]) {
    return transformation[field]({ match, field: match[field] });
  }
  return match[field];
};

export default transform;
