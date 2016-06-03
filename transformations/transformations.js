import { HOST_URL } from '../yasp.config';
import moment from 'moment';

//TODO move to utility module
function isRadiant(p)
{
  return p.player_slot < 128;
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
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
    var absTime = Math.abs(input);
    var minutes = ~~(absTime / 60);
    var seconds = pad(~~(absTime % 60), 2);
    var time = ((input < 0) ? "-" : "");
    time += minutes + ":" + seconds;
    return time;
}

const transformation = {
  hero_id: (m, field, c) => `${HOST_URL}${c.heroes[field].img}`,
  radiant_win: (m, field, c) => isRadiant(m) === field,
  game_mode: (m, field, c) => (c.game_modes[field] ? c.game_modes[field] : field),
  start_time: (m, field, c) => moment(field, 'X').fromNow(),
  duration: (m, field, c) => formatSeconds(field),
};

export default transformation;
