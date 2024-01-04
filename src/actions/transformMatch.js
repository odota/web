import heroes from 'dotaconstants/build/heroes.json';
import immutable from 'seamless-immutable';
import flatten from 'lodash/fp/flatten';
import {
  isRadiant,
  isSupport,
  getLevelFromXp,
  unpackPositionData,
} from '../utility';
import analyzeMatch from './analyzeMatch';
import store from '../store';

const abilityIds = (await import('dotaconstants/build/ability_ids.json')).default;

let expandedUnitNames = null;

function generateExpandedUnitNames(strings) {
  const expanded = {};
  Object.keys(strings)
    .filter(str => str.indexOf('npc_dota_') === 0)
    .forEach((key) => {
      // Currently, no unit goes up higher than 4
      for (let i = 1; i < 5; i += 1) {
        expanded[key.replace('#', i)] = strings[key];
      }
    });
  return expanded;
}

const getMaxKeyOfObject = field => Number(Object.keys(field || {}).sort((a, b) => Number(b) - Number(a))[0]) || 0;

function generateTeamfights({ players, teamfights = [] }) {
  const computeTfData = (tf) => {
    const newtf = {
      ...tf,
      deaths_pos: [],
      radiant_gold_advantage_delta: 0,
      radiant_gold_delta: 0,
      dire_gold_delta: 0,
      radiant_xp_delta: 0,
      radiant_participation: 0,
      radiant_deaths: 0,
      dire_participation: 0,
      dire_deaths: 0,
    };
    newtf.players = players.map((player) => {
      const tfplayer = tf.players[player.player_slot % (128 - 5)];
      if (!tfplayer) {
        return null;
      }
      // compute team gold/xp deltas
      if (isRadiant(player.player_slot)) {
        newtf.radiant_gold_advantage_delta += tfplayer.gold_delta;
        newtf.radiant_gold_delta += tfplayer.gold_delta;
        newtf.radiant_xp_delta += tfplayer.xp_delta;
        newtf.radiant_participation += tfplayer.participate ? 1 : 0;
        newtf.radiant_deaths += tfplayer.deaths ? 1 : 0;
      } else {
        newtf.radiant_gold_advantage_delta -= tfplayer.gold_delta;
        newtf.dire_gold_delta -= tfplayer.gold_delta;
        newtf.radiant_xp_delta -= tfplayer.xp_delta;
        newtf.dire_participation += tfplayer.participate ? 1 : 0;
        newtf.dire_deaths += tfplayer.deaths ? 1 : 0;
      }
      const playerDeathsPos = unpackPositionData(tfplayer.deaths_pos)
        .map(deathPos => ({
          ...deathPos,
          isRadiant: isRadiant(player.player_slot),
          player,
        }));
      newtf.deaths_pos = newtf.deaths_pos.concat(playerDeathsPos);
      return {
        ...player,
        ...tfplayer,
        participate: tfplayer.deaths > 0 || tfplayer.damage > 0, // || tfplayer.healing > 0,
        level_start: getLevelFromXp(tfplayer.xp_start),
        level_end: getLevelFromXp(tfplayer.xp_end),
        deaths_pos: playerDeathsPos,
      };
    }).filter(player => (player !== null));

    // We have to do this after we process the stuff so that we will have the player in
    // the data instead of just the 'teamfight player' which doesn't have enough data.
    newtf.deaths_pos = newtf.deaths_pos
      .map(death => ([{
        ...death,
        killer: newtf.players
          .find(killer => heroes[death.player.hero_id] && killer.killed[heroes[death.player.hero_id].name]),
      }]))
      .reduce(
        (newDeathsPos, death) => {
          const copy = [...newDeathsPos];
          const samePosition = copy
            .findIndex((deathPos) => {
              const cursor = deathPos[0];
              return cursor.x === death[0].x && cursor.y === death[0].y;
            });
          if (samePosition !== -1) {
            copy[samePosition] = copy[samePosition].concat(death);
          } else {
            copy.push(death);
          }
          return copy;
        },
        [],
      );
    return newtf;
  };
  return (teamfights || []).map(computeTfData);
}

// create a detailed history of each wards
function generateVisionLog(match) {
  const computeWardData = (player, i) => {
    // let's coerce some value to be sure the structure is what we expect.
    const safePlayer = {
      ...player,
      obs_log: player.obs_log || [],
      sen_log: player.sen_log || [],
      obs_left_log: player.obs_left_log || [],
      sen_left_log: player.sen_left_log || [],
    };

    // let's zip the *_log and the *_left log in a 2-tuples
    const extractVisionLog = (type, enteredLog, leftLog) =>
      enteredLog.map((e) => {
        const wards = [e, leftLog.find(l => l.ehandle === e.ehandle)];
        return {
          player: i,
          key: wards[0].ehandle,
          type,
          entered: wards[0],
          left: wards[1],
        };
      });
    const observers = extractVisionLog('observer', safePlayer.obs_log, safePlayer.obs_left_log);
    const sentries = extractVisionLog('sentry', safePlayer.sen_log, safePlayer.sen_left_log);
    return observers.concat(sentries);
  };

  const temp = flatten((match.players || []).map(computeWardData));
  temp.sort((a, b) => a.entered.time - b.entered.time);
  const result2 = temp.map((x, i) => ({ ...x, key: i }));

  return result2;
}

function transformMatch(m) {
  const { strings } = store.getState().app;

  // lane winning
  const lineResults = m.players.reduce((res, pl) => {
    res[pl.isRadiant] = res[pl.isRadiant] || [];
    res[pl.isRadiant][pl.lane] = res[pl.isRadiant][pl.lane] || 0;

    res[pl.isRadiant][pl.lane] += (pl.gold_t || [])[10]
    return res;
  }, {});

  const newPlayers = m.players.map((player) => {
    const newPlayer = {
      ...player,
      desc: [strings[`lane_role_${player.lane_role}`], isSupport(player) ? 'Support' : 'Core'].join('/'),
      multi_kills_max: getMaxKeyOfObject(player.multi_kills),
      kill_streaks_max: getMaxKeyOfObject(player.kill_streaks),
      lh_ten: (player.lh_t || [])[10],
      dn_ten: (player.dn_t || [])[10],
      line_win: lineResults[player.isRadiant]?.[player.lane] > lineResults[!player.isRadiant]?.[player.lane],
      analysis: analyzeMatch(m, player),
    };

    // filter interval data to only be >= 0
    if (player.times) {
      const intervals = ['lh_t', 'gold_t', 'xp_t', 'times'];
      intervals.forEach((key) => {
        newPlayer[key] = player[key].filter((el, i) => player.times[i] >= 0);
      });

      // compute a cs_t as a sum of lh_t & dn_t
      const csT = (player.lh_t || []).map((v, i) => v + ((player.dn_t || [])[i] || 0));
      newPlayer.cs_t = csT.filter((el, i) => player.times[i] >= 0);
    }


    // compute damage to towers/rax/roshan
    if (player.damage) {
      // npc_dota_goodguys_tower2_top
      // npc_dota_goodguys_melee_rax_top
      // npc_dota_roshan
      // npc_dota_neutral_giant_wolf
      // npc_dota_creep
      newPlayer.objective_damage = {};
      Object.keys(player.damage).forEach((key) => {
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
        if (key.indexOf('healers') !== -1) {
          identifier = 'shrine';
        }
        newPlayer.objective_damage[identifier] = newPlayer.objective_damage[identifier] ?
          newPlayer.objective_damage[identifier] + player.damage[key] :
          player.damage[key];
      });
    }
    if (player.killed) {
      newPlayer.specific = {};
      // expand keys in specific by # (1-4)
      // map to friendly name
      // iterate through keys in killed
      // if in expanded, put in pm.specific
      if (!expandedUnitNames) {
        expandedUnitNames = generateExpandedUnitNames(strings);
      }
      Object.keys(player.killed).forEach((key) => {
        if (key in expandedUnitNames) {
          const name = expandedUnitNames[key];
          newPlayer.specific[name] = newPlayer.specific[name] ? newPlayer.specific[name] + newPlayer.killed[key] : newPlayer.killed[key];
        }
      });
    }
    if (player.purchase) {
      newPlayer.purchase_tpscroll = player.purchase.tpscroll;
      newPlayer.purchase_ward_observer = player.purchase.ward_observer;
      newPlayer.purchase_ward_sentry = player.purchase.ward_sentry;
      newPlayer.purchase_smoke_of_deceit = player.purchase.smoke_of_deceit;
      newPlayer.purchase_dust = player.purchase.dust;
      newPlayer.purchase_gem = player.purchase.gem;
    }
    newPlayer.buybacks = (player.buyback_log || []).length;
    newPlayer.total_gold = (player.gold_per_min * m.duration) / 60;
    if (m.game_mode === 18 && Object.prototype.hasOwnProperty.call(player, 'ability_upgrades_arr')) {
      const arr = [];
      if (player.ability_upgrades_arr) {
        player.ability_upgrades_arr.forEach((ability) => {
          if (!arr.includes(ability) && abilityIds[ability] && abilityIds[ability].indexOf('special_bonus') === -1) {
            arr.push(ability);
          }
        });
      }
      newPlayer.abilities = arr;
    }
    newPlayer.hero_name = heroes[player.hero_id] && heroes[player.hero_id].name;

    return newPlayer;
  });

  const newObjectives = (m.objectives || []).map((obj) => {
    if (obj.slot > 0) {
      return {
        ...obj,
        player_slot: obj.slot > 4 ? obj.slot + 123 : obj.slot,
      };
    }
    return {
      ...obj,
    };
  });

  return {
    ...m,
    teamfights: generateTeamfights(m),
    players: newPlayers,
    wards_log: generateVisionLog(immutable(m)),
    objectives: newObjectives,
  };
}

export default transformMatch;
