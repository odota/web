const queryTemplate = ({
  select,
  group = select && select.groupValue ? { value: select.groupKey, alias: select.alias } : null,
  patch,
  hero,
  player,
  league,
  item,
  duration,
}) => `SELECT ${[
  group ? `${group.value} ${group.alias || ''}` : '',
  (group && select) ? `
round(sum(${select.groupValue || select.value})::numeric/count(distinct match_id), 2) avg, 
count(distinct match_id) count, 
sum(${select.groupValue || select.value}) sum
${select.groupValue
? ''
: ',sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(distinct match_id) winrate'}`
: `
match_id,
hero_id,
notable_players.name,
${select ? `${select.value} ${select.alias || ''}` : ''}`,
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
${(select && select.cartesian) || (group && group.cartesian) ? `, ${select.cartesian || group.cartesian}` : ''}
WHERE TRUE
${select ? `AND ${select.value} IS NOT NULL` : ''}
${patch ? `AND patch = '${patch.value}'` : ''}
${hero ? `AND hero_id = ${hero.value}` : ''}
${player ? `AND account_id = ${player.value}` : ''}
${league ? `AND leagueid = ${league.value}` : ''}
${item ? `AND (player_matches.purchase->>'${item.value}')::int > 0` : ''}
${duration ? `AND duration > ${duration.value}` : ''}
${group ? `GROUP BY ${group.value}` : ''}
${group ? `HAVING count(${select.value}) > 1` : ''}
ORDER BY ${group ? 'avg' : select && select.value} DESC NULLS LAST
LIMIT 500`;

export default queryTemplate;
