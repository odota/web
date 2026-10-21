/**
 * @file series.ts
 * @description Defines professional match types and groups league matches into chronologically ordered series.
 * @remarks Scores follow team identity across Radiant/Dire swaps. Matches without a series ID remain separate.
 */

export type ProfessionalMatch = {
  match_id: number;
  series_id?: number | null;
  series_type?: number | null;
  leagueid: number;
  league_name: string;
  start_time: number;
  duration: number;
  radiant_team_id?: number | null;
  dire_team_id?: number | null;
  radiant_name: string | null;
  dire_name: string | null;
  radiant_win: boolean | null;
};

/**
 * Groups matches by league and series ID and calculates scores across side swaps.
 * @param matches Available professional match records; matches lacking a valid series ID remain separate.
 * @returns Series ordered by latest game end time, with games ordered chronologically.
 * @example
 * const series = groupMatchesBySeries([game1, game2]);
 * // If both games share leagueid and series_id, returns one series with
 * // games: [game1, game2] ordered by start time, and wins credited by team ID.
 * groupMatchesBySeries([]); // []
 */
export const groupMatchesBySeries = (matches: ProfessionalMatch[]) => {
  const groups = new Map<string, ProfessionalMatch[]>();
  matches.forEach((match) => {
    const key = match.series_id && match.series_id > 0
      ? `${match.leagueid}:${match.series_id}`
      : `match:${match.match_id}`;
    const group = groups.get(key) || [];
    group.push(match);
    groups.set(key, group);
  });

  return Array.from(groups, ([key, games]) => {
    const orderedGames = [...games].sort((a, b) => a.start_time - b.start_time || a.match_id - b.match_id);
    const first = orderedGames[0];
    /**
     * Builds a side-independent team identifier for score attribution.
     * @param id Team ID when available.
     * @param name Fallback team name when no ID is provided.
     * @returns A team identifier prefixed by its source.
     * @example
     * teamKey(8965331, "Chandogs"); // "id:8965331"
     * teamKey(null, "Chandogs"); // "name:Chandogs"
     */
    const teamKey = (id: number | null | undefined, name: string | null) =>
      id ? `id:${id}` : `name:${name}`;
    const team1Key = teamKey(first.radiant_team_id, first.radiant_name);
    let team1Wins = 0;
    let team2Wins = 0;
    orderedGames.forEach((game) => {
      if (typeof game.radiant_win !== "boolean") return;
      const winner = game.radiant_win
        ? teamKey(game.radiant_team_id, game.radiant_name)
        : teamKey(game.dire_team_id, game.dire_name);
      if (winner === team1Key) team1Wins += 1;
      else team2Wins += 1;
    });
    return {
      key,
      leagueid: first.leagueid,
      series_id: first.series_id,
      series_type: first.series_type,
      first_match_time: first.start_time,
      league_name: first.league_name,
      start_time: Math.max(...games.map((game) => game.start_time + game.duration)),
      team1Id: first.radiant_team_id,
      team2Id: first.dire_team_id,
      team1: first.radiant_name,
      team2: first.dire_name,
      team1Wins,
      team2Wins,
      games: orderedGames,
    };
  }).sort((a, b) => b.start_time - a.start_time);
};

export type MatchSeries = ReturnType<typeof groupMatchesBySeries>[number];
