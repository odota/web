import util from 'util';
import {
  items,
  item_groups as itemGroups,
  skillshots,
} from 'dotaconstants';
import {
  isSupport,
  getObsWardsPlaced,
  isRoshHero,
  isActiveItem,
} from 'utility';

export default function (match, pm) {
  // define condition check for each advice point
  const advice = {};
  const checks = {
    // EFF@10
    eff(m, pm) {
      const eff = pm.lane_efficiency ? pm.lane_efficiency : undefined;
      let top = 0.6;
      if (pm.lane_role === 3) {
        top = 0.4;
      }
      if (isSupport(pm)) {
        top = 0.3;
      }
      return {
        grade: true,
        name: 'Lane efficiency at 10 minutes',
        value: eff,
        top,
        valid: eff !== undefined,
        score(raw) {
          return raw;
        },
      };
    },
    // farming drought (low gold earned delta over an interval)
    farm_drought(m, pm) {
      let delta = Number.MAX_VALUE;
      const interval = 5;
      let start = 0;
      if (pm.gold_t) {
        for (let i = 0; i < pm.gold_t.length - interval; i++) {
          const diff = pm.gold_t[i + interval] - pm.gold_t[i];
          if (i > 5 && diff < delta) {
            delta = diff;
            start = i;
          }
        }
      }
      return {
        grade: true,
        name: 'Lowest GPM in 5 minute interval',
        suffix: util.format('(<b>%s</b> minutes)', start),
        value: delta / interval,
        top: isSupport(pm) ? 150 : 300,
        valid: Boolean(start),
        score(raw) {
          return raw;
        },
      };
    },
    // Flaming in all chat
    flaming(m, pm) {
      let flames = 0;
      const words = ['fuck', 'shit'];
      if (pm.my_word_counts) {
        Object.keys(pm.my_word_counts).forEach(key => {
          if (words.some((w) => key.indexOf(w) !== -1)) {
            flames += pm.my_word_counts[key];
          }
        });
      }
      return {
        name: 'Profanities used',
        value: flames,
        valid: Boolean(pm.my_word_counts),
        score(raw) {
          return 5 - raw;
        },
        top: 0,
      };
    },
    // Courier feeding
    courier_feeding(m, pm) {
      const couriers = pm.purchase && pm.purchase.courier ? Math.max(pm.purchase.courier - 2, 0) : 0;
      return {
        name: 'Couriers bought and fed',
        value: couriers,
        valid: Boolean(pm.purchase),
        score(raw) {
          return raw ? 0 : 1;
        },
        top: 0,
      };
    },
    // low ability accuracy (custom list of skillshots)
    skillshot(m, pm) {
      let acc;
      if (pm.ability_uses && pm.hero_hits) {
        Object.keys(pm.ability_uses).forEach(key => {
          if (key in skillshots) {
            acc = pm.hero_hits[key] / pm.ability_uses[key];
          }
        });
      }
      return {
        grade: true,
        name: 'Skillshots landed',
        value: acc,
        valid: acc !== undefined,
        score(raw) {
          return raw || 0;
        },
        top: 0.5,
      };
    },
    // courier buy delay (3 minute flying)
    late_courier(m, pm) {
      const flyingAvailable = 180;
      let time;
      if (pm.purchase && pm.first_purchase_time && pm.first_purchase_time.flying_courier) {
        time = pm.first_purchase_time.flying_courier;
      }
      return {
        grade: true,
        name: 'Courier upgrade delay',
        value: time - flyingAvailable,
        valid: time !== undefined,
        score(raw) {
          return 180 - raw;
        },
        top: 30,
      };
    },
    // low obs wards/min
    wards(m, pm) {
      const wardCooldown = 60 * 7;
      const wards = getObsWardsPlaced(pm);
      // divide game length by ward cooldown
      // 2 wards respawn every interval
      // split responsibility between 2 supports
      const maxPlaced = ((m.duration / wardCooldown) * 2) / 2;
      return {
        grade: true,
        name: 'Wards placed',
        value: wards,
        valid: isSupport(pm),
        score(raw) {
          return raw / maxPlaced;
        },
        top: maxPlaced,
      };
    },
    // roshan opportunities (specific heroes)
    roshan(m, pm) {
      let roshTaken = 0;
      if (isRoshHero(pm) && pm.killed) {
        roshTaken = pm.killed.npc_dota_roshan || 0;
      }
      return {
        name: 'Roshans killed',
        value: roshTaken,
        valid: isRoshHero(pm),
        score(raw) {
          return raw;
        },
        top: 1,
      };
    },
    // rune control (mid player)
    rune_control(m, pm) {
      let runes;
      if (pm.runes) {
        runes = 0;
        Object.keys(pm.runes).forEach(key => {
          runes += pm.runes[key];
        });
      }
      const target = match.duration / 60 / 4;
      return {
        grade: true,
        name: 'Runes obtained',
        value: runes,
        valid: runes !== undefined && pm.lane_role === 2,
        score(raw) {
          return raw / target;
        },
        top: target,
      };
    },
    // unused item actives (multiple results?)
    unused_item(m, pm) {
      function getGroupedItemUses(key) {
        let total = 0;
        Object.keys(pm.item_uses).forEach(key2 => {
          if (key === key2 || itemGroups.some((g) => (key in g) && (key2 in g))) {
            total += pm.item_uses[key];
          }
        });
        return total;
      }
      const result = [];
      if (pm.purchase) {
        Object.keys(pm.purchase).forEach(key => {
          if (pm.purchase[key] && getGroupedItemUses(key) < 1 && items[key] && isActiveItem(key)) {
            // if item has cooldown, consider it usable
            result.push(`<img title='${key}' class='item img-sm' src='${items[key].img}' />`);
          }
        });
      }

      return {
        name: 'Unused active items',
        suffix: util.format('%s', result.length ? result.join('') : 0),
        value: result.length,
        valid: pm.purchase,
        score(raw) {
          return 5 - raw;
        },
        top: 0,
      };
    },
  };
  Object.keys(checks).forEach(key => {
    advice[key] = checks[key](match, pm);
    const val = advice[key];
    val.display = util.format('%s: %s, expected %s', val.name, Number(val.value ? val.value.toFixed(2) : ''), Number(val.top.toFixed(2)));
    val.display += (val.suffix ? ` ${val.suffix}` : '');
    val.pct = val.score(val.value) / val.score(val.top);
    delete val.score;
  });
  return advice;
}
