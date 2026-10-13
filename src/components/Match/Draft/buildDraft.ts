export type PickBan = {
  is_pick: boolean;
  hero_id: number;
  team: number;
  order: number;
};

export type DraftStep = {
  order: number;
  heroId: number;
  isPick: boolean;
  isRadiant: boolean;
};

/**
 * Builds the draft from picks_bans, which already says which team made each
 * pick or ban. This replaces the per-patch order tables in Draft.tsx, which
 * break whenever Valve changes the draft order or a team skips a ban.
 *
 * TODO: merge draft_timings (time taken / extra time left) into the steps.
 */
export const buildDraft = (picksBans?: PickBan[] | null): DraftStep[] => {
  if (!picksBans) {
    return [];
  }
  return [...picksBans]
    .sort((a, b) => a.order - b.order)
    .map((pb) => ({
      order: pb.order + 1,
      heroId: pb.hero_id,
      isPick: pb.is_pick,
      isRadiant: pb.team === 0,
    }));
};
