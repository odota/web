const queryTemplate = ({ select, group, patch, hero, player, league, item }) => `
SELECT ${[
  group ? group.value : '',
  (group && select) ? `
round(avg(${select.value}), 2) avg, 
count(${select.value}) count, 
sum(${select.value}) sum,
sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(${select.value}) winrate`
: `
match_id,
notable_players.name,
${select && select.value} ${(select && select.alias) || ''}`,
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
WHERE TRUE
${patch ? `AND patch = '${patch.value}'` : ''}
${hero ? `AND hero_id = ${hero.value}` : ''}
${player ? `AND account_id = ${player.value}` : ''}
${league ? `AND leagueid = ${league.value}` : ''}
${item ? `AND (player_matches.purchase->>'${item.value}')::int > 0` : ''}
${group ? `GROUP BY ${group.value}` : ''}
${group ? `HAVING count(${select.value}) > 1` : ''}
ORDER BY ${group ? 'avg' : select && select.value} DESC NULLS LAST
LIMIT 500
`;

export default queryTemplate;
