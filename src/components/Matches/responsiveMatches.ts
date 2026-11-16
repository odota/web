import { heroes } from "dotaconstants";

export type MatchSide = "radiant" | "dire";
export type DraftPlayer = Readonly<{ hero_id: number; player_slot: number }>;

/**
 * Selects valid picks in slot order without changing the supplied lineup.
 * @example
 * getTeamPicks([
 *   { hero_id: 2, player_slot: 4 },
 *   { hero_id: 3, player_slot: 128 },
 *   { hero_id: 1, player_slot: 0 },
 * ], "radiant");
 * // Returns [{ hero_id: 1, player_slot: 0 }, { hero_id: 2, player_slot: 4 }].
 */
export function getTeamPicks(players: readonly DraftPlayer[], side: MatchSide) {
  return players
    .filter((player) =>
      Number.isInteger(player.player_slot)
      && (player.player_slot < 128) === (side === "radiant")
      && heroes[String(player.hero_id) as keyof Heroes])
    .sort((a, b) => a.player_slot - b.player_slot);
}

const PAGE_SIZE = 20;

/**
 * Derives a clamped page and its display bounds without changing the source.
 * @example
 * const matches = Array.from({ length: 25 }, (_, index) => index + 1);
 * getPage(matches, 1);
 * // Returns {
 * //   items: [21, 22, 23, 24, 25],
 * //   pages: 2,
 * //   currentPage: 1,
 * //   start: 21,
 * //   end: 25,
 * // }.
 */
export function getPage<T>(data: readonly T[], page: number) {
  const pages = Math.ceil(data.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(0, pages - 1));
  const offset = currentPage * PAGE_SIZE;
  const end = Math.min(offset + PAGE_SIZE, data.length);
  return {
    items: data.slice(offset, end),
    pages,
    currentPage,
    start: data.length ? offset + 1 : 0,
    end,
  };
}

/**
 * Optional match metadata supplied by list or detail responses.
 * @example
 * const metadata: MatchMetadata = {
 *   region: 5,
 *   cluster: 151,
 *   lobby_type: 7,
 *   game_mode: 22,
 * };
 */
export type MatchMetadata = Readonly<{
  region?: number;
  cluster?: number;
  lobby_type?: number;
  game_mode?: number;
}>;

