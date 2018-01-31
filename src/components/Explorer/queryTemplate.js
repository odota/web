function templ(strings, value) {
  const str0 = strings[0];
  const str1 = strings[1];
  if (Array.isArray(value)) {
    const o = value.map(x => x.value);
    const r = [];
    if (!value.length) {
      return '';
    }
    o.forEach((s) => {
      r.push(`${str0}${s}${str1}`);
    });
    return `AND (${r.join(' OR ')})`;
  }
  return `AND ${str0}${value.value || value}${str1}`;
}

function validate(p) {
  return p !== null && p !== undefined && p.length > 0 && p[0] !== null && p[0] !== undefined;
}

const queryTemplate = (props) => {
  const {
    select,
    group,
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
  let groupArray = [];
  let selectArray = [];
  console.log(props);
  if (!(Array.isArray(group))) {
    groupArray.push(group);
  } else {
    groupArray = group;
  }
  if (!(Array.isArray(select))) {
    selectArray.push(select);
  } else {
    selectArray = select;
  }
  selectArray = selectArray.filter(x => x !== undefined);
  groupArray = groupArray.filter(x => x !== undefined);
  groupArray.forEach((x) => {
    if (x.json_each) {
      selectArray.push(x);
    }
  });
  groupArray = groupArray.filter(x => !x.json_each);
  selectArray.forEach((x, index) => {
    if (x && x.groupValue) {
      const a = {
        value: x.groupKey, groupKeySelect: x.groupKeySelect, alias: x.alias, key: `key${index.toString()}`,
      };
      if (x.groupKey === 'key') {
        const p = x;
        a.value = `key${index.toString()}.key`;
        p.value = `key${index.toString()}.key`;
        p.join = `${x.join} key${index.toString()}`;
        p.groupValue = `key${index.toString()}.${x.groupValue}`;
      }
      groupArray.push(a);
    }
  });
  if (selectArray && selectArray.template === 'picks_bans') {
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
${validate(selectArray) && selectArray.where ? selectArray.where : ''}
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
    if (validate(groupArray)) {
      groupArray.forEach((x) => { groupVal[x.key] = `${x.value}${x.bucket ? ` / ${x.bucket} * ${x.bucket}` : ''}`; });
    }
    if (validate(selectArray)) {
      selectArray.forEach((x) => { selectVal[x.key] = x.groupValue || (x && x.value) || 1; });
    }
    query = `SELECT
    ${validate(selectArray) ? selectArray.map(x => (x.distinct && !validate(groupArray) ? `DISTINCT ON (${x.value})` : '')).join('') : ''}\
    ${(validate(groupArray)) ?
    groupArray.map(x =>
      [`${x.groupKeySelect || groupVal[x.key]} ${x.alias || ''},`].filter(Boolean).join(',\n')).join('') : ''}
${(validate(groupArray)) ?
    (validate(selectArray) && selectArray.map(x =>
      [
        (x && x.countValue) || '',
        (x && x.avgPerMatch) ? `sum(${selectVal[x.key]})::numeric/count(distinct matches.match_id) "AVG ${x.text}"` : `${x && x.avg ? x.avg : `avg(${selectVal[x.key]})`} "AVG ${x.text}"`,
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
      ].filter(Boolean).join(',\n'))) || '' : ''}
${!validate(groupArray) ?
    [validate(selectArray) ? selectArray.map(x => `${x.value} ${x.alias || ''}`) : '',
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
${organization || (groupArray !== null && groupArray.length > 0 && groupArray[0] && groupArray.some(x => x.key === 'organization')) ?
    'JOIN team_match ON matches.match_id = team_match.match_id AND (player_matches.player_slot < 128) = team_match.radiant JOIN teams teams2 ON team_match.team_id = teams2.team_id' : ''}
${validate(selectArray) ? selectArray.map(x => (x.joinFn ? x.joinFn(props) : '')).join('') : ''}
${validate(selectArray) ? selectArray.map(x => (x.join ? x.join : '')).join('') : ''}
WHERE TRUE
${validate(selectArray) ? selectArray.map(x => `AND ${x.value} IS NOT NULL `).join('') : ''}
${minPatch ? templ`match_patch.patch >= '${minPatch}'` : ''}
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
${minDate ? templ`matches.start_time >= extract(epoch from timestamp '${new Date(minDate.value).toISOString()}')` : ''}
${maxDate ? templ`matches.start_time <= extract(epoch from timestamp '${new Date(maxDate.value).toISOString()}')` : ''}
${tier ? templ`leagues.tier = '${tier}'` : ''}
${isTi7Team ? 'AND teams.team_id IN (5, 15, 39, 46, 2163, 350190, 1375614, 1838315, 1883502, 2108395, 2512249, 2581813, 2586976, 2640025, 2672298, 1333179, 3331948, 1846548)' : ''}
${validate(groupArray) ? 'GROUP BY' : ''}${(validate(groupArray) && groupArray.map(x => ` ${groupVal[x.key]}`)) || ''}
${validate(groupArray) ? `HAVING count(distinct matches.match_id) >= ${(having && having.value) || '1'}` : ''}
ORDER BY ${
  [`${(validate(groupArray) && validate(selectArray) && selectArray.map(x => `"AVG ${x.text}" ${validate(order) ? (Array.isArray(order) && order.length > 0 && order[0].value) || order.value : 'DESC'}`)) ||
    (validate(selectArray) && selectArray.map(x => `${x.value} ${validate(order) ? (Array.isArray(order) && order.length > 0 && order[0].value) || order.value : 'DESC'}`).join(',')) || 'matches.match_id'}`,
  validate(groupArray) ? 'count DESC' : '',
  ].filter(Boolean).join(',')} NULLS LAST
LIMIT ${validate(limit) ? limit[0].value : 200}`;
  }
  return query
  // Remove extra newlines
    .replace(/\n{2,}/g, '\n');
};

export default queryTemplate;
