import { HOST_URL } from '../yasp.config';
import moment from 'moment';

// TODO move to utility module
const isRadiant = (p) => p.player_slot < 128;

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
  heroId: (field, { heroes }) => `${HOST_URL}${heroes[field] ? heroes[field].img : field}`,
  radiantWin: (field, playerSlot) => (isRadiant(playerSlot) === field ? 'W' : 'L'),
  gameMode: (field, { game_mode }) => (game_mode[field] ? game_mode[field].name : field),
  startTime: (field) => moment.unix(field).fromNow(),
  duration: (field) => formatSeconds(field),
};

export default transformation;
