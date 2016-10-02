import React from 'react';
import {
  Link,
} from 'react-router';
import {
  skill,
  items,
  heroes,
  patch,
  region,
  game_mode as gameMode,
  item_ids as itemIds,
  lobby_type as lobbyType,
  leaver_status as leaverStatus,
  lane_role as laneRole,
} from 'dotaconstants';
import {
  API_HOST,
} from 'config';
import styles from 'components/palette.css';
import {
  TableLink,
} from 'components/Table';
import {
  KDA,
  TableHeroImage,
  FromNowTooltip,
} from 'components/Visualizations';
import subTextStyle from 'components/Visualizations/Table/subText.css';

export {
  default as bucketizeColumns,
}
from './bucketizeColumns';

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

const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

// TODO localize strings
export function fromNow(input) {
  if (!Number(input)) {
    // Default to empty string if invalid input
    return '';
  }
  const now = new Date();
  // Parse the input string as unix time
  const date = new Date(Number(input) * 1000);
  // Diff the current and input timestamps in seconds
  const diff = (now.getTime() - date.getTime()) / 1000;

  if (diff < 0) {
    return 'in the future';
  } else if (diff < 2) {
    return 'just now';
  } else if (diff < (minute * 2)) {
    return `${diff.toFixed(0)} seconds ago`;
  } else if (diff < (hour * 2)) {
    return `${(diff / minute).toFixed(0)} minutes ago`;
  } else if (diff < (day * 2)) {
    return `${(diff / hour).toFixed(0)} hours ago`;
  } else if (diff < (month * 2)) {
    return `${(diff / day).toFixed(0)} days ago`;
  } else if (diff < (year * 2)) {
    return `${(diff / month).toFixed(0)} months ago`;
  }
  return `${(diff / year).toFixed(0)} years ago`;
}

export const getPercentWin = (wins, games) => (games ? Number(((wins * 100) / games).toFixed(2)) : 0);

export const camelToSnake = str =>
  str.replace(/\.?([A-Z]+)/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');

const getSubtext = row => {
  if (row.match_id && row.player_slot !== undefined) {
    // TODO localize
    return isRadiant(row.player_slot) ? 'Radiant' : 'Dire';
  }
  if (row.last_played) {
    return <FromNowTooltip timestamp={row.last_played} />;
  }
  return null;
};

export const getOrdinal = (n) => {
  // TODO localize strings
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

// TODO - these more complicated ones should be factored out into components
export const transformations = {
  hero_id: (row, col, field) => (
    <TableHeroImage
      parsed={row.version}
      heroName={heroes[field] ? heroes[field].localized_name : ''}
      imageUrl={`${heroes[field] ? API_HOST + heroes[field].img : '/assets/images/blank-1x1.gif'}`}
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
      // TODO localize strings
      if (result === undefined) {
        return 'No Result';
      }
      return won ? 'Win' : 'Loss';
    };
    return (
      <div>
        <span className={getColor(field)}>
          {getString(field)}
        </span>
        <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
          <FromNowTooltip timestamp={row.start_time + row.duration} />
        </span>
      </div>);
  },
  skill: (row, col, field) => (skill[field] ? skill[field] : ''),
  game_mode: (row, col, field) => (gameMode[field] ? gameMode[field].name : field),
  match_id_and_game_mode: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
        {gameMode[row.game_mode] ? gameMode[row.game_mode].name : row.game_mode}
      </span>
    </div>
  ),
  start_time: (row, col, field) => <FromNowTooltip timestamp={field} />,
  last_played: (row, col, field) => <FromNowTooltip timestamp={field} />,
  duration: (row, col, field) => formatSeconds(field),
  region: (row, col, field) => region[field],
  leaver_status: (row, col, field) => (leaverStatus[field] ? leaverStatus[field].name : field),
  lobby_type: (row, col, field) => (lobbyType[field] ? lobbyType[field].name : field),
  lane_role: (row, col, field) => (laneRole[field] ? laneRole[field].name : field),
  patch: (row, col, field) => (patch[field] ? patch[field].name : field),
  winPercent: (row, col, field) => `${(field * 100).toFixed(2)}%`,
  kda: (row, col, field) => <KDA kills={field} deaths={row.deaths} assists={row.assists} />,
  rank: (row) => getOrdinal(row.card - row.rank),
};

/* ---------------------------- match item_n transformations ---------------------------- */
// This code is used to transform the items in the match.players (array of players with match data).
// the items for each player are stored as item_0, item_1, ..., item_5. If there is no item, we
// have a value of 0 there, so we return false for those cases so we don't render a broken image link.
// Otherwise, we just put the url in the image. THis will also contain the tooltip stuff as well
// (once I get to the tooltips).

const transformMatchItem = ({
  field,
}) => {
  if (field === 0) {
    return false;
  }
  return `${API_HOST}${items[itemIds[field]].img}`;
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

export const SORT_ENUM = {
  0: 'asc',
  1: 'desc',
  asc: 0,
  desc: 1,
  next: (state) => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};
