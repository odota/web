/* eslint-disable */
import { isRadiant } from '../../utility';
import constants from 'dotaconstants';
import { generatePlayerAnalysis } from './analysis';

function renderMatch(m)
{
  m.hero_combat = {
    damage:
    {
      radiant: 0,
      dire: 0,
    },
    kills:
    {
      radiant: 0,
      dire: 0,
    },
  };
  // do render-only processing (not needed for aggregation, only for match display)
  m.players.forEach(function (pm, i)
  {
    // converts hashes to arrays and sorts them
    const targets = ['ability_uses', 'item_uses', 'damage_inflictor', 'damage_inflictor_received'];
    targets.forEach(function (target)
    {
      if (pm[target])
      {
        const t = [];
        for (const key in pm[target])
        {
          const a = constants.abilities[key];
          const i = constants.items[key];
          let def = {
            img: '/public/images/default_attack.png',
          };
          def = a || i || def;
          const result = {
            img: def.img,
            name: (!a && !i) ? 'Auto Attack/Other' : key,
            val: pm[target][key],
            className: a ? 'ability' : i ? 'item' : 'img-sm',
          };
          if (pm.hero_hits)
          {
            result.hero_hits = pm.hero_hits[key];
          }
          t.push(result);
        }
        t.sort(function (a, b)
        {
          return b.val - a.val;
        });
        pm[target + '_arr'] = t;
      }
    });
    // filter interval data to only be >= 0
    if (pm.times)
    {
      const intervals = ['lh_t', 'gold_t', 'xp_t', 'times'];
      intervals.forEach(function (key)
      {
        pm[key] = pm[key].filter(function (el, i)
        {
          return pm.times[i] >= 0;
        });
      });
    }
    // compute damage to towers/rax/roshan
    if (pm.damage)
    {
      // npc_dota_goodguys_tower2_top
      // npc_dota_goodguys_melee_rax_top
      // npc_dota_roshan
      // npc_dota_neutral_giant_wolf
      // npc_dota_creep
      pm.objective_damage = {};
      for (const key in pm.damage)
      {
        let identifier = null;
        if (key.indexOf('tower') !== -1)
        {
          identifier = key.split('_').slice(3).join('_');
        }
        if (key.indexOf('rax') !== -1)
        {
          identifier = key.split('_').slice(4).join('_');
        }
        if (key.indexOf('roshan') !== -1)
        {
          identifier = 'roshan';
        }
        if (key.indexOf('fort') !== -1)
        {
          identifier = 'fort';
        }
        pm.objective_damage[identifier] = pm.objective_damage[identifier] ? pm.objective_damage[identifier] + pm.damage[key] : pm.damage[key];
      }
    }
    try
    {
      // Compute combat k/d and damage tables
      pm.hero_combat = {
        damage:
        {
          total: 0,
        },
        taken:
        {
          total: 0,
        },
        kills:
        {
          total: 0,
        },
        deaths:
        {
          total: 0,
        },
      };
      m.players.forEach(function (other_pm)
      {
        const team = (pm.isRadiant) ? 'radiant' : 'dire';
        const other_hero = constants.heroes[other_pm.hero_id];
        let damage = 0;
        let taken = 0;
        let kills = 0;
        let deaths = 0;
        // Only care about enemy hero combat
        if (pm.isRadiant !== other_pm.isRadiant && pm.damage)
        {
          damage = (pm.damage[other_hero.name]) ? pm.damage[other_hero.name] : 0;
          taken = (pm.damage_taken[other_hero.name]) ? pm.damage_taken[other_hero.name] : 0;
        }
        if (pm.isRadiant !== other_pm.isRadiant && pm.killed)
        {
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
    }
    catch (e)
    {
      console.error('error occurred while summing crosstables');
      console.error(e);
    }
  });
  console.time('generating player analysis');
  m.players.forEach(function (pm, i)
  {
    pm.analysis = generatePlayerAnalysis(m, pm);
  });
  console.timeEnd('generating player analysis');
  // create graph data
  if (m.players[0] && m.players[0].gold_t)
  {
    m.graphData = generateGraphData(m);
  }
  // create heatmap data
  m.posData = m.players.map(function (p)
  {
    return p.posData;
  });
  // process objectives
  if (m.objectives)
  {
    m.objectives.forEach(function (entry)
    {
      entry.objective = constants.objectives[entry.subtype] || entry.subtype;
      const p = m.players[entry.slot];
      if (p)
      {
        entry.team = entry.team === 2 || entry.key < 64 || p.isRadiant ? 0 : 1;
        entry.hero_img = constants.heroes[p.hero_id] ? constants.heroes[p.hero_id].img : '';
      }
    });
  }
  // process teamfight data
  if (m.teamfights)
  {
    m.teamfights.forEach(function (tf)
    {
      tf.posData = [];
      tf.radiant_gold_delta = 0;
      tf.radiant_xp_delta = 0;
      tf.radiant_participation = 0;
      tf.radiant_deaths = 0;
      tf.dire_participation = 0;
      tf.dire_deaths = 0;
      tf.players.forEach(function (p)
      {
        // lookup starting, ending level
        p.level_start = getLevelFromXp(p.xp_start);
        p.level_end = getLevelFromXp(p.xp_end);

        function getLevelFromXp(xp)
        {
          for (let i = 0; i < constants.xp_level.length; i++)
          {
            if (constants.xp_level[i] > xp)
            {
              return i;
            }
          }
          return constants.xp_level.length;
        }
      });
      // add player's hero_id to each teamfight participant
      m.players.forEach(function (p, i)
      {
        const tfplayer = tf.players[p.player_slot % (128 - 5)];
        tfplayer.hero_id = p.hero_id;
        tfplayer.player_slot = p.player_slot;
        tfplayer.isRadiant = isRadiant(p.player_slot);
        tfplayer.personaname = p.personaname;
        tfplayer.account_id = p.account_id;
        tfplayer.participate = tfplayer.deaths > 0 || tfplayer.damage > 0 || tfplayer.healing > 0;
        if (!p.teamfights_participated)
        {
          p.teamfights_participated = 0;
        }
        p.teamfights_participated += tfplayer.participate ? 1 : 0;
        // compute team gold/xp deltas
        if (isRadiant(p.player_slot))
        {
          tf.radiant_gold_delta += tfplayer.gold_delta;
          tf.radiant_xp_delta += tfplayer.xp_delta;
          tf.radiant_participation += tfplayer.participate ? 1 : 0;
          tf.radiant_deaths += tfplayer.deaths ? 1 : 0;
        }
        else
        {
          tf.radiant_gold_delta -= tfplayer.gold_delta;
          tf.radiant_xp_delta -= tfplayer.xp_delta;
          tf.dire_participation += tfplayer.participate ? 1 : 0;
          tf.dire_deaths += tfplayer.deaths ? 1 : 0;
        }
        // convert 2d hash to array
        tfplayer.posData = generatePositionData(
        {
          deaths_pos: 1,
        }, tfplayer);
        // console.log(player);
        // add player hero id to each death, push into teamfight death position array
        tfplayer.posData.deaths_pos.forEach(function (pt)
        {
          pt.hero_id = tfplayer.hero_id;
          tf.posData.push(pt);
        });
      });
    });
  }
  m.chat = m.chat || [];
  return m;
}
/**
 * Generates data for c3 charts in a match
 **/
function generateGraphData(match)
{
  // compute graphs
  let goldDifference = ['Gold'];
  let xpDifference = ['XP'];
  goldDifference = goldDifference.concat(match.radiant_gold_adv);
  xpDifference = xpDifference.concat(match.radiant_xp_adv);
  const time = ['time'].concat(match.players[0].times);
  const data = {
    difference: [time, xpDifference, goldDifference],
    gold: [time],
    xp: [time],
    lh: [time],
  };
  match.players.forEach(function (p, i)
  {
    let hero = constants.heroes[p.hero_id] ||
    {};
    hero = hero.localized_name;
    data.gold.push([hero].concat(p.gold_t));
    data.xp.push([hero].concat(p.xp_t));
    data.lh.push([hero].concat(p.lh_t));
  });
  return data;
}

function generatePositionData(d, p)
{
  // d, a hash of keys to process
  // p, a player containing keys with values as position hashes
  // stores the resulting arrays in the keys of d
  // 64 is the offset of x and y values
  // subtracting y from 127 inverts from bottom/left origin to top/left origin
  for (const key in d)
  {
    const t = [];
    for (const x in p[key])
    {
      for (const y in p[key][x])
      {
        t.push(
        {
          x: Number(x) - 64,
          y: 127 - (Number(y) - 64),
          value: p[key][x][y],
        });
      }
    }
    d[key] = t;
  }
  return d;
}
export
{
  renderMatch
};
