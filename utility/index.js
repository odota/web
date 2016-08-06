import React from 'react';
import { Link } from 'react-router';
import constants from 'dotaconstants';
import moment from 'moment';
import { API_HOST } from '../yasp.config.js';

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

export const transformations = {
  hero_id: (row, col, field) => (
    <div>
      <img src={`${API_HOST}${constants.heroes[field] ? constants.heroes[field].img : ''}`} style={{ height: 24 }} role="presentation" />
      <div className="subText">{constants.heroes[field] ? constants.heroes[field].localized_name : ''}</div>
    </div>),
  match_id: (row, col, field) => <Link to={`/matches/${field}`}>{field}</Link>,
  radiant_win: (row, col, field) => {
    const won = field === isRadiant(row.player_slot);
    const getColor = result => {
      if (result === undefined) {
        return 'textMuted';
      }
      return won ? 'textSuccess' : 'textDanger';
    };
    const getString = result => {
      if (result === undefined) {
        return 'N';
      }
      return won ? 'W' : 'L';
    };
    return (
      <div className={getColor(field)}>
        {getString(field)}
      </div>);
  },
  skill: (row, col, field) => (constants.skill[field] ? constants.skill[field] : field),
  game_mode: (row, col, field) => (constants.game_mode[field] ? constants.game_mode[field].name : field),
  start_time: (row, col, field) => (Number(field) ? moment(field, 'X').fromNow() : 'never'),
  last_played: (row, col, field) => (Number(field) ? moment(field, 'X').fromNow() : 'never'),
  duration: (row, col, field) => formatSeconds(field),
};

/* ---------------------------- match item_n transformations ---------------------------- */
// This code is used to transform the items in the match.players (array of players with match data).
// the items for each player are stored as item_0, item_1, ..., item_5. If there is no item, we
// have a value of 0 there, so we return false for those cases so we don't render a broken image link.
// Otherwise, we just put the url in the image. THis will also contain the tooltip stuff as well
// (once I get to the tooltips).

const transformMatchItem = ({ field }) => {
  if (field === 0) {
    return false;
  }
  return `${API_HOST}${constants.items[constants.item_ids[field]].img}`;
};

for (let i = 0; i < 6; i++) {
  transformations[`item_${i}`] = transformMatchItem;
}

export const defaultSort = (array, sortState, sortField, sortFn) => (
  array.sort((a, b) => {
    const sortFnExists = typeof sortFn === 'function';
    const aVal = sortFnExists ? sortFn(a) : a[sortField];
    const bVal = sortFnExists ? sortFn(b) : b[sortField];
    const desc = aVal < bVal ? 1 : -1;
    const asc = aVal < bVal ? -1 : 1;
    return sortState === 'desc' ? desc : asc;
  })
);

export const prettyPrint = (row, col, field) => (field.replace(/_(.)/g, ' $1').toUpperCase());
