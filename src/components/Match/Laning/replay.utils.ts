import { getLevelAtMinute } from "./laning.utils";

/** Optional detailed replay logs; aggregate `killed` totals cannot locate kills in time. */
export type ReplayPlayer = MatchPlayer & {
  creep_kills_log?: { time: number; key: string }[];
  ability_upgrades?: { time: number; ability: number; level: number }[];
};

/** Two-minute windows are (start, end], with time zero included in the first. */
export const inReplayInterval = (time: number, minute: number) =>
  Number.isFinite(time) && time <= minute * 60 &&
  (minute === 2 ? time >= 0 : time > (minute - 2) * 60);

export const getReplayGain = (samples: number[] | undefined, minute: number) => {
  const start = samples?.[minute - 2];
  const end = samples?.[minute];
  return typeof start === "number" && Number.isFinite(start) && typeof end === "number" && Number.isFinite(end)
    ? end - start : null;
};

export const getReplayCreeps = (player: ReplayPlayer | undefined, minute: number) => {
  if (!Array.isArray(player?.creep_kills_log)) return null;
  const counts: Record<string, number> = {};
  player.creep_kills_log.filter((entry) => inReplayInterval(entry.time, minute)).forEach(({ key }) => {
    counts[key] = (counts[key] ?? 0) + 1;
  });
  return Object.entries(counts);
};

/** All upgrades recorded or estimated by the selected snapshot. */
export const getReplaySkills = (player: ReplayPlayer | undefined, minute: number) => {
  if (!player) return null;
  if (Array.isArray(player.ability_upgrades)) {
    return { estimated: false, upgrades: player.ability_upgrades.filter((entry) => Number.isFinite(entry.time) && entry.time <= minute * 60).slice().sort((a, b) => a.time - b.time) };
  }
  const endLevel = getLevelAtMinute(player, minute);
  if (!Array.isArray(player.ability_upgrades_arr) || endLevel === null) return null;
  // Upgrade order has no timestamps. XP only estimates when a skill point became available.
  return {
    estimated: true,
    upgrades: player.ability_upgrades_arr.slice(0, endLevel).map((ability, index) => ({ ability, level: index + 1 })),
  };
};
