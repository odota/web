import {
  isRadiant,
  isSupport,
} from 'utility';
import {
  specific,
  heroes,
  xp_level as xpLevel,
  lane_role as laneRole,
} from 'dotaconstants';
import analysis from './analysis';

const expanded = {};
Object.keys(specific).forEach((key) => {
  for (let i = 1; i < 5; i++) {
    expanded[key.replace('#', i)] = specific[key];
  }
});

const getMaxKeyOfObject = (field) =>
  (field ? Object.keys(field).sort((a, b) => Number(b) - Number(a))[0] : '');

function getLevelFromXp(xp) {
  for (let i = 0; i < xpLevel.length; i++) {
    if (xpLevel[i] > xp) {
      return i;
    }
  }
  return xpLevel.length;
}

/**
 * Generates data for c3 charts in a match
 **/
function generateGraphData(match) {
  if (match.players && match.players[0] && match.radiant_gold_adv && match.radiant_xp_adv) {
    // compute graphs
    const goldDifference = ['Gold', ...match.radiant_gold_adv];
    const xpDifference = ['XP', ...match.radiant_xp_adv];
    const time = ['time', ...match.players[0].times];
    const data = {
      difference: [time, xpDifference, goldDifference],
      gold: [time],
      xp: [time],
      lh: [time],
    };
    match.players.forEach((p) => {
      let hero = heroes[p.hero_id] || {};
      hero = hero.localized_name;
      if (p.gold_t) {
        data.gold.push([hero, ...p.gold_t]);
      }
      if (p.xp_t) {
        data.xp.push([hero, ...p.xp_t]);
      }
      if (p.lh_t) {
        data.lh.push([hero, ...p.lh_t]);
      }
    });
    return data;
  }
  return {};
}

/**
 * Generates position data for a player
 **/
function generatePositionData(d, p) {
  // d, a hash of keys to process
  // p, a player containing keys with values as position hashes
  // stores the resulting arrays in the keys of d
  // 64 is the offset of x and y values
  // subtracting y from 127 inverts from bottom/left origin to top/left origin
  const result = {};
  Object.keys(d).forEach(key => {
    const t = [];
    Object.keys(p[key]).forEach(x => {
      Object.keys(p[key][x]).forEach(y => {
        t.push({
          x: Number(x) - 64,
          y: 127 - (Number(y) - 64),
          value: p[key][x][y],
        });
      });
    });
    result[key] = t;
  });
  return result;
}

function generateTeamfights(m) {
  const computeTfData = (tf) => {
    const newtf = {};
    newtf.posData = [];
    newtf.radiant_gold_delta = 0;
    newtf.radiant_xp_delta = 0;
    newtf.radiant_participation = 0;
    newtf.radiant_deaths = 0;
    newtf.dire_participation = 0;
    newtf.dire_deaths = 0;
    newtf.players = m.players.map(p => {
      const tfplayer = tf.players[p.player_slot % (128 - 5)];
      // compute team gold/xp deltas
      if (isRadiant(p.player_slot)) {
        newtf.radiant_gold_delta += tfplayer.gold_delta;
        newtf.radiant_xp_delta += tfplayer.xp_delta;
        newtf.radiant_participation += tfplayer.participate ? 1 : 0;
        newtf.radiant_deaths += tfplayer.deaths ? 1 : 0;
      } else {
        newtf.radiant_gold_delta -= tfplayer.gold_delta;
        newtf.radiant_xp_delta -= tfplayer.xp_delta;
        newtf.dire_participation += tfplayer.participate ? 1 : 0;
        newtf.dire_deaths += tfplayer.deaths ? 1 : 0;
      }
      return {
        ...p,
        ...tfplayer,
        participate: tfplayer.deaths > 0 || tfplayer.damage > 0 || tfplayer.healing > 0,
        level_start: getLevelFromXp(tfplayer.xp_start),
        level_end: getLevelFromXp(tfplayer.xp_end),
        posData: generatePositionData({
          deaths_pos: 1,
        }, tfplayer),
      };
    });
    return newtf;
  };
  return (m.teamfights || []).map(tf => ({
    ...tf,
    ...computeTfData(tf),
  }));
}

function renderMatch(m) {
  /*
  // Not using for MVP
  // originally implemented by @coreymaher
  m.hero_combat = {
    damage: {
      radiant: 0,
      dire: 0,
    },
    kills: {
      radiant: 0,
      dire: 0,
    },
  };
  m.players.forEach(pm => {
    // Compute combat k/d and damage tables
    pm.hero_combat = {
      damage: {
        total: 0,
      },
      taken: {
        total: 0,
      },
      kills: {
        total: 0,
      },
      deaths: {
        total: 0,
      },
    };
    m.players.forEach((other_pm) => {
      const team = (pm.isRadiant) ? 'radiant' : 'dire';
      const other_hero = heroes[other_pm.hero_id];
      let damage = 0;
      let taken = 0;
      let kills = 0;
      let deaths = 0;
      // Only care about enemy hero combat
      if (pm.isRadiant !== other_pm.isRadiant && pm.damage) {
        damage = (pm.damage[other_hero.name]) ? pm.damage[other_hero.name] : 0;
        taken = (pm.damage_taken[other_hero.name]) ? pm.damage_taken[other_hero.name] : 0;
      }
      if (pm.isRadiant !== other_pm.isRadiant && pm.killed) {
        kills = (pm.killed[other_hero.name]) ? pm.killed[other_hero.name] : 0;
        deaths = (pm.killed_by[other_hero.name]) ? pm.killed_by[other_hero.name] : 0;
      }
      pm.hero_combat.damage[other_hero.name] = damage;
      pm.hero_combat.taken[other_hero.name] = taken;
      pm.hero_combat.damage.total += damage;
      pm.hero_combat.taken.total += taken;
      pm.hero_combat.kills[other_hero.name] = kills;
      pm.hero_combat.deaths[other_hero.name] = deaths;
      pm.hero_combat.kills.total += kills;
      pm.hero_combat.deaths.total += deaths;
      m.hero_combat.damage[team] += damage;
      m.hero_combat.kills[team] += kills;
    });
  });
  });
  */
  const newPlayers = m.players.map(pm => {
    const additionalProps = {
      ...pm,
      desc: [laneRole[pm.lane_role], isSupport(pm) ? 'Support' : 'Core'].join('/'),
      multi_kills_max: getMaxKeyOfObject(pm.multi_kills),
      kill_streaks_max: getMaxKeyOfObject(pm.kill_streaks),
      analysis: analysis(m, pm),
    };
    // filter interval data to only be >= 0
    if (pm.times) {
      const intervals = ['lh_t', 'gold_t', 'xp_t', 'times'];
      intervals.forEach((key) => {
        additionalProps[key] = pm[key].filter((el, i) => pm.times[i] >= 0);
      });
    }
    // compute damage to towers/rax/roshan
    if (pm.damage) {
      // npc_dota_goodguys_tower2_top
      // npc_dota_goodguys_melee_rax_top
      // npc_dota_roshan
      // npc_dota_neutral_giant_wolf
      // npc_dota_creep
      additionalProps.objective_damage = {};
      Object.keys(pm.damage).forEach(key => {
        let identifier = null;
        if (key.indexOf('tower') !== -1) {
          identifier = key.split('_').slice(3).join('_');
        }
        if (key.indexOf('rax') !== -1) {
          identifier = key.split('_').slice(4).join('_');
        }
        if (key.indexOf('roshan') !== -1) {
          identifier = 'roshan';
        }
        if (key.indexOf('fort') !== -1) {
          identifier = 'fort';
        }
        additionalProps.objective_damage[identifier] = additionalProps.objective_damage[identifier] ?
          additionalProps.objective_damage[identifier] + pm.damage[key] :
          pm.damage[key];
      });
    }
    if (pm.killed) {
      additionalProps.specific = {};
      // expand keys in specific by # (1-4)
      // map to friendly name
      // iterate through keys in killed
      // if in expanded, put in pm.specific
      Object.keys(pm.killed).forEach(key => {
        if (key in expanded) {
          const name = expanded[key];
          additionalProps.specific[name] = pm.specific[name] ? pm.specific[name] + pm.killed[key] : pm.killed[key];
        }
      });
    }
    return additionalProps;
  });
  return {
    ...m,
    graphData: generateGraphData(m),
    teamfights: generateTeamfights(m),
    players: newPlayers,
  };
}

export default renderMatch;
