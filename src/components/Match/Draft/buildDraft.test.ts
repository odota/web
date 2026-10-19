import { describe, expect, it } from "vitest";
import { buildDraft, PickBan } from "./buildDraft";
import { match5293089497, match8380808771 } from "./draftFixtures";

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

  it("keeps the right team for every step after skipped bans (#2647)", () => {
    const { picks_bans, draft_timings, expectedPattern } = match5293089497;
    const steps = buildDraft(picks_bans, draft_timings);
    const pattern = steps
      .map((s) => (s.isPick ? "P" : "b") + (s.isRadiant ? "R" : "D"))
      .join(" ");
    expect(steps).toHaveLength(16);
    expect(pattern).toBe(expectedPattern);
  });

  it("adds time taken and extra time from draft_timings", () => {
    const steps = buildDraft(
      [{ order: 0, is_pick: true, team: 0, hero_id: 57 }],
      [{ hero_id: 57, total_time_taken: 42, extra_time: 118 }],
    );
    expect(steps[0].timeTaken).toBe(42);
    expect(steps[0].extraTime).toBe(118);
  });

  it("leaves timings out when there is no draft_timings", () => {
    // every match parsed since about February 2026
    const steps = buildDraft(stubPicksBans(ORDER_740), []);
    expect(steps.every((s) => s.timeTaken === undefined)).toBe(true);
    expect(steps.every((s) => s.extraTime === undefined)).toBe(true);
  });

  it("matches draft_timings by hero_id, not by order", () => {
    const steps = buildDraft(
      [
        { order: 0, is_pick: false, team: 0, hero_id: 10 },
        { order: 1, is_pick: false, team: 1, hero_id: 20 },
      ],
      [
        { hero_id: 20, total_time_taken: 5, extra_time: 100 },
        { hero_id: 10, total_time_taken: 9, extra_time: 130 },
      ],
    );
    expect(steps.map((s) => s.timeTaken)).toEqual([9, 5]);
  });

  it("works with partial draft_timings (first 7 bans have no time)", () => {
    const picksBans = stubPicksBans(ORDER_740);
    const timings = picksBans.slice(7).map((pb) => ({
      hero_id: pb.hero_id,
      total_time_taken: 20,
      extra_time: 100,
    }));
    const steps = buildDraft(picksBans, timings);
    expect(steps.slice(0, 7).every((s) => s.timeTaken === undefined)).toBe(
      true,
    );
    expect(steps.slice(7).every((s) => s.timeTaken === 20)).toBe(true);
  });

  it("treats null times as missing", () => {
    const steps = buildDraft(
      [{ order: 0, is_pick: false, team: 0, hero_id: 10 }],
      [{ hero_id: 10, total_time_taken: null, extra_time: null }],
    );
    expect(steps[0].timeTaken).toBeUndefined();
    expect(steps[0].extraTime).toBeUndefined();
  });

  it("handles the doubled hero ids of match 8380808771", () => {
    const { picks_bans, draft_timings } = match8380808771;
    const steps = buildDraft(picks_bans, draft_timings);
    expect(steps.every((s) => s.timeTaken !== undefined)).toBe(true);
    // ban 2 (hero 2) is order 3 in draft_timings, as hero_id 4
    expect(steps[1]).toMatchObject({ heroId: 2, timeTaken: 0, extraTime: 130 });
    // the last pick (hero 35) is hero_id 70 in draft_timings
    expect(steps[23]).toMatchObject({
      heroId: 35,
      isRadiant: false,
      timeTaken: 59,
      extraTime: 11,
    });
  });

  it("does not halve hero ids when they are not doubled", () => {
    // 76 is a real hero, and 38 * 2 = 76
    const steps = buildDraft(
      [
        { order: 0, is_pick: false, team: 0, hero_id: 76 },
        { order: 1, is_pick: false, team: 1, hero_id: 38 },
      ],
      [
        { hero_id: 76, total_time_taken: 1, extra_time: 130 },
        { hero_id: 38, total_time_taken: 2, extra_time: 130 },
      ],
    );
    expect(steps.map((s) => s.timeTaken)).toEqual([1, 2]);
  });
});
