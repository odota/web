const queryTemplate = ({
  select,
  group = select && select.groupValue ? { value: select.groupKey, alias: select.alias } : null,
  patch,
  hero,
  player,
  league,
  playerPurchased,
  duration,
  side,
}) => `SELECT ${[
  group ? `${group.value} ${group.alias || ''}` : '',
  (group && select) ? `
round(sum(${select.groupValue || select.value})::numeric/count(distinct matches.match_id), 2) avg, 
count(distinct matches.match_id) count, 
sum(${select.groupValue || select.value}) sum
${select.groupValue ? '' : ', sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1) winrate'}`
:
`
${select ? `${select.value} ${select.alias || ''},` : ''}
matches.match_id,
player_matches.hero_id,
notable_players.name playername,
leagues.name leaguename`,
].filter(Boolean).join(',')}
FROM player_matches
LEFT JOIN notable_players
USING(account_id)
JOIN matches
USING(match_id)
JOIN match_patch
USING (match_id)
JOIN heroes
ON player_matches.hero_id = heroes.id
JOIN leagues
USING(leagueid)
${(select && select.join) ? select.join : ''}
WHERE TRUE
${select ? `AND ${select.value} IS NOT NULL` : ''}
${patch ? `AND patch = '${patch.value}'` : ''}
${hero ? `AND player_matches.hero_id = ${hero.value}` : ''}
${player ? `AND account_id = ${player.value}` : ''}
${league ? `AND leagueid = ${league.value}` : ''}
${playerPurchased ? `AND (player_matches.purchase->>'${playerPurchased.value}')::int > 0` : ''}
${duration ? `AND duration > ${duration.value}` : ''}
${side ? `AND (player_matches.player_slot < 128) = ${side.value}` : ''}
${group ? `GROUP BY ${group.value}` : ''}
${group ? 'HAVING count(distinct matches.match_id) > 1' : ''}
ORDER BY ${group ? 'avg' : (select && select.value) || 'matches.match_id'} ${(select && select.order) || 'DESC'} NULLS LAST
LIMIT 150`;

export default queryTemplate;
