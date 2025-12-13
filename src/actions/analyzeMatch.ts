import { skillshots } from "dotaconstants";
import { isSupport, getObsWardsPlaced, isRoshHero } from "../utility";
import store from "../store";

export default function analyzeMatch(match: any, _pm: any) {
  const { strings } = store.getState().app;
  // define condition check for each advice point
  const advice: Record<string, any> = {};
  const checks = {
    // EFF@10
    eff(m: any, pm: any) {
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
        name: strings.analysis_eff,
        value: eff,
        top,
        valid: eff !== undefined,
        score(raw: number) {
          return raw;
        },
      };
    },
    // farming drought (low gold earned delta over an interval)
    farm_drought(m: any, pm: any) {
      let delta = Number.MAX_VALUE;
      const interval = 5;
      let start = 0;
      if (pm.gold_t) {
        const goldT = pm.gold_t.slice(0, Math.floor(m.duration / 60) + 1);
        for (let i = 0; i < goldT.length - interval; i += 1) {
          const diff = goldT[i + interval] - goldT[i];
          if (i > 5 && diff < delta) {
            delta = diff;
            start = i;
          }
        }
      }
      return {
        grade: true,
        name: strings.analysis_farm_drought,
        value: delta / interval,
        top: isSupport(pm) ? 150 : 300,
        valid: Boolean(start),
        score(raw: number) {
          return raw;
        },
      };
    },
    // low ability accuracy (custom list of skillshots)
    skillshot(m: any, pm: any) {
      let acc;
      if (pm.ability_uses && pm.hero_hits) {
        Object.keys(pm.ability_uses).forEach((key) => {
          if (key in skillshots) {
            acc = pm.hero_hits[key] / pm.ability_uses[key];
          }
        });
      }
      return {
        grade: true,
        name: strings.analysis_skillshot,
        value: acc,
        valid: acc !== undefined,
        score(raw: number) {
          return raw || 0;
        },
        top: 0.5,
      };
    },
    // courier buy delay (3 minute flying)
    late_courier(m: any, pm: any) {
      const flyingAvailable = 180;
      let time;
      if (
        pm.purchase &&
        pm.first_purchase_time &&
        pm.first_purchase_time.flying_courier
      ) {
        time = pm.first_purchase_time.flying_courier;
      }
      return {
        grade: true,
        name: strings.analysis_late_courier,
        value: time - flyingAvailable,
        valid: time !== undefined,
        score(raw: number) {
          return 180 - raw;
        },
        top: 30,
      };
    },
    // low obs wards/min
    wards(m: any, pm: any) {
      const wardCooldown = 60 * 7;
      const wards = getObsWardsPlaced(pm);
      // divide game length by ward cooldown
      // 2 wards respawn every interval
      // split responsibility between 2 supports
      const maxPlaced = ((m.duration / wardCooldown) * 2) / 2;
      return {
        grade: true,
        name: strings.analysis_wards,
        value: wards,
        valid: isSupport(pm),
        score(raw: number) {
          return raw / maxPlaced;
        },
        top: maxPlaced,
      };
    },
    // roshan opportunities (specific heroes)
    roshan(m: any, pm: any) {
      let roshTaken = 0;
      if (isRoshHero(pm) && pm.killed) {
        roshTaken = pm.killed.npc_dota_roshan || 0;
      }
      return {
        name: strings.analysis_roshan,
        value: roshTaken,
        valid: isRoshHero(pm),
        score(raw: number) {
          return raw;
        },
        top: 1,
      };
    },
    // rune control (mid player)
    rune_control(m: any, pm: any) {
      let runes: number | undefined = undefined;
      if (pm.runes) {
        runes = 0;
        Object.keys(pm.runes).forEach((key) => {
          runes += pm.runes[key];
        });
      }
      const target = match.duration / 60 / 4;
      return {
        grade: true,
        name: strings.analysis_rune_control,
        value: runes,
        valid: runes !== undefined && pm.lane_role === 2,
        score(raw: number) {
          return raw / target;
        },
        top: target,
      };
    },
  };
  Object.keys(checks).forEach((key) => {
    advice[key] = checks[key as keyof typeof checks](match, _pm);
  });
  return advice;
}
