function templ(strings, value) {
  // console.log(value)
  const o = value.map(x => x.value);
  let r = [];
  if (!value.length) {
    return '';
  }
  const str0 = strings[0];
  const str1 = strings[1];
  if (value instanceof Array) {
    r = o.map((s, index) => {
      const p = `${str0}${s}${str1}`;
      if (index !== o.length - 1) {
        return `${p} OR `;
      }
      return `${p}`;
    });
  } else {
    return `${str0}${o}${str1}`;
  }
  return `AND (${r.join('')})`;
}

const queryTemplate = (props) => {
  const {
    select,
    group = select && select.groupValue ? { value: select.groupKey, groupKeySelect: select.groupKeySelect, alias: select.alias } : null,
    minPatch,
    maxPatch,
    hero,
    player,
    league,
    playerPurchased,
    minDuration,
    maxDuration,
    side,
    result,
    team,
    organization,
    laneRole,
    region,
    minDate,
    maxDate,
    order,
    tier,
    having,
    limit,
    isTi7Team,
  } = props;
  // array inputs
  // group
  // hero
  // player
  // league
  // team
  // organization
  let query;
  console.log(props);
  if (select && select.template === 'picks_bans') {
    query = `SELECT
hero_id, 
count(1) total,
sum(is_pick::int) picks, 
sum((NOT is_pick)::int) bans,
sum((is_pick IS TRUE AND ord < 8)::int) first_pick, 
sum((is_pick IS FALSE AND ord < 8)::int) first_ban,
sum((is_pick IS TRUE AND ord >= 8 AND ord < 16)::int) second_pick, 
sum((is_pick IS FALSE AND ord >= 8 AND ord < 16)::int) second_ban,
sum((is_pick IS TRUE AND ord >= 16)::int) third_pick, 
sum((is_pick IS FALSE AND ord >= 16)::int) third_ban,
sum((radiant = radiant_win)::int)::float/count(1) winrate,
sum((radiant = radiant_win AND is_pick IS TRUE)::int)::float/NULLIF(sum(is_pick::int), 0) pick_winrate,
sum((radiant = radiant_win AND is_pick IS FALSE)::int)::float/NULLIF(sum((NOT is_pick)::int), 0) ban_winrate
FROM picks_bans
JOIN matches using(match_id)
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN team_match using(match_id)
JOIN teams using(team_id)
WHERE TRUE
${select && select.where ? select.where : ''}
${organization ? `AND team_id = ${organization.value}` : ''}
${minPatch ? `AND match_patch.patch >= '${minPatch.value}'` : ''}
${maxPatch ? `AND match_patch.patch <= '${maxPatch.value}'` : ''}
${league ? `AND matches.leagueid = ${league.value}` : ''}
${minDuration ? `AND matches.duration >= ${minDuration.value}` : ''}
${maxDuration ? `AND matches.duration <= ${maxDuration.value}` : ''}
${side ? `AND team_match.radiant = ${side.value}` : ''}
${result ? `AND (team_match.radiant = matches.radiant_win) = ${result.value}` : ''}
${region ? `AND matches.cluster IN (${region.value.join(',')})` : ''}
${minDate ? `AND matches.start_time >= extract(epoch from timestamp '${new Date(minDate.value).toISOString()}')` : ''}
${maxDate ? `AND matches.start_time <= extract(epoch from timestamp '${new Date(maxDate.value).toISOString()}')` : ''}
${tier ? `AND leagues.tier = '${tier.value}'` : ''}
${isTi7Team ? 'AND teams.team_id IN (5, 15, 39, 46, 2163, 350190, 1375614, 1838315, 1883502, 2108395, 2512249, 2581813, 2586976, 2640025, 2672298, 1333179, 3331948, 1846548)' : ''}
GROUP BY hero_id
ORDER BY total ${(order && order.value) || 'DESC'}`;
  } else {
    const selectVal = {};
    const groupVal = {};
    // const selectVal = (select && select.groupValue) || (select && select.value) || 1;
    group && group.forEach(x => groupVal[x.key] = `${x.value}${x.bucket ? ` / ${x.bucket} * ${x.bucket}` : ''}`);
    select && select.forEach(x => selectVal[x.key] = x.groupValue || (x && x.value) || 1);
    // console.log(selectVal)
    console.log(group);
    console.log(props);
    console.log(select);
    query = `SELECT
    ${select ? select.map(x => (x.distinct && !group ? `DISTINCT ON (${x.value})` : '')).join('') : ''}

    


${(group) ?
    group.map((x) =>
      [`${x.groupKeySelect || groupVal[x.key]} ${x.alias || ''},`].filter(Boolean).join(',\n')).join('')

    : ''}

${(group) ?
    select ? select.map((x, i) =>
      [
        (x && x.countValue) || '',
        (x && x.avgPerMatch) ? `sum(${selectVal[x.key]})::numeric/count(distinct matches.match_id) avg` : `${x && x.avg ? x.avg : `avg(${selectVal[x.key]})`} AS "avg ${selectVal[x.key]}"`,
        'count(distinct matches.match_id) count',
        'sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1) winrate',
        `((sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1)) 
+ 1.96 * 1.96 / (2 * count(1)) 
- 1.96 * sqrt((((sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1)) * (1 - (sum(case when (player_matches.player_slot < 128) = radiant_win then 1 else 0 end)::float/count(1))) + 1.96 * 1.96 / (4 * count(1))) / count(1))))
/ (1 + 1.96 * 1.96 / count(1)) winrate_wilson`,
        `sum(${selectVal[x.key]}) sum`,
        `min(${selectVal[x.key]}) min`,
        `max(${selectVal[x.key]}) max`,
        `stddev(${selectVal[x.key]}::numeric) stddev
  `,
      ].filter(Boolean).join(',\n')) : ''.join('') : ''}


${(!group && select) ?
    [select ? select.map(x => `${x.value} AS ${x.alias || ''}`) : '',
      'matches.match_id',
      'matches.start_time',
      '((player_matches.player_slot < 128) = matches.radiant_win) win',
      'player_matches.hero_id',
      'player_matches.account_id',
      'leagues.name leaguename',
    ].filter(Boolean).join(',\n') : ''}





FROM matches
JOIN match_patch using(match_id)
JOIN leagues using(leagueid)
JOIN player_matches using(match_id)
JOIN heroes on heroes.id = player_matches.hero_id
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id AND notable_players.locked_until = (SELECT MAX(locked_until) FROM notable_players)
LEFT JOIN teams using(team_id)

${organization || (group && group.some(x => x.key === 'organization')) ?
    'JOIN team_match ON matches.match_id = team_match.match_id AND (player_matches.player_slot < 128) = team_match.radiant JOIN teams teams2 ON team_match.team_id = teams2.team_id' : ''}

${select ? select.map(x => (x.join ? x.join : '')).join('') : ''}
${select ? select.map(x => (x.joinFn ? x.joinFn(props) : '')).join('') : ''}

WHERE TRUE
${select ? select.map(x => `AND ${x.value} IS NOT NULL `).join('') : ''}
${minPatch ? templ`match_patch.patch >= '${maxPatch}'` : ''}
${maxPatch ? templ`match_patch.patch <= '${maxPatch}'` : ''}
${hero ? templ`player_matches.hero_id = ${hero}` : ''}
${player ? templ`player_matches.account_id = ${player}` : ''}
${league ? templ`matches.leagueid = ${league}` : ''}
${playerPurchased ? templ`(player_matches.purchase->>'${playerPurchased}')::int > 0` : ''}
${minDuration ? templ`matches.duration >= ${minDuration}` : ''}
${maxDuration ? templ`matches.duration <= ${maxDuration}` : ''}
${side ? templ`(player_matches.player_slot < 128) = ${side}` : ''}
${result ? templ`((player_matches.player_slot < 128) = matches.radiant_win) = ${result}` : ''}
${team ? templ`notable_players.team_id = ${team}` : ''}
${organization ? templ`team_match.team_id = ${organization} AND (player_matches.player_slot < 128) = team_match.radiant` : ''}
${laneRole ? templ`player_matches.lane_role = ${laneRole}` : ''}
${region ? templ`matches.cluster IN (${region})` : ''}
${minDate ? templ`matches.start_time >= extract(epoch from timestamp '${new Date(minDate).toISOString()}')` : ''}
${maxDate ? templ`matches.start_time <= extract(epoch from timestamp '${new Date(maxDate).toISOString()}')` : ''}
${tier ? templ`leagues.tier = '${tier}'` : ''}
${isTi7Team ? 'AND teams.team_id IN (5, 15, 39, 46, 2163, 350190, 1375614, 1838315, 1883502, 2108395, 2512249, 2581813, 2586976, 2640025, 2672298, 1333179, 3331948, 1846548)' : ''}
${group && group.length > 0 ? 'GROUP BY' : ''}${group && group.map(x => ` ${groupVal[x.key]}`) || ''}
${group ? `HAVING count(distinct matches.match_id) >= ${having ? having.value : '1'}` : ''}




LIMIT ${limit ? limit.map(x => x.value).join('') : 200}`;
  }
  return query
  // Remove extra newlines
    .replace(/\n{2,}/g, '\n');
};


export default queryTemplate;
// ${(select && select.join) ? select.join : ''}
// ${(select && select.joinFn) ? select.joinFn(props) : ''}
