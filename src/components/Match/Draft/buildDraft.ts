export type PickBan = {
  is_pick: boolean;
  hero_id: number;
  team: number;
  order: number;
};

// draft_timings comes from the replay parser. Since patch 59 the replay starts
// after the first ban phase, so those actions can be missing or have no time.
export type DraftTiming = {
  hero_id: number;
  total_time_taken?: number | null;
  extra_time?: number | null;
};

export type DraftStep = {
  order: number;
  heroId: number;
  isPick: boolean;
  isRadiant: boolean;
  timeTaken?: number;
  extraTime?: number;
};

// Some parsed matches have every hero_id in draft_timings doubled. Decide for
// the whole draft, since a doubled id can also be a real hero (38 * 2 = 76).
const getTimingHeroId = (timings: DraftTiming[], heroIds: Set<number>) => {
  const allMatch = timings.every((t) => heroIds.has(t.hero_id));
  const allMatchHalved = timings.every((t) => heroIds.has(t.hero_id / 2));
  return !allMatch && allMatchHalved
    ? (t: DraftTiming) => t.hero_id / 2
    : (t: DraftTiming) => t.hero_id;
};

const toNumber = (value?: number | null) =>
  typeof value === "number" ? value : undefined;

/**
 * Builds the draft from picks_bans, which already says which team made each
 * pick or ban. This replaces the per-patch order tables in Draft.tsx, which
 * break whenever Valve changes the draft order or a team skips a ban.
 *
 * draft_timings is optional and matched by hero, not by order, because the
 * order of the actions made before the replay starts is not reliable.
 */
export const buildDraft = (
  picksBans?: PickBan[] | null,
  draftTimings?: DraftTiming[] | null,
): DraftStep[] => {
  if (!picksBans) {
    return [];
  }
  const timings = draftTimings || [];
  const heroIds = new Set(picksBans.map((pb) => pb.hero_id));
  const timingHeroId = getTimingHeroId(timings, heroIds);
  const timingByHero = new Map(timings.map((t) => [timingHeroId(t), t]));

  return [...picksBans]
    .sort((a, b) => a.order - b.order)
    .map((pb) => {
      const timing = timingByHero.get(pb.hero_id);
      return {
        order: pb.order + 1,
        heroId: pb.hero_id,
        isPick: pb.is_pick,
        isRadiant: pb.team === 0,
        timeTaken: toNumber(timing?.total_time_taken),
        extraTime: toNumber(timing?.extra_time),
      };
    });
};
