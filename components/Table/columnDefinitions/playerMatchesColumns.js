import React from 'react';
import { defaultSort, useOriginalValueSort } from './utility';
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
  //TODO make API return hero_url, or pass constants here so we can translate it
  dispFn: (row, column) => <img src={row.hero_url || ""} style={{ height: '24px' }} role="presentation" />,
}, {
  displayName: 'W/L',
  field: 'radiant_win',
  width: 1.5,
  sortFn: defaultSort,
  dispFn: (row, column) => isRadiant(row) === row.radiant_win ? 'W' : 'L',
}, {
  displayName: 'Mode',
  field: 'game_mode',
  width: 3,
  sortFn: defaultSort,
  //TODO translate game_mode
  dispFn: (row, column) => row.game_mode,
}, {
  displayName: 'Date',
  field: 'start_time',
  width: 2,
  sortFn: defaultSort,
  dispFn: (row, column) => moment(row[column.field], 'X').fromNow(),
}, {
  displayName: 'Duration',
  field: 'duration',
  width: 2,
  sortFn: defaultSort,
  dispFn: (row, column) => formatSeconds(row[column.field]),
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
