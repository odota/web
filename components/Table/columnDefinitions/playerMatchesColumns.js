import React from 'react';
import { defaultSort } from './utility';
import moment from 'moment';
import { HOST_URL } from '../../../yasp.config.js';
const constants = require('../../../constants.json');

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
  
export default [{
  displayName: 'ID',
  field: 'match_id',
  width: 2,
  sortFn: defaultSort,
}, {
  displayName: 'Hero',
  field: 'hero_id',
  width: 1.5,
  sortFn: defaultSort,
  dispFn: (r, c, v) => <img src={HOST_URL + (constants.heroes[v] ? constants.heroes[v].img : v)} style={{ height: '24px' }} role="presentation" />,
}, {
  displayName: 'W/L',
  field: 'radiant_win',
  width: 1.5,
  sortFn: defaultSort,
  dispFn: (r, c, v) => isRadiant(r) === v ? 'W' : 'L',
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 3,
  sortFn: defaultSort,
  dispFn: (r, c, v) => (constants.game_mode[v] ? constants.game_mode[v].name : v),
}, {
  displayName: 'Date',
  field: 'start_time',
  width: 2,
  sortFn: defaultSort,
  dispFn: (r, c, v) => moment(v, 'X').fromNow(),
}, {
  displayName: 'Duration',
  field: 'duration',
  width: 2,
  sortFn: defaultSort,
  dispFn: (r, c, v) => formatSeconds(v),
}, {
  displayName: 'Kills',
  field: 'kills',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Deaths',
  field: 'deaths',
  width: 1.5,
  sortFn: defaultSort,
}, {
  displayName: 'Assists',
  field: 'assists',
  width: 1.5,
  sortFn: defaultSort,
}];
