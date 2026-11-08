export type PickBan = {
  is_pick: boolean;
  hero_id: number;
  team: number;
  order: number;
};

export type DraftTiming = {
  hero_id: number;
  total_time_taken?: number | null;
};

export type DraftStep = {
  order: number;
  heroId: number;
  isPick: boolean;
  isRadiant: boolean;
  timeTaken?: number;
};

// The old JS parser stored the hero ids in draft_timings doubled. This can be
// removed once the Java parser fills draft_timings with the real ids.
const getTimingHeroId = (timings: DraftTiming[], heroIds: Set<number>) => {
  const allMatch = timings.every((t) => heroIds.has(t.hero_id));
  const allMatchHalved = timings.every((t) => heroIds.has(t.hero_id / 2));
  return !allMatch && allMatchHalved
    ? (t: DraftTiming) => t.hero_id / 2
    : (t: DraftTiming) => t.hero_id;
};

const toNumber = (value?: number | null) =>
  typeof value === "number" ? value : undefined;

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
      };
    });
};
