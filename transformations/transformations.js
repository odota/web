import { HOST_URL } from '../yasp.config';
import moment from 'moment';

// TODO move to utility module
const isRadiant = ({ playerSlot }) => playerSlot < 128;

function pad(n, width, z = '0') {
  const str = `${n}`;
  return str.length >= width ? str : new Array(width - str.length + 1).join(z) + n;
}
/*
function format(input) {
    input = Number(input);
    if (input === 0 || Number.isNaN(input)) {
        return "-";
    }
    return (Math.abs(input) < 1000 ? ~~(input) : numeral(input).format('0.0a'));
}
*/
function formatSeconds(input) {
  const absTime = Math.abs(input);
  const minutes = ~~(absTime / 60);
  const seconds = pad(~~(absTime % 60), 2);
  let time = ((input < 0) ? '-' : '');
  time += `${minutes}:${seconds}`;
  return time;
}

const transformation = {
  hero_id: ({ field, constants }) => `${HOST_URL}${constants.heroes[field] ? constants.heroes[field].img : field}`,
  radiant_win: ({ field, match }) => (isRadiant({ playerSlot: match.player_slot }) === field ? 'W' : 'L'),
  game_mode: ({ field, constants }) => (constants.game_mode[field] ? constants.game_mode[field].name : field),
  start_time: ({ field }) => moment.unix(field).fromNow(),
  duration: ({ field }) => formatSeconds(field),
};

/* ---------------------------- match item_n transformation ---------------------------- */
// This code is used to transform the items in the match.players (array of players with match data).
// the items for each player are stored as item_0, item_1, ..., item_5. If there is no item, we
// have a value of 0 there, so we return false for those cases so we don't render a broken image link.
// Otherwise, we just put the url in the image. THis will also contain the tooltip stuff as well
// (once I get to the tooltips).

const transformMatchItem = ({ field, constants }) => {
  if (field === 0) {
    return false;
  }
  return `${HOST_URL}${constants.items[constants.item_ids[field]].img}`;
};

for (let i = 0; i < 6; i++) {
  transformation[`item_${i}`] = transformMatchItem;
}

/* -------------------------------------------------------- */

const transform = (match, field, constants) => {
  if (transformation[field]) {
    return transformation[field]({ match, field: match[field], constants });
  }
  return match[field];
};

export default transform;
export { transformation };
