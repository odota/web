const queryTemplate = (props) => {
  const {
    select,
    group = select && select.groupValue ? { value: select.groupKey, groupKeySelect: select.groupKeySelect, alias: select.alias } : null,
    patch,
    hero,
    player,
    league,
    playerPurchased,
    duration,
    side,
    result,
    team,
    lanePos,
    region,
    minDate,
    maxDate,
  } = props;
  let query;
  if (select && select.template === 'picks_bans') {
    query = `SELECT
hero_id, 
count(1) total,
sum(case WHEN is_pick IS TRUE THEN 1 ELSE 0 END) picks, 
sum(case WHEN is_pick IS FALSE THEN 1 ELSE 0 END) bans,
sum(case WHEN radiant = radiant_win THEN 1 ELSE 0 END)::float/count(1) winrate
FROM picks_bans
JOIN matches using(match_id)
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN team_match using(match_id)
WHERE TRUE
${select && select.where ? select.where : ''}
${team ? `AND team_id = ${team.value}` : ''}
${patch ? `AND match_patch.patch = '${patch.value}'` : ''}
${league ? `AND matches.leagueid = ${league.value}` : ''}
${duration ? `AND matches.duration > ${duration.value}` : ''}
${side ? `AND team_match.radiant = ${side.value}` : ''}
${result ? `AND (team_match.radiant = matches.radiant_win) = ${result.value}` : ''}
${region ? `AND matches.cluster IN (${region.value.join(',')})` : ''}
${minDate ? `AND matches.start_time >= ${Math.round(new Date(minDate.value) / 1000)}` : ''}
${maxDate ? `AND matches.start_time <= ${Math.round(new Date(maxDate.value) / 1000)}` : ''}
GROUP BY hero_id
ORDER BY total DESC`;
  } else {
    query = `SELECT
${(group) ?
[`${group.groupKeySelect || group.value} ${group.alias || ''}`,
  `round(sum(${(select || {}).groupValue || (select || {}).value || 1})::numeric/count(${(select || {}).avgCountValue || 'distinct matches.match_id'}), 2) avg`,
  'count(distinct matches.match_id) count',
  'sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1) winrate',
  `sum(${(select || {}).groupValue || (select || {}).value || 1}) sum`,
  `min(${(select || {}).groupValue || (select || {}).value || 1}) min`,
  `max(${(select || {}).groupValue || (select || {}).value || 1}) max`,
  `round(stddev(${(select || {}).groupValue || (select || {}).value || 1}), 2) stddev`,
].filter(Boolean).join(',\n')
:
[select ? `${select.value} ${select.alias || ''}` : '',
  'matches.match_id',
  'matches.start_time',
  '((player_matches.player_slot < 128) = matches.radiant_win) win',
  'player_matches.hero_id',
  'player_matches.account_id',
  'leagues.name leaguename',
].filter(Boolean).join(',\n')}
FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
LEFT JOIN notable_players using(account_id)
LEFT JOIN teams using(team_id)
JOIN heroes ON player_matches.hero_id = heroes.id
${(select && select.join) ? select.join : ''}
${(select && select.joinFn) ? select.joinFn(props) : ''}
WHERE TRUE
${select ? `AND ${select.value} IS NOT NULL` : ''}
${patch ? `AND match_patch.patch = '${patch.value}'` : ''}
${hero ? `AND player_matches.hero_id = ${hero.value}` : ''}
${player ? `AND player_matches.account_id = ${player.value}` : ''}
${league ? `AND matches.leagueid = ${league.value}` : ''}
${playerPurchased ? `AND (player_matches.purchase->>'${playerPurchased.value}')::int > 0` : ''}
${duration ? `AND matches.duration > ${duration.value}` : ''}
${side ? `AND (player_matches.player_slot < 128) = ${side.value}` : ''}
${result ? `AND ((player_matches.player_slot < 128) = matches.radiant_win) = ${result.value}` : ''}
${team ? `AND notable_players.team_id = ${team.value}` : ''}
${lanePos ? `AND player_matches.lane_pos = ${lanePos.value}` : ''}
${region ? `AND matches.cluster IN (${region.value.join(',')})` : ''}
${minDate ? `AND matches.start_time >= ${Math.round(new Date(minDate.value) / 1000)}` : ''}
${maxDate ? `AND matches.start_time <= ${Math.round(new Date(maxDate.value) / 1000)}` : ''}
${group ? `GROUP BY ${group.value}` : ''}
${group ? 'HAVING count(distinct matches.match_id) > 0' : ''}
ORDER BY ${
[`${group ? 'avg' : (select && select.value) || 'matches.match_id'} ${(select && select.order) || 'DESC'}`,
  group ? 'count DESC' : '',
].filter(Boolean).join(',')} NULLS LAST
LIMIT 200`;
  }
  return query
  // Remove extra newlines
  .replace(/\n{2,}/g, '\n');
};

export default queryTemplate;
