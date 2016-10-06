import React from 'react';
import {
  Link,
} from 'react-router';
/*
import {
  heroes,
  skill,
  items,
  patch,
  region,
  game_mode as gameMode,
  item_ids as itemIds,
  lobby_type as lobbyType,
  leaver_status as leaverStatus,
  lane_role as laneRole,
  ability_keys as abilityKeys,
} from 'dotaconstants';
*/
import heroes from 'dotaconstants/json/heroes.json';
import skill from 'dotaconstants/json/skill.json';
import items from 'dotaconstants/json/items.json';
import patch from 'dotaconstants/json/patch.json';
import region from 'dotaconstants/json/region.json';
import gameMode from 'dotaconstants/json/game_mode.json';
import itemIds from 'dotaconstants/json/item_ids.json';
import lobbyType from 'dotaconstants/json/lobby_type.json';
import leaverStatus from 'dotaconstants/json/leaver_status.json';
import laneRole from 'dotaconstants/json/lane_role.json';
import abilityKeys from 'dotaconstants/json/ability_keys.json';
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
import strings from 'lang';
import subTextStyle from 'components/Visualizations/Table/subText.css';

// TODO - add in the relevant text invocations of TableHeroImage
export const isRadiant = playerSlot => playerSlot < 128;

export function pad(n, width, z = '0') {
  const str = `${n}`;
  return str.length >= width ? str : new Array((width - str.length) + 1).join(z) + n;
}
export function abbreviateNumber(num) {
  return (num < 1000) ? num : `${(num / 1000).toFixed(1)}${strings.abbr_thousand}`;
}
export function formatSeconds(input) {
  const absTime = Math.abs(input);
  const minutes = Math.floor(absTime / 60);
  const seconds = pad(Math.floor(absTime % 60), 2);
  let time = ((input < 0) ? '-' : '');
  time += `${minutes}:${seconds}`;
  return time;
}

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

const units = [{
  name: strings.time_second,
  limit: minute,
  in_seconds: second,
}, {
  name: strings.time_minute,
  limit: hour,
  in_seconds: minute,
}, {
  name: strings.time_hour,
  limit: day,
  in_seconds: hour,
}, {
  name: strings.time_day,
  limit: month,
  in_seconds: day,
}, {
  name: strings.time_month,
  limit: year,
  in_seconds: month,
}, {
  name: strings.time_year,
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
      return `${val} ${unit.name}${val > 1 ? strings.time_plural : ''} ${strings.time_past}`;
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

const getSubtext = (row) => {
  if (row.match_id && row.player_slot !== undefined) {
    // TODO localize
    return isRadiant(row.player_slot) ? 'Radiant' : 'Dire';
  }
  if (row.last_played) {
    return <FromNowTooltip timestamp={row.last_played} />;
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
    const getColor = (result) => {
      if (result === undefined) {
        return styles.textMuted;
      }
      return won ? styles.textSuccess : styles.textDanger;
    };
    const getString = (result) => {
      // TODO localize strings
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
  rank: row => getOrdinal(row.card - row.rank),
};

export const inflictorWithValue = ({
  inflictor,
  overlay,
  value,
  index,
}) => {
  if (inflictor) {
    // TODO use abilities if we need the full info immediately
    const ability = abilityKeys[inflictor];
    const item = items[inflictor];
    let props = {
      src: null,
    };
    if (ability) {
      props = {
        src: `${API_HOST}/apps/dota2/images/abilities/${inflictor}_lg.png`,
      };
    } else if (item) {
      props = {
        src: `${API_HOST}/apps/dota2/images/items/${inflictor}_lg.png`,
      };
    } else {
      props = {
        src: `${API_HOST}/public/images/default_attack.png`,
      };
    }
    return (<span key={index} style={{ float: 'left', fontSize: '11px', position: 'relative', margin: '2px' }} >
      <img src={props.src} role="presentation" style={{ height: '20px' }} />
      <span className={styles.overlay}>
        {overlay}
      </span>
      <br />
      <span>{value}</span>
    </span>);
  }
  return <div />;
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

export const deSnake = str => str.replace(/_(.)/g, ' $1').toUpperCase();

export const prettyPrint = (row, col, field) => deSnake(field);

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
