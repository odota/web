const isRadiant = (playerSlot) => playerSlot < 128;

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

export { isRadiant, pad, formatSeconds };
