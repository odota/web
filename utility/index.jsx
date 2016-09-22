import React from 'react';
import { Link } from 'react-router';
import constants from 'dotaconstants';
import moment from 'moment';
import { API_HOST } from '../config.js';
import styles from '../components/palette.css';
import { TableLink, TableHeroImage, TableKDA } from '../components/Table';
// TODO - add in the relevant text invocations of TableHeroImage
export const isRadiant = (playerSlot) => playerSlot < 128;

export function pad(n, width, z = '0') {
  const str = `${n}`;
  return str.length >= width ? str : new Array((width - str.length) + 1).join(z) + n;
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

export const getPercentWin = (wins, games) => (games ? Number(((wins * 100) / games).toFixed(2)) : 0);

export const camelToSnake = str =>
  str.replace(/\.?([A-Z]+)/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');

const getSubtext = row => {
  if (row.match_id) return isRadiant(row.player_slot) ? 'Radiant' : 'Dire';
  if (row.last_played) {
    if (Number(row.last_played)) return moment(row.last_played, 'X').fromNow();
    return 'never';
  }
  return null;
};

// TODO - these more complicated ones should be factored out into components
export const transformations = {
  hero_id: (row, col, field) => (
    <TableHeroImage
      parsed={row.version}
      heroName={constants.heroes[field] ? constants.heroes[field].localized_name : ''}
      imageUrl={`${API_HOST}${constants.heroes[field] ? constants.heroes[field].img : ''}`}
      subText={getSubtext(row)}
    />
  ),
  match_id: (row, col, field) => <Link to={`/matches/${field}`}>{field}</Link>,
  radiant_win: (row, col, field) => {
    const won = field === isRadiant(row.player_slot);
    const getColor = result => {
      if (result === undefined) {
        return styles.textMuted;
      }
      return won ? styles.textSuccess : styles.textDanger;
    };
    const getString = result => {
      if (result === undefined) {
        return 'N';
      }
      return won ? 'Win' : 'Loss';
    };
    return (
      <div>
        <span className={getColor(field)}>
          {getString(field)}
        </span>
        <span className={styles.subText} style={{ display: 'block', marginTop: 1 }}>
          {moment(row.start_time + row.duration, 'X').fromNow()}
        </span>
      </div>);
  },
  skill: (row, col, field) => (constants.skill[field] ? constants.skill[field] : 'Unknown'),
  game_mode: (row, col, field) => (constants.game_mode[field] ? constants.game_mode[field].name : field),
  match_id_and_game_mode: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span className={styles.subText} style={{ display: 'block', marginTop: 1 }}>
        {constants.game_mode[row.game_mode] ? constants.game_mode[row.game_mode].name : row.game_mode}
      </span>
    </div>
  ),
  start_time: (row, col, field) => (Number(field) ? moment(field, 'X').fromNow() : 'never'),
  last_played: (row, col, field) => (Number(field) ? moment(field, 'X').fromNow() : 'never'),
  duration: (row, col, field) => formatSeconds(field),
  region: (row, col, field) => {
    const regions = Object.keys(constants.regions);
    const byRegionId = (key) => (parseInt(constants.regions[key].region, 10) === field ? key : null);

    return regions.find(byRegionId);
  },
  leaver_status: (row, col, field) => (constants.leaver_status[field] ? constants.leaver_status[field].name : field),
  lobby_type: (row, col, field) => (constants.lobby_type[field] ? constants.lobby_type[field].name : field),
  lane_role: (row, col, field) => (constants.lane_role[field] ? constants.lane_role[field].name : field),
  patch: (row, col, field) => (constants.patch[field] ? constants.patch[field].name : field),
  winPercent: (row, col, field) => `${(field * 100).toFixed(2)}%`,
  kda: (row, col, field) => <TableKDA kills={field} deaths={row.deaths} assists={row.assists} />,
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

export const defaultSort = (array, sortState, sortField, sortFn) =>
  array.sort((a, b) => {
    const sortFnExists = typeof sortFn === 'function';
    const aVal = (sortFnExists ? sortFn(a) : a[sortField]) || 0;
    const bVal = (sortFnExists ? sortFn(b) : b[sortField]) || 0;
    const desc = aVal < bVal ? 1 : -1;
    const asc = aVal < bVal ? -1 : 1;
    return sortState === 'desc' ? desc : asc;
  });

export const deSnake = str => str.replace(/_(.)/g, ' $1').toUpperCase();

export const prettyPrint = (row, col, field) => deSnake(field);
