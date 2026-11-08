/**
 * @file Laning data utilities.
 * @description Pure helpers for roles, player identities, stats, chart data,
 * net worth shares, graph availability, and localized labels.
 */

import { heroes } from "dotaconstants";
import { PhysicalLane } from "../../../types/matchResponse";
import { getHeroLevel } from "../../Visualizations/Graph/data";

export type LaneRole = "carry" | "hardSupport" | "midlane" | "offlane" | "softSupport";

/** Dota role positions, independent of physical lane and player slot. */
export enum RolePosition {
  Carry = 1,
  Midlane = 2,
  Offlane = 3,
  SoftSupport = 4,
  HardSupport = 5,
}

/** Position order for each inferred role; display labels are provided by getRoleLabels. */
export const rolePositions = {
  carry: RolePosition.Carry,
  midlane: RolePosition.Midlane,
  offlane: RolePosition.Offlane,
  softSupport: RolePosition.SoftSupport,
  hardSupport: RolePosition.HardSupport,
} as const satisfies Record<LaneRole, RolePosition>;

/**
 * Estimates one team's roles from physical lanes and last hits at minute 10.
 * Returns the original player objects without changing the roster.
 *
 * Non-roaming players are assigned first:
 * - A lone mid player becomes `midlane`.
 * - A lone safe-lane player becomes `carry`; a lone offlaner becomes `offlane`.
 * - In a two-player side lane, more last hits means core and fewer means support.
 *   Equal or missing last-hit values leave both roles unassigned.
 * - Afterward, exactly one roaming player can fill exactly one missing support role.
 *
 * Safe lane is bottom for Radiant and top for Dire; offlane is the opposite.
 * Uses `lane` (physical location), not `lane_role` (team-relative lane category).
 * Jungle players and lanes with more than two non-roaming players are not assigned.
 *
 * @param players Full match roster. Reads `isRadiant`, `lane`, `is_roaming`,
 * and `lh_t[10]` (last hits at 10:00, not ten seconds).
 * @param isRadiant Team to classify: `true` for Radiant, `false` for Dire.
 * @returns A partial map of `carry`, `midlane`, `offlane`, `softSupport`, and
 * `hardSupport` to players. Missing keys mean the role could not be determined.
 * @see PhysicalLane
 * @see test/fixtures/matches/matchid.9048930795.api-response.transformed.json
 * @example
 * Input: Radiant bottom-lane teammates with 50 and 5 last hits at minute 10.
 * ```ts
 * getLaningRoles([higherFarmPlayer, lowerFarmPlayer], true); // { carry: higherFarmPlayer, hardSupport: lowerFarmPlayer }
 * ```
 * @example
 * Input: one non-roaming Dire player in the physical middle lane.
 * ```ts
 * getLaningRoles([direMidPlayer], false); // { midlane: direMidPlayer }
 * ```
 * @example
 * Input: two side-lane teammates with equal last hits at minute 10.
 * ```ts
 * getLaningRoles([firstPlayer, secondPlayer], true); // {} — the core/support split is unclear.
 * ```
 */
export const getLaningRoles = (
  players: readonly MatchPlayer[],
  isRadiant: boolean,
): Partial<Record<LaneRole, MatchPlayer>> => {
  const team = players.filter(
    (player) => player.isRadiant === isRadiant && !player.is_roaming,
  );
  const midPlayers = team.filter((player) => player.lane === PhysicalLane.Middle);

  /**
   * Returns role assignments for a side lane without mutating the team or roster.
   * @param lane Physical lane to inspect within the current team.
   * @param core Role assigned to the solo player or the player with more last hits.
   * @param support Role assigned to the lower-farm member of a two-player lane.
   * @returns Role assignments, or an empty object for ambiguous lanes.
   * @example
   * With two bottom-lane teammates whose lh_t[10] values are 50 and 5:
   * ```ts
   * assignSideLane(PhysicalLane.Bottom, "carry", "hardSupport"); // { carry: higherFarmPlayer, hardSupport: lowerFarmPlayer }
   * ```
   */
  const assignSideLane = (
    lane: PhysicalLane, core: LaneRole, support: LaneRole,
  ): Partial<Record<LaneRole, MatchPlayer>> => {
    const lanePlayers = team.filter((player) => player.lane === lane);
    if (lanePlayers.length === 1) return { [core]: lanePlayers[0] };
    if (lanePlayers.length !== 2 || lanePlayers.some((player) => !Number.isFinite(player.lh_t?.[10]))) {
      return {};
    }
    const [first, second] = lanePlayers;
    if (first.lh_t[10] === second.lh_t[10]) return {};
    const [corePlayer, supportPlayer] = first.lh_t[10] > second.lh_t[10]
      ? [first, second] : [second, first];
    return { [core]: corePlayer, [support]: supportPlayer };
  };

  // Physical lanes: Radiant's safe lane is bottom (1), Dire's is top (3).
  const roles: Partial<Record<LaneRole, MatchPlayer>> = {
    ...(midPlayers.length === 1 ? { midlane: midPlayers[0] } : {}),
    ...assignSideLane(isRadiant ? PhysicalLane.Bottom : PhysicalLane.Top, "carry", "hardSupport"),
    ...assignSideLane(isRadiant ? PhysicalLane.Top : PhysicalLane.Bottom, "offlane", "softSupport"),
  };

  // A roaming support can leave a core alone in their recorded lane.
  // Infer the missing support only when there is exactly one candidate and vacancy.
  const missingSupports = (["hardSupport", "softSupport"] as const).filter(
    (role) => !roles[role],
  );
  const assignedPlayers = new Set(Object.values(roles));
  const roamers = players.filter(
    (player) =>
      player.isRadiant === isRadiant &&
      player.is_roaming &&
      !assignedPlayers.has(player),
  );
  return missingSupports.length === 1 && roamers.length === 1
    ? { ...roles, [missingSupports[0]]: roamers[0] }
    : roles;
};

/**
 * Builds display labels for inferred roles in the active language.
 * @param strings Active language dictionary.
 * @returns A localized label for each supported role.
 * @example
 * ```ts
 * getRoleLabels(englishStrings); // { carry: "Carry", midlane: "Midlane", offlane: "Offlane", softSupport: "Soft Support", hardSupport: "Hard Support" }
 * ```
 */
export const getRoleLabels = (strings: Strings): Record<LaneRole, string> => ({
  carry: strings.laning_carry,
  midlane: strings.laning_midlane,
  offlane: strings.laning_offlane,
  softSupport: strings.laning_softSupport,
  hardSupport: strings.laning_hardSupport,
});

/** Match player with optional parsed laning statistics. */
export type StatPlayer = MatchPlayer & {
  dn_t?: number[];
  lane_efficiency?: number;
  line_win?: boolean;
};
/** Per-minute player histories supported by the stat helpers. */
export type HistoryField = "gold_t" | "xp_t" | "lh_t" | "dn_t";

/**
 * Reads a finite value without replacing absent data with zero.
 * @param player Player with minute-indexed gold_t/xp_t/lh_t/dn_t arrays, if available.
 * Unlike the optional times array, whose values are seconds, these arrays use minute indexes.
 * @param field Per-minute history to read.
 * @param minute Zero-based minute index; defaults to 10.
 * @returns The recorded value, or null when missing or non-finite.
 * @example
 * Input player has gold_t: [59, 272, 436].
 * ```ts
 * getStatAtMinute(player, "gold_t", 2); // 436
 * getStatAtMinute(undefined, "gold_t", 2); // null
 * ```
 */
export const getStatAtMinute = (
  player: StatPlayer | undefined,
  field: HistoryField,
  minute = 10,
): number | null => {
  const value = player?.[field]?.[minute];
  return typeof value === "number" && Number.isFinite(value) ? value : null;
};

/**
 * Converts a player's recorded XP to a hero level.
 * @param player Player with a cumulative xp_t history indexed by minute, if available.
 * @param minute Zero-based minute index; defaults to 10.
 * @returns The calculated level, or null when XP is unavailable.
 * @example
 * Input player has xp_t: [0, 2601].
 * ```ts
 * getLevelAtMinute(player, 1); // 6
 * ```
 */
export const getLevelAtMinute = (player: MatchPlayer | undefined, minute = 10) => {
  const xp = getStatAtMinute(player, "xp_t", minute);
  return xp === null ? null : getHeroLevel(xp);
};

/**
 * Formats a statistic consistently across comparison layouts.
 * @param value Numeric statistic, or an unavailable value.
 * @returns An English-formatted number with grouping separators, or an em dash.
 * @example
 * ```ts
 * formatStat(1234); // "1,234"
 * formatStat(null); // "—"
 * ```
 */
export const formatStat = (value: number | null | undefined): string =>
  typeof value === "number" && Number.isFinite(value) ? value.toLocaleString("en-US") : "—";

/**
 * Sums a complete team's gold without treating missing or negative values as zero.
 * Does not modify the roster or its player histories.
 * @param players Full roster with isRadiant and minute-indexed gold_t histories.
 * The fixture contains Radiant slots 0–4 and Dire slots 128–132; use isRadiant,
 * not array position, to determine each player's team.
 * @param isRadiant True for Radiant, false for Dire.
 * @param minute Zero-based minute index to compare.
 * @returns Total gold, or null unless five teammates have valid nonnegative values.
 * @example
 * Input: five Radiant players, each with gold_t: [100].
 * ```ts
 * getTeamGold(players, true, 0); // 500
 * getTeamGold([], true, 0); // null
 * ```
 */
export const getTeamGold = (players: readonly MatchPlayer[], isRadiant: boolean, minute: number): number | null => {
  const values = players.filter((player) => player.isRadiant === isRadiant)
    .map((player) => getStatAtMinute(player, "gold_t", minute));
  return values.length === 5 && values.every((value) => value !== null && value >= 0)
    ? values.reduce<number>((sum, value) => sum + value!, 0) : null;
};

/**
 * Resolves player and hero names without changing the supplied match record.
 * @param player Player containing hero_id and optional display names.
 * @param strings Active language dictionary supplying fallback names.
 * @returns Player name, hero name, and optional hero icon path.
 * @example
 * Input player has hero_id: 1, name: "", personaname: "Mark".
 * ```ts
 * getPlayerIdentity(player, englishStrings); // { playerName: "Mark", heroName: "Anti-Mage", icon: "/apps/dota2/images/dota_react/heroes/icons/antimage.png?" }
 * ```
 */
export const getPlayerIdentity = (player: MatchPlayer, strings: Strings) => {
  const hero = heroes[player.hero_id];
  return {
    playerName: player.name || player.personaname || strings.general_anonymous,
    heroName: hero?.localized_name ?? strings.general_no_hero,
    icon: hero?.icon,
  };
};

export type GraphMetric = "networth" | "levels";
export type GraphGrouping = "role" | "lane";
export type RoleSelection = LaneRole | "all" | "unknown";
export type GraphPoint = { time: string } & Record<string, string | number | undefined>;

const knownLanes = [PhysicalLane.Bottom, PhysicalLane.Middle, PhysicalLane.Top, PhysicalLane.Jungle];

/**
 * Infers both teams’ roles and indexes them by player slot.
 * @param players Full roster with player_slot, isRadiant, physical lane, is_roaming,
 * and lh_t[10]. Physical lanes are bottom=1, mid=2, top=3, jungle=4.
 * player_slot identifies the player, not their inferred role.
 * @returns Assigned roles only; an absent slot represents an undetermined role.
 * @example
 * Input: one identifiable Radiant midlaner with player_slot: 2.
 * ```ts
 * getPlayerRoles([midPlayer]); // Map { 2 => "midlane" }
 * ```
 */
export const getPlayerRoles = (players: MatchPlayer[]) => {
  const assignments = [true, false].flatMap((isRadiant) => {
    const roles = getLaningRoles(players, isRadiant);
    return (Object.keys(roles) as LaneRole[]).flatMap((role) => {
      const player = roles[role];
      return player ? [[player.player_slot, role] as const] : [];
    });
  });
  return new Map(assignments);
};

/**
 * Selects players for the active role or physical-lane filter without mutating the roster.
 * @param players Full roster to filter.
 * @param playerRoles Inferred roles indexed by player slot.
 * @param groupBy Whether to interpret the lane or role selection.
 * @param lane Physical lane number as a string, "all", or "unknown".
 * @param role Role key, "all", or "unknown".
 * @returns Matching players in their original order.
 * @example
 * Input roles: Map { 0 => "carry", 128 => "carry" }.
 * ```ts
 * filterGraphPlayers([radiantCarry, direCarry], roles, "role", "all", "carry"); // [radiantCarry, direCarry]
 * filterGraphPlayers([radiantCarry], roles, "role", "all", "midlane"); // []
 * ```
 */
export const filterGraphPlayers = (
  players: MatchPlayer[], playerRoles: ReadonlyMap<number, LaneRole>,
  groupBy: GraphGrouping, lane: string, role: RoleSelection,
) => players.filter((player) => {
  if(groupBy === "lane") {
    return lane === "all" || (lane === "unknown"
      ? !knownLanes.includes(player.lane) : player.lane === Number(lane));
  }
  return role === "all" || (role === "unknown"
    ? !playerRoles.has(player.player_slot) : playerRoles.get(player.player_slot) === role);
});

/**
 * Builds chart points from per-minute gold or XP histories.
 * @param match Match with duration in seconds and players carrying minute-indexed
 * gold_t/xp_t histories. The fixture has duration 1900 and 32 available samples.
 * @param players Visible roster subset with hero_id and gold_t/xp_t histories.
 * @param metric Selects gold values or levels converted from XP.
 * @param maxMinute Inclusive final minute, defaulting to ten.
 * @returns Time labels and hero-name series, bounded by available history and duration.
 * @see test/fixtures/matches/matchid.9048930795.api-response.transformed.json
 * @example
 * Input match: duration 60; one hero_id: 1 player with gold_t: [100, 200].
 * ```ts
 * buildGraphData(match, match.players, "networth", 1); // [{ time: "0:00", "Anti-Mage": 100 }, { time: "1:00", "Anti-Mage": 200 }]
 * ```
 */
export const buildGraphData = (match: Match, players: MatchPlayer[], metric: GraphMetric, maxMinute = 10): GraphPoint[] => {
  const field = metric === "networth" ? "gold_t" : "xp_t";
  const sampleCount = Math.max(0, ...match.players.map((player) => player[field]?.length ?? 0));
  const length = Math.min(sampleCount, maxMinute + 1, Math.floor(match.duration / 60) + 1);
  return Array.from({ length }, (_, minute) => {
    const series = players.map((player) => {
      const hero = heroes[player.hero_id];
      const value = player[field]?.[minute];
      return [hero?.localized_name, metric === "levels" && Number.isFinite(value)
        ? getHeroLevel(value) : value];
    });
    return { time: `${minute}:00`, ...Object.fromEntries(series) };
  });
};

/** Softer versions of Dota player-slot colors, shared by segments and legend markers. */
const playerColors: Readonly<Record<number, string>> = {
  0: "#5386D9", 1: "#70C9AB", 2: "#B269BA", 3: "#D8C65A", 4: "#D58B4B",
  128: "#D58FAF", 129: "#A1B263", 130: "#73BDD0", 131: "#57986C", 132: "#B38A52",
};

/**
 * Builds one team's net worth distribution without modifying players or their histories.
 * @param players Full match roster.
 * @param isRadiant Which team to include.
 * @param minute Minute index used for all totals and percentages.
 * @returns A nullable team total and descending shares; missing or zero totals have no shares.
 * @example
 * Input: five Radiant players, slots 0–4, each with gold_t: [100].
 * ```ts
 * getNetWorthShares(players, true, 0); // { total: 500, shares: [ { player: players[0], slot: 0, value: 100, percentage: 20, color: "#5386D9" }, ...four more 20% entries in slot order ] }
 * getNetWorthShares([], true, 0); // { total: null, shares: [] }
 * ```
 */
export const getNetWorthShares = (players: readonly MatchPlayer[], isRadiant: boolean, minute: number) => {
  const total = getTeamGold(players, isRadiant, minute);
  const shares = total === null || total <= 0 ? [] : players
    .filter((player) => player.isRadiant === isRadiant)
    .map((player) => ({
      player,
      slot: player.player_slot,
      value: player.gold_t[minute],
      percentage: player.gold_t[minute] / total * 100,
      color: playerColors[player.player_slot] ?? "#94A3B8",
    }))
    .sort((first, second) => second.value - first.value || first.slot - second.slot);
  return { total, shares };
};

/**
 * Checks whether a graph has usable data before its surrounding card is rendered.
 * Difference charts require gold and XP values at the same minute; player charts
 * need at least one finite value from any player within the requested time window.
 * @param match Match with duration in seconds, player minute histories, and optional
 * radiant_gold_adv/radiant_xp_adv arrays. Histories are indexed by minute, not seconds.
 * The sample fixture has duration 1900 and 32 entries (minutes 0–31).
 * @param type Graph type, such as "networth", "levels", or "difference".
 * @param maxMinute Inclusive final minute; defaults to the full match duration.
 * @returns True when at least one usable chart point exists.
 * @see test/fixtures/matches/matchid.9048930795.api-response.transformed.json
 * @example
 * Input match has duration: 60 and a player with gold_t: [100, 200].
 * ```ts
 * hasGraphData(match, "networth", 1); // true
 * hasGraphData({ ...match, players: [] }, "networth", 1); // false
 * ```
 */
export const hasGraphData = (match: Match, type: string, maxMinute = Math.floor(match.duration / 60)) => {
  const sampleLimit = Math.min(maxMinute, Math.floor(match.duration / 60)) + 1;
  /**
   * Checks the current window for a finite value, including zero.
   * @param values Minute-indexed values to inspect.
   * @returns Whether the array contains at least one usable value in the window.
   * @example
   * ```ts
   * hasSample([NaN, 0]); // true (with a two-minute window)
   * hasSample([]); // false
   * ```
   */
  const hasSample = (values?: number[]) =>
    Array.isArray(values) && values.slice(0, sampleLimit).some(Number.isFinite);

  if (type === "difference") {
    return match.radiant_gold_adv?.some((gold, minute) => minute < sampleLimit &&
      Number.isFinite(gold) && Number.isFinite(match.radiant_xp_adv?.[minute]),
    ) ?? false;
  }

  const field = `${type === "levels" ? "xp" : type === "networth" ? "gold" : type}_t` as keyof MatchPlayer;
  return match.players?.some((player) => hasSample(player[field])) ?? false;
};
