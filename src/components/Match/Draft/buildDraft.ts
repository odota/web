export type PickBan = {
  is_pick: boolean;
  hero_id: number;
  team: number;
  order: number;
};

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
  extraTimeUsed?: number;
};

const getTimingHeroId = (timings: DraftTiming[], heroIds: Set<number>) => {
  const allMatch = timings.every((t) => heroIds.has(t.hero_id));
  const allMatchHalved = timings.every((t) => heroIds.has(t.hero_id / 2));
  return !allMatch && allMatchHalved
    ? (t: DraftTiming) => t.hero_id / 2
    : (t: DraftTiming) => t.hero_id;
};

const toNumber = (value?: number | null) =>
  typeof value === "number" ? value : undefined;

const toExtraTime = (value?: number | null) =>
  typeof value === "number" && value >= 0 ? value : undefined;

const addExtraTimeUsed = (steps: DraftStep[]): DraftStep[] => {
  const last: Record<string, number> = {};
  const used = steps.map((step) => {
    const team = String(step.isRadiant);
    if (step.extraTime === undefined) {
      return undefined;
    }
    const previous = last[team];
    last[team] = step.extraTime;
    return previous === undefined ? undefined : previous - step.extraTime;
  });
  if (used.some((u) => u !== undefined && u < 0)) {
    return steps.map((step) => ({ ...step, extraTime: undefined }));
  }
  return steps.map((step, i) => ({ ...step, extraTimeUsed: used[i] }));
};

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

  const steps: DraftStep[] = [...picksBans]
    .sort((a, b) => a.order - b.order)
    .map((pb) => {
      const timing = timingByHero.get(pb.hero_id);
      return {
        order: pb.order + 1,
        heroId: pb.hero_id,
        isPick: pb.is_pick,
        isRadiant: pb.team === 0,
        timeTaken: toNumber(timing?.total_time_taken),
        extraTime: toExtraTime(timing?.extra_time),
      };
    });
  return addExtraTimeUsed(steps);
};
