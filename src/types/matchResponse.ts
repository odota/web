/**
 * @file match Response.
 * @description Types, lane enums, and field labels for the graph-focused match response. This models the saved projection rather than the complete API response.
 */

/** JSON players[].lane: the physical location on the map. */
export enum PhysicalLane {
  Unknown = 0,
  Bottom = 1,
  Middle = 2,
  Top = 3,
  Jungle = 4,
}

/** JSON players[].lane_role: lane relative to the player's team, not their position. */
export enum LaneRole {
  Unknown = 0,
  SafeLane = 1,
  Middle = 2,
  Offlane = 3,
  Jungle = 4,
}

/** Standard five-player team slots; these are identifiers rather than role positions. */
export type RadiantPlayerSlot = 0 | 1 | 2 | 3 | 4;
export type DirePlayerSlot = 128 | 129 | 130 | 131 | 132;
export type PlayerSlot = RadiantPlayerSlot | DirePlayerSlot;

/** Minute-indexed stat values. Units and sign conventions belong to the JSON field. */
export type MinuteHistory = number[];

/** Graph-related fields shared by players in the transformed match snapshot. */
export interface MatchGraphPlayerFields {
  /**
   * Hero ID — JSON `players[].hero_id`.
   * Hero identifier resolved through dotaconstants.
   * @example
   * 120
   */
  hero_id: number;
  /**
   * Preferred player name — JSON `players[].name`.
   * Falls back to personaname, then Anonymous, when empty or null.
   * @example
   * null
   */
  name: string | null;
  /**
   * Player display name — JSON `players[].personaname`.
   * May contain Unicode and punctuation; not a unique identifier.
   * @example
   * "1nfernaL"
   */
  personaname: string | null;
  /**
   * Physical lane — JSON `players[].lane`.
   * Map location: 0 unknown, 1 bottom, 2 middle, 3 top, 4 jungle.
   * @example
   * PhysicalLane.Top // JSON: 3
   */
  lane: PhysicalLane;
  /**
   * Team-relative lane — JSON `players[].lane_role`.
   * 0 unknown, 1 safe, 2 middle, 3 offlane, 4 jungle. Not a position from 1–5.
   * @example
   * LaneRole.Offlane // JSON: 3
   */
  lane_role: LaneRole;
  /**
   * Roaming player — JSON `players[].is_roaming`.
   * True when classified as roaming; affects inferred role assignment.
   * @example
   * false
   */
  is_roaming: boolean;
  /**
   * Timeline timestamps — JSON `players[].times`.
   * Elapsed seconds aligned with the stat histories. Index 10 contains 600 seconds.
   * @example
   * [0, 60, 120]
   */
  times: number[];
  /**
   * Net worth history — JSON `players[].gold_t`.
   * Gold values used as net worth by this UI, indexed by minute. Not spendable gold.
   * @example
   * [59, 272, 436]
   */
  gold_t: MinuteHistory;
  /**
   * Experience history — JSON `players[].xp_t`.
   * Cumulative XP indexed by minute; convert each value to a hero level.
   * @example
   * [50, 50, 237]
   */
  xp_t: MinuteHistory;
  /**
   * Last-hit history — JSON `players[].lh_t`.
   * Last-hit count indexed by minute. Zero is a valid recorded count.
   * @example
   * [0, 0, 2]
   */
  lh_t: MinuteHistory;
  /**
   * Deny history — JSON `players[].dn_t`.
   * Deny count indexed by minute. Zero is a valid recorded count.
   * @example
   * [0, 0, 0]
   */
  dn_t: MinuteHistory;
  /**
   * Creep-score history — JSON `players[].cs_t`.
   * Derived from lh_t[index] + dn_t[index].
   * @example
   * [0, 0, 2]
   */
  cs_t: MinuteHistory;
  /**
   * Lane efficiency — JSON `players[].lane_efficiency`.
   * Fraction of the minute-ten gold benchmark. Multiply by 100 for display; not clamped to 1.
   * @example
   * 0.3765157639450283
   */
  lane_efficiency: number;
  /**
   * Lane win — JSON `players[].line_win`.
   * True when this side leads in combined lane gold at minute ten. False may also mean tied or unavailable. Keep the JSON spelling line_win.
   * @example
   * false
   */
  line_win: boolean;
  /**
   * Rank medal and star — JSON `players[].rank_tier`.
   * Tens digit selects the medal, units digit normally selects the star; 61 = Ancient 1, 80 = Immortal. Null means unavailable.
   * @example
   * 61
   */
  rank_tier: number | null;
}

/** Team identity for a standard Radiant player record. */
export interface RadiantPlayerIdentity {
  /** Player slot — JSON players[].player_slot. Radiant slots are 0–4, not role positions. @example 0 */
  player_slot: RadiantPlayerSlot;
  /** Radiant team flag — JSON players[].isRadiant. Must be true for a Radiant slot. @example true */
  isRadiant: true;
}

/** Team identity for a standard Dire player record. */
export interface DirePlayerIdentity {
  /** Player slot — JSON players[].player_slot. Dire slots are 128–132, not role positions. @example 128 */
  player_slot: DirePlayerSlot;
  /** Radiant team flag — JSON players[].isRadiant. Must be false for a Dire slot. @example false */
  isRadiant: false;
}

/** A JSON players[] entry, keeping its team flag consistent with its encoded slot. */
export type MatchGraphPlayer = MatchGraphPlayerFields & (
  RadiantPlayerIdentity | DirePlayerIdentity
);

/**
 * Graph-related subset of the transformed match, not the full API or UI match.
 * TypeScript cannot enforce finite/nonnegative numbers or equal history lengths;
 * validate those properties when reading external JSON.
 * @see test/fixtures/matches/matchid.9048930795.api-response.transformed.json
 * @see test/fixtures/matches/FIELD_REFERENCE.md
 */
export interface MatchGraphResponse {
  /**
   * Match ID — JSON `match_id`.
   * Opaque numeric match identifier.
   * @example
   * 9048930795
   */
  match_id: number;
  /**
   * Match duration — JSON `duration`.
   * Elapsed seconds, not minutes. 1900 seconds is 31:40.
   * @example
   * 1900
   */
  duration: number;
  /**
   * Match winner — JSON `radiant_win`.
   * True for Radiant victory, false for Dire victory. Independent of lane results.
   * @example
   * false
   */
  radiant_win: boolean;
  /**
   * Radiant gold advantage history — JSON `radiant_gold_adv`.
   * Minute-indexed team gold differences: positive favors Radiant, negative favors Dire, zero is tied.
   * @example
   * [158, -318, -644]
   */
  radiant_gold_adv: MinuteHistory;
  /**
   * Radiant XP advantage history — JSON `radiant_xp_adv`.
   * Minute-indexed team XP differences, using the same sign convention as gold.
   * @example
   * [100, 131, -113]
   */
  radiant_xp_adv: MinuteHistory;
  /**
   * Match players — JSON `players`.
   * Player records with team-correlated slots. The fixture contains five per team.
   * @example
   * // See MatchGraphPlayer for the fields of each entry.
   */
  players: MatchGraphPlayer[];
}

/**
 * Readable English names indexed by the exact top-level JSON keys.
 * The key check makes missing or misspelled fields a compile-time error.
 * @example
 * matchGraphFieldNames.radiant_gold_adv; // "Radiant gold advantage history"
 */
export const matchGraphFieldNames = {
  match_id: "Match ID",
  duration: "Match duration",
  radiant_win: "Match winner",
  radiant_gold_adv: "Radiant gold advantage history",
  radiant_xp_adv: "Radiant XP advantage history",
  players: "Match players",
} as const satisfies Record<keyof MatchGraphResponse, string>;

/** Readable English names indexed by the exact keys of a JSON players[] entry. */
export const matchGraphPlayerFieldNames = {
  hero_id: "Hero ID",
  name: "Preferred player name",
  personaname: "Player display name",
  lane: "Physical lane",
  lane_role: "Team-relative lane",
  is_roaming: "Roaming player",
  times: "Timeline timestamps",
  gold_t: "Net worth history",
  xp_t: "Experience history",
  lh_t: "Last-hit history",
  dn_t: "Deny history",
  cs_t: "Creep-score history",
  lane_efficiency: "Lane efficiency",
  line_win: "Lane win",
  rank_tier: "Rank medal and star",
  player_slot: "Player slot",
  isRadiant: "Radiant team flag",
} as const satisfies Record<keyof MatchGraphPlayer, string>;
