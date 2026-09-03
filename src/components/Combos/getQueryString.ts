const getQueryString = (teamA: number[], teamB: number[]) => {
  const heroes = [...teamA, ...teamB];

  // "every one of these heroes is on this side"
  const onSide = (team: number[], radiant: boolean) =>
    team.length
      ? `count(*) FILTER (WHERE hero_id IN (${team}) AND player_slot ${radiant ? "<" : ">="} 128) = ${team.length}`
      : "true";

  // The results table expects the picked heroes in fixed positions: team A ends
  // with them in reverse pick order, team B starts with them in pick order
  const layout = (team: number[], pickedFirst: boolean) =>
    team.length
      ? ` ORDER BY array_position(ARRAY[${team}], pm.hero_id) ${pickedFirst ? "ASC NULLS LAST" : "DESC NULLS FIRST"}`
      : "";

  // Find the matches with one pass over the picked heroes, then read the rest
  // of the data for the few that survive. Joining player_matches once per slot
  // instead makes postgres build enormous intermediate results and time out.
  return `WITH candidates AS (
    SELECT match_id,
           ${teamA.length ? onSide(teamA, true) : `NOT (${onSide(teamB, true)})`} AS a_on_radiant
    FROM player_matches
    WHERE hero_id IN (${heroes})
    GROUP BY match_id
    HAVING (${onSide(teamA, true)} AND ${onSide(teamB, false)})
        OR (${onSide(teamA, false)} AND ${onSide(teamB, true)})
  )
  SELECT m.match_id, m.start_time,
         (c.a_on_radiant = m.radiant_win) team_a_win,
         array_agg(pm.hero_id${layout(teamA, false)})
           FILTER (WHERE (pm.player_slot < 128) = c.a_on_radiant) team_a_composition,
         array_agg(pm.hero_id${layout(teamB, true)})
           FILTER (WHERE (pm.player_slot < 128) <> c.a_on_radiant) team_b_composition
  FROM candidates c
  JOIN matches m USING (match_id)
  JOIN player_matches pm USING (match_id)
  GROUP BY m.match_id, m.start_time, c.a_on_radiant
  ORDER BY m.start_time DESC LIMIT 500`;
};

export default getQueryString;
