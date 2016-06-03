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
  hero_id: (m, v, c) => `${HOST_URL}${c.heroes[v] ? c.heroes[v].img: v}`,
  radiant_win: (m, v, c) => isRadiant(m) === v ? 'W' : 'L',
  game_mode: (m, v, c) => (c.game_mode[v] ? c.game_mode[v].name : v),
  start_time: (m, v, c) => moment(v, 'X').fromNow(),
  duration: (m, v, c) => formatSeconds(v),
};

export default transformation;
