export const isRadiant = (playerSlot) => playerSlot < 128;

export function pad(n, width, z = '0') {
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
export function formatSeconds(input) {
  const absTime = Math.abs(input);
  const minutes = ~~(absTime / 60);
  const seconds = pad(~~(absTime % 60), 2);
  let time = ((input < 0) ? '-' : '');
  time += `${minutes}:${seconds}`;
  return time;
}

export const getPercentWin = (wins, games) => (games ? ((wins / games) * 100) : 0);

export const camelToSnake = str =>
  str.replace(/\.?([A-Z]+)/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');

export const addQueryString = options => Object.keys(options).map(key => ({
  ...options[key],
  queryParam: camelToSnake(key),
}));
// ?with_hero_id=1
// &against_hero_id=1
// &included_account_id=84227565
// &excluded_account_id=84227565
// &hero_id=1
// &is_radiant=1
// &win=1
// &lane_role=1
// &patch=18
// &game_mode=0
// &lobby_type=0
// &date=7
// &region=0
// &desc=kills
// &limit=1000000
