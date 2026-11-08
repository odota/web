import { DraftTiming, PickBan } from "./buildDraft";

const PICKS_BANS_8380808771: [number, boolean, number, number][] = [
  [0, false, 0, 38],
  [1, false, 1, 2],
  [2, false, 1, 89],
  [3, false, 0, 102],
  [4, false, 1, 65],
  [5, false, 1, 53],
  [6, false, 0, 137],
  [7, true, 0, 11],
  [8, true, 1, 15],
  [9, false, 0, 100],
  [10, false, 0, 49],
  [11, false, 1, 3],
  [12, true, 1, 27],
  [13, true, 0, 51],
  [14, true, 0, 26],
  [15, true, 1, 66],
  [16, true, 1, 81],
  [17, true, 0, 114],
  [18, false, 0, 59],
  [19, false, 1, 98],
  [20, false, 1, 29],
  [21, false, 0, 39],
  [22, true, 0, 135],
  [23, true, 1, 35],
];

// [order, hero_id, total_time_taken, extra_time]
const DRAFT_TIMINGS_8380808771: [number, number, number, number][] = [
  [1, 76, 0, 130],
  [2, 204, 0, 130],
  [3, 4, 0, 130],
  [4, 178, 0, 130],
  [5, 130, 0, 130],
  [6, 106, 0, 130],
  [7, 274, 29, 106],
  [8, 22, 3, 130],
  [9, 30, 53, 106],
  [10, 200, 30, 106],
  [11, 98, 68, 107],
  [12, 6, 30, 107],
  [13, 54, 1, 68],
  [14, 102, 48, 50],
  [15, 52, 30, 107],
  [16, 132, 58, 79],
  [17, 162, 66, 50],
  [18, 228, 31, 49],
  [19, 118, 29, 43],
  [20, 196, 29, 43],
  [21, 58, 33, 49],
  [22, 78, 69, 10],
  [23, 270, 2, 40],
  [24, 70, 59, 11],
];

const PICKS_BANS_5293089497: [number, boolean, number, number][] = [
  [0, false, 1, 57],
  [1, false, 1, 89],
  [2, false, 1, 82],
  [3, true, 1, 68],
  [4, true, 0, 87],
  [5, true, 0, 7],
  [6, true, 1, 71],
  [7, false, 1, 93],
  [8, false, 1, 12],
  [9, true, 0, 85],
  [10, true, 1, 98],
  [11, true, 0, 29],
  [12, true, 1, 36],
  [13, false, 1, 22],
  [14, true, 1, 47],
  [15, true, 0, 16],
];

// [order, pick, active_team, hero_id, total_time_taken, extra_time]
const DRAFT_TIMINGS_5293089497: [
  number,
  boolean,
  number,
  number,
  number,
  number,
][] = [
  [1, false, 3, 57, 52, 130],
  [2, false, 2, 89, 174, 0],
  [3, false, 2, 82, 37, -286],
  [4, true, 2, 68, 64, -323],
  [5, true, 2, 87, 35, -387],
  [6, true, 2, 7, 35, 113],
  [7, true, 3, 71, 20, 113],
  [8, false, 3, 93, 22, -422],
  [9, false, 2, 12, 76, -499],
  [10, true, 2, 85, 70, 107],
  [11, true, 3, 98, 85, -610],
  [12, true, 2, 29, 35, 56],
  [13, true, 3, 36, 83, -730],
  [14, false, 2, 22, 66, 9],
  [15, true, 3, 47, 40, -848],
  [16, true, 2, 16, 35, -954],
];

export const match5293089497 = {
  match_id: 5293089497,
  game_mode: 2,
  start_time: 1584241522,
  expectedPattern: "bD bD bD PD PR PR PD bD bD PR PD PR PD bD PD PR",
  picks_bans: PICKS_BANS_5293089497.map(
    ([order, is_pick, team, hero_id]): PickBan => ({
      order,
      is_pick,
      team,
      hero_id,
    }),
  ),
  draft_timings: DRAFT_TIMINGS_5293089497.map(
    ([order, pick, active_team, hero_id, total_time_taken, extra_time]) => ({
      order,
      pick,
      active_team,
      hero_id,
      total_time_taken,
      extra_time,
    }),
  ),
};

export const match8380808771 = {
  match_id: 8380808771,
  game_mode: 2,
  picks_bans: PICKS_BANS_8380808771.map(
    ([order, is_pick, team, hero_id]): PickBan => ({
      order,
      is_pick,
      team,
      hero_id,
    }),
  ),
  draft_timings: DRAFT_TIMINGS_8380808771.map(
    ([order, hero_id, total_time_taken, extra_time]) => ({
      order,
      hero_id,
      total_time_taken,
      extra_time,
    }),
  ) as DraftTiming[],
};
