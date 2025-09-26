import { heroes, item_ids as itemIds, patch, xp_level as xpLevel } from 'dotaconstants';
import curry from 'lodash/fp/curry';
import findLast from 'lodash/fp/findLast';
import inRange from 'lodash/fp/inRange';
// import SvgIcon from 'material-ui/SvgIcon';
import SocialPeople from 'material-ui/svg-icons/social/people';
import SocialPerson from 'material-ui/svg-icons/social/person';
import querystring from 'querystring';
import React from 'react';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

import constants from './components/constants';
import { TableLink } from './components/Table';
import {
  FromNowTooltip,
  KDA,
  TableHeroImage,
} from './components/Visualizations';
import store from './store';
import config from './config';
import { items } from 'dotaconstants';

const second = 1;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 30;
const year = month * 12;

export const iconStyle = {
  position: 'relative',
  width: 16,
  height: 16,
  verticalAlign: 'bottom',
};

export const subTextStyle = {
  position: 'relative',
  fontSize: '12px',
  color: constants.colorMutedLight,
  textOverflow: 'initial',
  display: 'block',
  marginTop: '1px',
};

// TODO - add in the relevant text invocations of TableHeroImage
export const isRadiant = (playerSlot: number) => playerSlot < 128;

export function pad(n: string | number, width: number, z = '0') {
  const str = `${n}`;
  return str.length >= width ? str : new Array((width - str.length) + 1).join(z) + n;
}

export function formatSeconds(input: number) {
  if (!Number.isNaN(parseFloat(String(input))) && Number.isFinite(Number(input))) {
    const absTime = Math.abs(input);
    const minutes = Math.floor(absTime / 60);
    const seconds = pad(Math.floor(absTime % 60), 2);

    let time = ((input < 0) ? '-' : '');
    time += `${minutes}:${seconds}`;

    return time;
  }

  return null;
}

export function formatSkillOrAttributeValues(values: string[]) {
  if (Array.isArray(values)) {
    return values.filter(value => value).join(' / ');
  }
  return values;
}

export function getLevelFromXp(xp: number) {
  for (let i = 0; i < xpLevel.length; i += 1) {
    if (xpLevel[i] > xp) {
      return i;
    }
  }

  return xpLevel.length;
}

export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number =>
  (((x2 - x1) ** 2) + ((y2 - y1) ** 2)) ** 0.5;

export const calculateRelativeXY = ({ clientX, clientY, currentTarget }: { clientX: number, clientY: number, currentTarget: any }) => {
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

export const getPercentWin = (wins: number, games: number) => (games ? Number(((wins * 100) / games).toFixed(2)) : 0);

export const camelToSnake = (str: string) =>
  str.replace(/\.?([A-Z]+)/g, (match, group) => `_${group.toLowerCase()}`).replace(/^_/, '');

export const getOrdinal = (n: number) => {
  // TODO localize
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};

export const jsonFn = (json: any) =>
  (arrayFn: any) =>
    (fn: any) =>
      //@ts-expect-error
      json[Object.keys(json)[arrayFn]((key, index) => fn(json[key], index))];

export const percentile = (pct: number) => {
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
      color: 'golden',
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

export const IMAGESIZE_ENUM = {
  SMALL: { // ~10KB
    suffix: 'sb.png',
    width: 59,
    height: 33,
  },
  MEDIUM: { // ~41KB
    suffix: 'lg.png',
    width: 205,
    height: 115,
  },
  LARGE: { // ~52KB
    suffix: 'full.png',
    width: 256,
    height: 144,
  },
  VERT: { // ~18KB note that this is a jpg
    suffix: 'vert.jpg',
    width: 235,
    height: 272,
  },

  // if you ever wanna see what the above look like (change the suffix):
  // https://api.opendota.com/apps/dota2/images/dota_react/heroes/abaddon_full.png
};

const getTitle = (row: any, col: any, heroName: string) => {
  if (row.match_id && row.player_slot !== undefined) {
    return <TableLink to={`/matches/${row.match_id}`}>{heroName}</TableLink>;
  }
  return <TableLink to={`/heroes/${row[col.field]}`}>{heroName}</TableLink>;
};

export const getHeroImageUrl = (heroId: keyof typeof heroes, _: any) => {
  const imageUrl = heroes[heroId] && config.VITE_IMAGE_CDN + heroes[heroId].img;
  return imageUrl;
};

export const getHeroIconUrlFromHeroKey = (heroKey: string) => {
  const heroId = Object.keys(heroes).find(k => heroes[k as keyof typeof heroes].name === heroKey) as keyof typeof heroes;
  //@ts-expect-error
  if (heroId && heroId[0] && heroes[heroId[0]]) {
    return `${config.VITE_IMAGE_CDN}${heroes[heroId].icon}`;
  }

  return '/assets/images/blank-1x1.gif';
};


// Fills in a template with the values provided in the dict
// returns a list, so react object don't have to be converted to a string
// Any keys not found in the given dictionary are simply left untouched
// If a non-object is passed in, a dict will automatically be created with args[1...len] to be used.
// brackets can be escaped with \
// Examples:
// formatTemplate("{person} name is {name}", { person: "My", name: "Gaben" });
// returns [ "My", " name is ", "Gaben" ]
// formatTemplate("{person} name is {name}", { name: <font color={styles.golden}>{"Gaben"}</font> });
// returns [ "{person} name is ", <font color={styles.golden}>{"Gaben"}</font> ]
export const formatTemplate = (template: string, dict: any, ...rest: any[]) => {
  if (!template) {
    return ['(invalid template)'];
  }
  let tmplValues = dict;
  // If the 2nd argument isn't a dictionary, then we will gather arguments 1 => end into an object.
  // I'm arbitrarily making argument 0 the template.
  if ((dict instanceof Object) === false) {
    tmplValues = Object.assign({}, [dict].concat(rest));
  }

  const pattern = /(\{[^}]+\})/g;
  let result = template.split(pattern);
  for (let i = 0; i < result.length; i += 1) {
    if (result[i].match(pattern) && result[i].slice(1, -1) in tmplValues) {
      result[i] = tmplValues[result[i].slice(1, -1)];
    }
  }
  result = result.filter(part => part !== '');
  return result;
};

export const formatTemplateToString = (template: string, dict: any, ...rest: any[]) => formatTemplate(template, dict, ...rest).join('');

export const defaultSort = (array: any[], sortState: string, sortField: string, sortFn: Function) =>
  array.sort((a, b) => {
    const sortFnExists = typeof sortFn === 'function';
    const aVal = (sortFnExists ? sortFn(a) : a[sortField]) || 0;
    const bVal = (sortFnExists ? sortFn(b) : b[sortField]) || 0;
    const desc = aVal < bVal ? 1 : -1;
    const asc = aVal < bVal ? -1 : 1;
    return sortState === 'desc' ? desc : asc;
  });

export const SORT_ENUM = {
  0: 'desc',
  1: 'asc',
  asc: 1,
  desc: 0,
  //@ts-expect-error
  next: state => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};

export function getObsWardsPlaced(pm: any) {
  if (!pm.obs_log) {
    return 0;
  }

  return pm.obs_log.filter((l: any) => !l.entityleft).length;
}

export function isSupport(pm: any) {
  return getObsWardsPlaced(pm) >= 2 && pm.lh_t && pm.lh_t[10] < 20;
}

export function isRoshHero(pm: any) {
  const roshHeroes = {
    npc_dota_hero_lycan: 1,
    npc_dota_hero_ursa: 1,
    npc_dota_hero_troll_warlord: 1,
  };

  return heroes[pm.hero_id as keyof typeof heroes] && (heroes[pm.hero_id as keyof typeof heroes].name in roshHeroes);
}

export const sum = (a: number, b: number) => a + b;

export const extractTransitionClasses = (_styles: any) => (name: string) => ({
  enter: _styles[`${name}-enter`],
  enterActive: _styles[`${name}-enter-active`],
  leave: _styles[`${name}-leave`],
  leaveActive: _styles[`${name}-leave-active`],
  appear: _styles[`${name}-appear`],
  appearActive: _styles[`${name}-appear-active`],
});

export const gameCoordToUV = (x: string, y: string) => ({
  x: Number(x) - 64,
  y: 127 - (Number(y) - 64),
});

// TODO: refactor this to use gameCoordToUV
/**
 * Unpacks position data from hash format to array format
 * 64 is the offset of x and y values
 * subtracting y from 127 inverts from bottom/left origin to top/left origin
 * */
export function unpackPositionData(input: any) {
  if (typeof input === 'object' && !Array.isArray(input)) {
    const result: { x: number, y: number, value: number }[] = [];

    Object.keys(input).forEach((x) => {
      Object.keys(input[x]).forEach((y) => {
        result.push({
          ...gameCoordToUV(x, y),
          value: input[x][y],
        });
      });
    });

    return result;
  }

  return input;
}

export const threshold = curry((start: number, limits: any[], values: any[], value: any) => {
  if (limits.length !== values.length) throw new Error('Limits must be the same as functions.');

  const limitsWithStart = limits.slice(0);
  limitsWithStart.unshift(start);

  return findLast((v: any, i: number) => inRange(limitsWithStart[i], limitsWithStart[i + 1], value), values);
});

export const getTeamLogoUrl = (logoUrl: string) => {
  if (!logoUrl) {
    return '';
  }
  // Use proxy layer to serve team logos
  // if (logoUrl.indexOf('/ugc') !== -1) {
  //   return `${config.VITE_API_HOST}${logoUrl.substr(logoUrl.indexOf('/ugc'))}`;
  // }
  return logoUrl;
};

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
export const hsvToRgb = (h: number, s: number, v: number) => {
  let r;
  let g;
  let b;

  const i = Math.floor(h * 6);
  const f = (h * 6) - i;
  const p = v * (1 - s);
  const q = v * (1 - (f * s));
  const t = v * (1 - ((1 - f) * s));

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
    default: r = v; g = t; b = p;
  }

  return [r * 255, g * 255, b * 255];
};

export const bindWidth = (width: number, maxWidth: number) => Math.min(width, maxWidth);

export const getHeroesById = () => {
  const obj: any = {};
  Object.keys(heroes).forEach((hero) => {
    obj[heroes[hero as keyof typeof heroes].name] = heroes[hero as keyof typeof heroes];
  });
  return obj;
};

// https://www.evanmiller.org/how-not-to-sort-by-average-rating.html
export const wilsonScore = (up: number, down: number) => {
  if (!up) return 0;
  const n = up + down;
  const z = 1.64485; // 1.0 = 85%, 1.6 = 95%
  const phat = up / n;
  return (
    phat + ((z * z) / (2 * n)) - (z * Math.sqrt(((phat * (1 - phat)) + (z * z / (4 * n))) / n))
  ) / (
      1 + (z * z / n)
    );
};

export const groupBy = (xs: any[], key: string) =>
  xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x); // eslint-disable-line no-param-reassign
    return rv;
  }, {});

export function groupByArray(xs: any[], key: string | Function) {
  return xs.reduce((rv, x) => {
    const v = key instanceof Function ? key(x) : x[key];
    const el = rv.find((r: any) => r && r.key === v);
    if (el) {
      el.values.push(x);
    } else {
      rv.push({
        key: v,
        values: [x],
      });
    }
    return rv;
  }, []);
}

//@ts-expect-error
export const sumValues = (f: any) => Object.values(f).reduce((a, b) => a + b);

/* eslint-disable camelcase */
// https://dota2.gamepedia.com/Attributes
export function compileLevelOneStats(hero: any) {
  if (!hero) {
    return {};
  }

  const statsBonuses: any = {
    str: {
      attackDamage: 1,
      armor: 0.16,
      health: 22.5,
      health_regen: 0.69,
      mana: 12,
      mana_regen: 1.8,
      mr: 0.1,
      move_speed: 0.05,
      attack_speed: 1,

    },
    int: {
      attackDamage: 1,
      armor: 0.16,
      health: 18,
      health_regen: 0.55,
      mana: 15,
      mana_regen: 2.25,
      mr: 0.08,
      move_speed: 0.05,
      attack_speed: 1,

    },
    agi: {
      attackDamage: 1,
      armor: 0.2,
      health: 18,
      health_regen: 0.55,
      mana: 12,
      mana_regen: 1.8,
      mr: 0.08,
      move_speed: 0.063,
      attack_speed: 1.25,
    },
    all: {
      attackDamage: 0.7,
      armor: 0.2,
      health: 18,
      health_regen: 0.55,
      mana: 12,
      mana_regen: 1.8,
      mr: 0.08,
      move_speed: 0.063,
      attack_speed: 1.25,
    },
  };

  const round = (value: number) => Math.round(value * 100) / 100;

  const {
    primary_attr,
    base_attack_max,
    base_attack_min,
    base_armor,
    base_health,
    base_health_regen,
    base_mana,
    base_mana_regen,
    base_mr,
    base_move_speed,
    attack_rate,
  } = hero;


  const [agiValue, strValue, intValue] = [hero.base_agi, hero.base_str, hero.base_int];
  const primaryAttrValue = primary_attr === "all" ? agiValue + strValue + intValue : hero[`base_${primary_attr}`]

  return {
    ...hero,
    base_attack_min: Math.round(base_attack_min + (statsBonuses[primary_attr].attackDamage * primaryAttrValue)),
    base_attack_max: Math.round(base_attack_max + (statsBonuses[primary_attr].attackDamage * primaryAttrValue)),
    base_armor: round(base_armor + (statsBonuses[primary_attr].armor * agiValue)),
    base_health: round(base_health + (statsBonuses[primary_attr].health * strValue)),
    base_health_regen: round(base_health_regen + (base_health_regen * (statsBonuses[primary_attr].health_regen * strValue / 100))),
    base_mana: round(base_mana + (statsBonuses[primary_attr].mana * intValue)),
    base_mana_regen: round(base_mana_regen + (base_mana_regen * (statsBonuses[primary_attr].mana_regen * intValue / 100))),
    base_mr: round(base_mr + (base_mr * (statsBonuses[primary_attr].mr * strValue / 100))),
    base_move_speed: round(base_move_speed + (base_move_speed * (statsBonuses[primary_attr].move_speed * agiValue / 100))),
    attack_rate: round(1.7 / (attack_rate / (1 + ((statsBonuses[primary_attr].attack_speed * agiValue) / 100))) * 100), // ingame representation of attack speed
  };
}
/* eslint-enable camelcase */

export const getTeamName = (team: { name: string }, _isRadiant: boolean) => {
  const { strings } = store.getState().app;
  if (_isRadiant) {
    return (team && team.name) ? team.name : strings.general_radiant;
  }

  return (team && team.name) ? team.name : strings.general_dire;
};

export function abbreviateNumber(num: number) {
  const { strings } = store.getState().app;
  if (!num) {
    return '-';
  } else if (num >= 1000 && num < 1000000) {
    return `${Number((num / 1000).toFixed(1))}k`;
  } else if (num >= 1000000 && num < 1000000000) {
    return `${Number((num / 1000000).toFixed(1))}${strings.abbr_million}`;
  } else if (num >= 1000000000 && num < 1000000000000) {
    return `${Number((num / 1000000000).toFixed(1))}${strings.abbr_billion}`;
  } else if (num >= 1000000000000) {
    return `${Number((num / 1000000000000).toFixed(1))}${strings.abbr_trillion}`;
  }

  return num.toFixed(0);
}

export function rankTierToString(rankTier: string) {
  const { strings } = store.getState().app;
  // @ts-expect-error
  if (rankTier !== parseInt(rankTier, 10)) {
    return strings.general_unknown;
  }
  const intRankTier = parseInt(rankTier, 10);
  // @ts-expect-error
  let rank = strings[`rank_tier_${parseInt(intRankTier / 10, 10)}`];
  if (intRankTier > 9 && intRankTier !== 80) {
    // @ts-expect-error
    rank += ` [${parseInt(intRankTier % 10, 10)}]`;
  }
  return rank;
}

export function fromNow(time: number) {
  const { strings } = store.getState().app;

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

  // @ts-expect-error
  const diff = (new Date() - new Date(time * 1000)) / 1000;

  if (diff < 5) {
    return strings.time_just_now;
  }

  for (let i = 0; i < units.length; i += 1) {
    const unit = units[i];

    // @ts-expect-error
    if (diff < unit.limit || !unit.limit) {
      const val = Math.floor(diff / unit.in_seconds);
      return formatTemplateToString(strings.time_past, val > 1 ? formatTemplateToString(unit.plural, val) : unit.name);
    }
  }

  return '';
}

export function displayHeroId(row?: any, col?: any, field?: string, showGuide = false) {
  const { strings } = store.getState().app;
  const heroId = row[col.field];
  const heroName = heroes[row[col.field] as keyof typeof heroes] ? heroes[row[col.field] as keyof typeof heroes].localized_name : strings.general_no_hero;
  const getSubtitle = (row: any) => {
    if (row.match_id && row.player_slot !== undefined) {
      let lane;
      let tooltip;
      if (row.is_roaming) {
        tooltip = strings.roaming;
        lane = 'roam';
      } else {
        tooltip = strings[`lane_role_${row.lane_role}`];
        lane = row.lane_role;
      }
      const roleIconStyle = {
        float: 'right',
        marginTop: '2px',
        height: '14px',
      };

      return (
        <div>
          {row && <span style={{ float: 'left' }}><FromNowTooltip timestamp={row.start_time + row.duration} /></span>}
          {lane ?
            <span data-hint={tooltip} data-hint-position="top" style={{ float: 'right' }}>
              <img
                src={`/assets/images/dota2/lane_${lane}.svg`}
                alt=""
                //@ts-expect-error
                style={roleIconStyle}
              />
            </span>
            : ''}
        </div>);
    } else if (row.last_played) {
      return <FromNowTooltip timestamp={row.last_played} />;
    } else if (row.start_time) {
      return <FromNowTooltip timestamp={row.start_time} />;
    }

    return null;
  };

  return (
    <TableHeroImage
      parsed={row.version}
      heroID={heroId}
      //@ts-expect-error
      facet={row.hero_variant}
      title={getTitle(row, col, heroName)}
      subtitle={getSubtitle(row)}
      heroName={heroName}
      leaverStatus={row.leaver_status}
      hero={compileLevelOneStats(heroes[row.hero_id as keyof typeof heroes])}
    />
  );
}

/**
 * Transformations of table cell data to display values.
 * These functions are intended to be used as the displayFn property in table columns.
 * This is why they all take (row, col, field)
 * */
// TODO - these more complicated ones should be factored out into components
export const transformations = {
  match_id: (row: any, col: any, field: any) => <Link to={`/matches/${field}`}>{field}</Link>,
  match_id_with_time: (row: any, col: any, field: any) => (
    <div>
      <TableLink to={`/matches/${field}`}>{field}</TableLink>
      <span 
      //@ts-expect-error
      style={{ ...subTextStyle, display: 'block', marginTop: 1 }}>
        {fromNow(row.start_time)}
      </span>
    </div>),
  radiant_win_and_game_mode: (row: any, col: any, field: any) => {
    const matchId = row.match_id;
    const { strings } = store.getState().app;
    const won = field === isRadiant(row.player_slot);
    const getColor = (result: any) => {
      if (result === null || result === undefined) {
        return constants.colorMuted;
      }
      return won ? constants.colorGreen : constants.colorRed;
    };
    const getString = (result: any) => {
      if (result === null || result === undefined) {
        return strings.td_no_result;
      }
      return won ? strings.td_win : strings.td_loss;
    };
    const partyTextStyle = {
      fontSize: '9px',
      position: 'absolute',
      lineHeight: '3px',
      textAlign: 'center',
      width: '100%',
      fontFamily: 'Tahoma',
    };

    const partySize = (_partySize: number) => {
      if (_partySize === 1) {
        //@ts-expect-error
        return <SocialPerson color="rgb(179, 179, 179)" style={{ ...iconStyle, float: 'right' }} />;
      } else if (_partySize === null || _partySize === undefined) {
        return null;
      }
      return (
        <div style={{ float: 'right', marginTop: '-3px', marginRight: '2px' }}>
          <SocialPeople
            color="rgb(179, 179, 179)"
            //@ts-expect-error
            style={iconStyle} />
          <div 
          //@ts-expect-error
          style={partyTextStyle}>
            {`x${row.party_size}`}
          </div>
        </div>
      );
    };
    const partyStyle = {
      ...subTextStyle,
      float: 'right',
      marginRight: '-14px',
    };

    const sameTeam = (_sameTeam: any) => {
      if (_sameTeam == null) {
        return null;
      }
      return (
        <div>
          {_sameTeam ? strings.th_with_games : strings.th_against_games}
        </div>
      );
    };

    return (
      <div>
        <TableLink to={`/matches/${matchId}`} color={getColor(field)}>
          <span style={{ color: getColor(field) }}>
            {getString(field)}
          </span>
        </TableLink>
        <div>
          <span
            //@ts-expect-error
            style={{ ...subTextStyle, marginTop: 1, display: 'inline' }}>
            {row.league_name ? row.league_name : strings[`lobby_type_${row.lobby_type}`]}
          </span>
          <span
            //@ts-expect-error
            style={partyStyle}
            data-hint={`${strings.filter_party_size} ${row.party_size || strings.game_mode_0}`}
            data-hint-position="top"
          >
            {partySize(row.party_size)}
          </span>
          <span>
            {sameTeam(row.sameTeam)}
          </span>
        </div>
      </div>);
  },
  mode: (row: any, col: any, field: any) => {
    const { strings } = store.getState().app;

    const skillStyle = {
      ...subTextStyle,
      display: 'inline',
      float: 'left',
      opacity: `${!row.average_rank ? 0.6 : 1}`,
    };

    return (
      <div>
        {strings[`game_mode_${field}`] && (`${strings[`game_mode_${field}`]}`)}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span
            //@ts-expect-error
            style={skillStyle}>
            {rankTierToString(row.average_rank)}
          </span>
        </div>
        <ReactTooltip place="top" effect="solid" />
      </div>
    );
  },
  start_time: (row: any, col: any, field: any) => <FromNowTooltip timestamp={field} />,
  last_played: (row: any, col: any, field: any) => <FromNowTooltip timestamp={field} />,
  duration: (row: any, col: any, field: any) => {
    const { strings } = store.getState().app;
    const playerSideExists = row && typeof row.player_slot !== 'undefined';
    const playerIsRadiant = playerSideExists && isRadiant(row.player_slot);
    const teamSideExists = row && typeof row.radiant !== 'undefined';
    const teamIsRadiant = teamSideExists && row.radiant;
    const displaySide = playerSideExists || teamSideExists;

    return (
      <div>
        <span>
          {formatSeconds(field)}
        </span>
        {displaySide && <span
          //@ts-expect-error
          style={{ ...subTextStyle }}>{playerIsRadiant || teamIsRadiant ? strings.general_radiant : strings.general_dire}</span>}
      </div>
    );
  },
  patch: (row: any, col: any, field: any) => (patch[field] ? patch[field].name : field),
  winPercent: (row: any, col: any, field: any) => `${(field * 100).toFixed(2)}%`,
  kda: (row: any, col: any, field: any) => <KDA kills={field} deaths={row.deaths} assists={row.assists} />,
  rank: (row: any, col: any, field: any) => getOrdinal(field),
  rank_percentile: (row: any) => (
    <span style={{ color: constants[percentile(row.rank / row.card).color as keyof typeof constants] as string }}>
      {getPercentWin(row.rank, row.card).toFixed(2)}%
    </span>
  ),
  player: (row: any) => (
    <TableHeroImage
      image={row.avatar || row.avatarfull}
      title={row.name || row.personaname || row.account_id}
      subtitle={row.subtitle || (row.last_played && <FromNowTooltip timestamp={row.last_played} />)}
      registered={row.last_login}
      confirmed={row.account_id && row.name}
      contributor={row.is_contributor}
      subscriber={row.is_subscriber}
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
}: { field: number }) => {
  if (field === 0) {
    return false;
  }
  return `${config.VITE_IMAGE_CDN}${items[itemIds[String(field) as keyof typeof itemIds] as keyof typeof items].img}`;
};

for (let i = 0; i < 6; i += 1) {
  //@ts-expect-error
  transformations[`item_${i}`] = transformMatchItem;
}

export function isLeapYear(date: Date) {
  const year = date.getFullYear();
  if ((year & 3) !== 0) { // eslint-disable-line no-bitwise
    return false;
  }
  return ((year % 100) !== 0 || (year % 400) === 0);
}

// Get Day of Year
export function getDOY(date: Date) {
  const dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const mn = date.getMonth();
  const dn = date.getDate();
  let dayOfYear = dayCount[mn] + dn;
  if (mn > 1 && isLeapYear(date)) {
    dayOfYear += 1;
  }
  return dayOfYear;
}

// find and style/highlight number values in tooltip descriptions
export function styleValues(el: HTMLElement | null, style = 'font-weight:500;color:#F5F5F5') {
  if (el) {
    const element = el;
    element.innerHTML = el.innerHTML
      .replace(/(,)(\d)/gm, ' / $2')
      .replace(/\s?-?\s?\d+\.?%?\d*%?x?/gm, `<span style=${style}>$&</span>`);
  }
  return null;
}

export function formatValues(values: any[]) {
  if (Array.isArray(values)) {
    return values.filter(value => value).join(' / ');
  }
  return values;
}

// handles table cell custom and default styling
export function getColStyle(column: any) {
  return {
    textAlign: column.textAlign || 'initial',
    paddingRight: column.paddingRight !== undefined ? column.paddingRight : 8,
    paddingLeft: column.paddingLeft !== undefined ? column.paddingLeft : 8,
    width: column.key === 'heroTd' && !column.width ? '1px' : column.width,
    borderLeft: column.borderLeft,
    borderRight: column.borderRight,
    backgroundColor: column.colColor,
    direction: column.textAlign === 'right' && 'rtl',
    color: column.color || constants.secondaryTextColor,
  };
}

export function getLocalizedWeekdayStrings() {
  const langCode = window.localStorage.getItem('localization') || 'en-US';
  const d = new Date();
  return [...Array(7)].map((_, i) => new Date(d.setDate(d.getDate() - d.getDay() + i)).toLocaleDateString(langCode, { weekday: 'short' }));
}

export function getLocalizedMonthStrings() {
  const langCode = window.localStorage.getItem('localization') || 'en-US';
  const d = new Date();
  return [...Array(12)].map((_, i) => new Date(d.setMonth(i)).toLocaleDateString(langCode, { month: 'short' }));
}

export function formatGraphValueData(data: number, histogramName: string) {
  if (data !== 0 && !data) return '';

  switch (histogramName) {
    case 'duration':
      return formatSeconds(data);

    default:
      return data;
  }
}

export function escapeRegExp(stringToGoIntoTheRegex: string) {
  return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // eslint-disable-line no-useless-escape
}

/**
 * Takes a string of URL query params, converts it into an object, and adds the turbo filter params if localstorage setting is set
 * @param params A string of URL query params
 */
export function paramsWithTurbo(params: any) {
  const isTurboMode = window.localStorage.getItem('modeFilter') === 'turbo';
  let objParams = params ?? {};
  if (typeof params === 'string' && params) {
    objParams = querystring.parse(params.slice(1));
  }
  if (!isTurboMode) {
    return objParams;
  }
  return { ...objParams, significant: 0, game_mode: 23 };
}

export const patchDate: Record<string, number> = {};
patch.forEach((patchElement) => {
  patchDate[patchElement.name] = new Date(patchElement.date).getTime() / 1000;
});

export function getWardSize(type: string, mapSize: number) {
  const originMapSize = 12000;

  if (type === 'observer') {
    return (mapSize * 1600) / originMapSize;
  } else {
    return (mapSize * 1000) / originMapSize;
  }
};
