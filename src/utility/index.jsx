/* global API_HOST */
import React from 'react';
import { Link } from 'react-router';
import heroes from 'dotaconstants/json/heroes.json';
import items from 'dotaconstants/json/items.json';
import patch from 'dotaconstants/json/patch.json';
import region from 'dotaconstants/json/region.json';
import itemIds from 'dotaconstants/json/item_ids.json';
import xpLevel from 'dotaconstants/json/xp_level.json';
import styles from 'components/palette.css';
import { TableLink } from 'components/Table';
import {
  KDA,
  TableHeroImage,
  FromNowTooltip,
} from 'components/Visualizations';
import strings from 'lang';
import subTextStyle from 'components/Visualizations/Table/subText.css';
import { findLast } from 'lodash';
import _ from 'lodash/fp';
import util from 'util';

// TODO - add in the relevant text invocations of TableHeroImage
export const isRadiant = playerSlot => playerSlot < 128;

export function pad(n, width, z = '0') {
  const str = `${n}`;
  return str.length >= width ? str : new Array((width - str.length) + 1).join(z) + n;
}
export function abbreviateNumber(num) {
  if (!num) {
    return '-';
  } else if (num >= 1000 && num < 1000000) {
    return `${Number((num / 1000).toFixed(1))}${strings.abbr_thousand}`;
  } else if (num >= 1000000 && num < 1000000000) {
    return `${Number((num / 1000000).toFixed(1))}${strings.abbr_million}`;
  } else if (num >= 1000000000 && num < 1000000000000) {
    return `${Number((num / 1000000000).toFixed(1))}${strings.abbr_billion}`;
  } else if (num >= 1000000000000) {
    return `${Number((num / 1000000000000).toFixed(1))}${strings.abbr_trillion}`;
  }
  return num.toFixed(0);
}
export function formatSeconds(input) {
  if (!isNaN(parseFloat(input)) && isFinite(input)) {
    const absTime = Math.abs(input);
    const minutes = Math.floor(absTime / 60);
    const seconds = pad(Math.floor(absTime % 60), 2);
    let time = ((input < 0) ? '-' : '');
    time += `${minutes}:${seconds}`;
    return time;
  }
  return null;
}
export function getLevelFromXp(xp) {
  for (let i = 0; i < xpLevel.length; i += 1) {
    if (xpLevel[i] > xp) {
      return i;
    }
  }
  return xpLevel.length;
}

export const calculateDistance = (x1, y1, x2, y2) =>
  (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;

export const calculateRelativeXY = ({ clientX, clientY, currentTarget }) => {
  // const bounds = target.getBoundingClientRect();
  // const x = clientX - bounds.left;
  // const y = clientY - bounds.top;
  let x = clientX + document.body.scrollLeft;
  let y = clientY + document.body.scrollTop;
  if (currentTarget.offsetParent) {
    let off = currentTarget.offsetParent;
    do {
      x -= off.offsetLeft;
      y -= off.offsetTop;
      off = off.offsetParent;
    } while (off);
  }
  return { x, y };
};

export const jsonFn = json =>
  arrayFn =>
    fn =>
      json[Object.keys(json)[arrayFn]((key, index) => fn(json[key], index))];

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

const units = [{
  name: strings.time_s,
  plural: strings.time_ss,
  limit: minute,
  in_seconds: second,
}, {
  name: strings.time_m,
  plural: strings.time_mm,
  limit: hour,
  in_seconds: minute,
}, {
  name: strings.time_h,
  plural: strings.time_hh,
  limit: day,
  in_seconds: hour,
}, {
  name: strings.time_d,
  plural: strings.time_dd,
  limit: month,
  in_seconds: day,
}, {
  name: strings.time_M,
  plural: strings.time_MM,
  limit: year,
  in_seconds: month,
}, {
  name: strings.time_y,
  plural: strings.time_yy,
  limit: null,
  in_seconds: year,
}];

export function fromNow(time) {
  const diff = (new Date() - new Date(time * 1000)) / 1000;
  if (diff < 5) {
    return strings.time_just_now;
  }
  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i];
    if (diff < unit.limit || !unit.limit) {
      const val = Math.floor(diff / unit.in_seconds);
      return util.format(strings.time_past, val > 1 ? util.format(unit.plural, val) : unit.name);
    }
  }
  return '';
}

export const getPercentWin = (wins, games) => (games ? Number(((wins * 100) / games).toFixed(2)) : 0);

export const camelToSnake = str =>
  str.replace(/\.?([A-Z]+)/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');

export const getOrdinal = (n) => {
  // TODO localize strings
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const percentile = (pct) => {
  if (pct >= 0.8) {
    return {
      color: 'green',
      grade: 'A',
    };
  } else if (pct >= 0.6) {
    return {
      color: 'blue',
      grade: 'B',
    };
  } else if (pct >= 0.4) {
    return {
      color: 'darkBlue',
      grade: 'C',
    };
  } else if (pct >= 0.2) {
    return {
      color: 'yelor',
      grade: 'D',
    };
  }
  return {
    color: 'red',
    grade: 'F',
  };
};

const getSubtitle = (row) => {
  if (row.match_id && row.player_slot !== undefined) {
    return isRadiant(row.player_slot) ? strings.general_radiant : strings.general_dire;
  } else if (row.last_played) {
    return <FromNowTooltip timestamp={row.last_played} />;
  } else if (row.start_time) {
    return <FromNowTooltip timestamp={row.start_time} />;
  }
  return null;
};

/**
 * Transformations of table cell data to display values.
 * These functions are intended to be used as the displayFn property in table columns.
 * This is why they all take (row, col, field)
 **/
// TODO - these more complicated ones should be factored out into components
export const transformations = {
  hero_id: (row) => {
    const heroName = heroes[row.hero_id] ? heroes[row.hero_id].localized_name : strings.general_no_hero;
    return (
      <TableHeroImage
        parsed={row.version}
        image={heroes[row.hero_id] && API_HOST + heroes[row.hero_id].img}
        title={
          row.rank !== undefined ?
            <TableLink to={`/heroes/${row.hero_id}`}>{heroName}</TableLink>
          : heroName
        }
        subtitle={getSubtitle(row)}
      />
    );
  },
  match_id: (row, col, field) => <Link to={`/matches/${field}`}>{field}</Link>,
  radiant_win: (row, col, field) => {
    const won = field === isRadiant(row.player_slot);
    const getColor = (result) => {
      if (result === undefined) {
        return styles.textMuted;
      }
      return won ? styles.textSuccess : styles.textDanger;
    };
    const getString = (result) => {
      if (result === undefined) {
        return strings.td_no_result;
      }
      return won ? strings.td_win : strings.td_loss;
    };
    return (
      <div>
        <span className={getColor(field)}>
          {getString(field)}
        </span>
        <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
          {strings[`skill_${row.skill}`] || strings.general_unknown} {strings.th_skill}
        </span>
      </div>);
  },
  game_mode: (row, col, field) => (strings[`game_mode_${field}`]),
  match_id_and_game_mode: (row, col, field) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
        {strings[`game_mode_${row.game_mode}`]}
      </span>
    </div>
  ),
  start_time: (row, col, field) => <FromNowTooltip timestamp={field} />,
  last_played: (row, col, field) => <FromNowTooltip timestamp={field} />,
  duration: (row, col, field) => (
    <div>
      <span>
        {formatSeconds(field)}
      </span>
      {row &&
      <span className={subTextStyle.subText} style={{ display: 'block', marginTop: 1 }}>
        <FromNowTooltip timestamp={row.start_time + row.duration} />
      </span>}
    </div>
  ),
  region: (row, col, field) => region[field],
  leaver_status: (row, col, field) => (strings[`leaver_status_${field}`]),
  lobby_type: (row, col, field) => (strings[`lobby_type_${field}`]),
  lane_role: (row, col, field) => (strings[`lane_role_${field}`]),
  patch: (row, col, field) => (patch[field] ? patch[field].name : field),
  winPercent: (row, col, field) => `${(field * 100).toFixed(2)}%`,
  kda: (row, col, field) => <KDA kills={field} deaths={row.deaths} assists={row.assists} />,
  rank: row => getOrdinal(row.card - row.rank),
  rank_percentile: row => (
    <span style={{ color: styles[percentile(row.rank / row.card).color] }}>
      {getPercentWin(row.rank, row.card).toFixed(2)}%
    </span>
  ),
  player: row => (
    <TableHeroImage
      image={row.avatar || row.avatarfull}
      title={row.name || row.personaname}
      subtitle={row.subtitle || (row.last_played && <FromNowTooltip timestamp={row.last_played} />)}
      registered={row.last_login}
      accountId={row.account_id}
    />
  ),
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

for (let i = 0; i < 6; i += 1) {
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

export const SORT_ENUM = {
  0: 'asc',
  1: 'desc',
  asc: 0,
  desc: 1,
  next: state => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};

export function getObsWardsPlaced(pm) {
  if (!pm.obs_log) {
    return 0;
  }
  return pm.obs_log.filter(l => !l.entityleft).length;
}

export function isSupport(pm) {
  return getObsWardsPlaced(pm) >= 2 && pm.lh_t && pm.lh_t[10] < 20;
}

export function isRoshHero(pm) {
  const roshHeroes = {
    npc_dota_hero_lycan: 1,
    npc_dota_hero_ursa: 1,
    npc_dota_hero_troll_warlord: 1,
  };
  return heroes[pm.hero_id] && (heroes[pm.hero_id].name in roshHeroes);
}

export function isActiveItem(key) {
  const whitelist = {
    branches: 1,
    bloodstone: 1,
    radiance: 1,
  };
  // TODO this will only work for english data files
  return (items[key].desc.indexOf('Active: ') > -1 && !(key in whitelist));
}

export const sum = (a, b) => a + b;

export const extractTransitionClasses = styles => name => ({
  enter: styles[`${name}-enter`],
  enterActive: styles[`${name}-enter-active`],
  leave: styles[`${name}-leave`],
  leaveActive: styles[`${name}-leave-active`],
  appear: styles[`${name}-appear`],
  appearActive: styles[`${name}-appear-active`],
});

export const gameCoordToUV = (x, y) => ({
  x: Number(x) - 64,
  y: 127 - (Number(y) - 64),
});

// TODO: refactor this to use gameCoordToUV
/**
 * Unpacks position data from hash format to array format
 * 64 is the offset of x and y values
 * subtracting y from 127 inverts from bottom/left origin to top/left origin
 **/
export function unpackPositionData(input) {
  if (typeof input === 'object' && !Array.isArray(input)) {
    const result = [];
    Object.keys(input).forEach((x) => {
      Object.keys(input[x]).forEach((y) => {
        result.push({
          x: Number(x) - 64,
          y: 128 - (Number(y) - 64),
          value: input[x][y],
        });
      });
    });
    return result;
  }
  return input;
}

export const threshold = _.curry((start, limits, values, value) => {
  if (limits.length !== values.length) throw new Error('Limits must be the same as functions.');

  const limitsWithStart = limits.slice(0);
  limitsWithStart.unshift(start);
  return findLast(values, (v, i) => _.inRange(limitsWithStart[i], limitsWithStart[i + 1], value));
});
