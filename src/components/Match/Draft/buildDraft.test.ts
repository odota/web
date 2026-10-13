import { describe, expect, it } from "vitest";
import { buildDraft, PickBan } from "./buildDraft";

const stubPicksBans = (pattern: string, firstTeam = 0): PickBan[] =>
  pattern.split(" ").map((step, i) => ({
    order: i,
    is_pick: step[0] === "P",
    team: step[1] === "A" ? firstTeam : 1 - firstTeam,
    hero_id: i + 1,
  }));


const ORDER_734 =
  "bA bB bB bA bB bB bA PA PB bA bA bB PB PA PA PB PB PA bA bB bB bA PA PB";

const ORDER_740 =
  "bA bA bB bB bA bB bB PA PB bA bA bB PB PA PA PB PB PA bA bB bA bB PA PB";

const toPattern = (firstTeamIsRadiant: boolean, steps: any[]) =>
  steps
    .map(
      (s) =>
        (s.isPick ? "P" : "b") +
        (s.isRadiant === firstTeamIsRadiant ? "A" : "B"),
    )
    .join(" ");

describe("buildDraft", () => {
  it("returns an empty draft when there is no picks_bans", () => {
    expect(buildDraft(undefined)).toEqual([]);
    expect(buildDraft(null)).toEqual([]);
    expect(buildDraft([])).toEqual([]);
  });

  it("follows the 7.34 order without any hardcoded table", () => {
    const steps = buildDraft(stubPicksBans(ORDER_734));
    expect(steps).toHaveLength(24);
    expect(toPattern(true, steps)).toBe(ORDER_734);
  });

  it("follows the 7.40 order without any hardcoded table", () => {
    const steps = buildDraft(stubPicksBans(ORDER_740));
    expect(toPattern(true, steps)).toBe(ORDER_740);
  });

  it("works when dire has the first pick", () => {
    const steps = buildDraft(stubPicksBans(ORDER_740, 1));
    expect(steps[0].isRadiant).toBe(false);
    expect(toPattern(false, steps)).toBe(ORDER_740);
  });

  it("uses one-based order and keeps hero and pick/ban", () => {
    const [first] = buildDraft([
      { order: 0, is_pick: false, team: 1, hero_id: 57 },
    ]);
    expect(first).toEqual({
      order: 1,
      heroId: 57,
      isPick: false,
      isRadiant: false,
    });
  });

  it("sorts by order without changing the input", () => {
    const input = stubPicksBans("bA bB PA PB").reverse();
    const copy = JSON.parse(JSON.stringify(input));
    const steps = buildDraft(input);
    expect(steps.map((s) => s.order)).toEqual([1, 2, 3, 4]);
    expect(input).toEqual(copy);
  });

  it("keeps the right team after skipped bans (#2647)", () => {
    const picksBans: PickBan[] = [
      { order: 0, is_pick: false, team: 1, hero_id: 57 },
      { order: 1, is_pick: false, team: 1, hero_id: 89 },
      { order: 2, is_pick: false, team: 1, hero_id: 82 },
      { order: 3, is_pick: true, team: 1, hero_id: 68 },
      { order: 4, is_pick: true, team: 0, hero_id: 87 },
      { order: 5, is_pick: true, team: 0, hero_id: 7 },
      { order: 6, is_pick: true, team: 1, hero_id: 71 },
      { order: 7, is_pick: false, team: 1, hero_id: 93 },
      { order: 8, is_pick: false, team: 1, hero_id: 12 },
      { order: 9, is_pick: true, team: 0, hero_id: 85 },
      { order: 10, is_pick: true, team: 1, hero_id: 98 },
      { order: 11, is_pick: true, team: 0, hero_id: 29 },
      { order: 12, is_pick: true, team: 1, hero_id: 36 },
      { order: 13, is_pick: false, team: 1, hero_id: 22 },
      { order: 14, is_pick: true, team: 1, hero_id: 47 },
      { order: 15, is_pick: true, team: 0, hero_id: 16 },
    ];
    const steps = buildDraft(picksBans);
    expect(steps).toHaveLength(16);
    expect(steps.filter((s) => !s.isPick).every((s) => !s.isRadiant)).toBe(
      true,
    );
    expect(steps.filter((s) => s.isPick && s.isRadiant)).toHaveLength(5);
    expect(steps.filter((s) => s.isPick && !s.isRadiant)).toHaveLength(5);
  });

  it.todo("adds time taken and extra time from draft_timings");
  it.todo("matches draft_timings by hero_id, not by order");
  it.todo("works with partial draft_timings (first 7 bans have no time)");
});
