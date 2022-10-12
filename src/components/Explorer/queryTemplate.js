function conjoin(strings, value) {
  if (!value) {
    return '';
  }
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
  return `AND ${str0}${value.value !== undefined ? value.value : value}${str1}`;
}

function validateArray(p) {
  return Array.isArray(p) && p.length > 0;
}

const tiTeams = [7119388, 2586976, 6209166, 8254400, 7391077, 7732977, 8260983, 8291895, 8599101, 350190, 39, 
  7390454, 8131728, 8605863, 8721219, 6209804, 8597976, 2163, 1838315, 15];

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
    isTiTeam,
    megaWin,
    minGoldAdvantage,
    maxGoldAdvantage,
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
  if (validateArray(selectArray) && selectArray.some(p => p.template === 'picks_bans')) {
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
${validateArray(selectArray) && selectArray.find(x => x.where) !== undefined ? selectArray.find(x => x.where).where : ''}
${conjoin`team_id = ${organization}`}
${conjoin`match_patch.patch >= '${minPatch}'`}
${conjoin`match_patch.patch <= '${maxPatch}'`}
${conjoin`matches.leagueid = ${league}`}
${conjoin`matches.duration >= ${minDuration}`}
${conjoin`matches.duration <= ${maxDuration}`}
${conjoin`team_match.radiant = ${side}`}
${conjoin`(team_match.radiant = matches.radiant_win) = ${result}`}
${conjoin`matches.cluster IN (${region})`}
${minDate ? conjoin`matches.start_time >= extract(epoch from timestamp '${new Date(minDate.value).toISOString()}')` : ''}
${maxDate ? conjoin`matches.start_time <= extract(epoch from timestamp '${new Date(maxDate.value).toISOString()}')` : ''}
${conjoin`leagues.tier = '${tier}'`}
${isTiTeam ? `AND teams.team_id IN (${tiTeams.join(',')})` : ''}
${megaWin ? 'AND ((matches.barracks_status_radiant = 0 AND matches.radiant_win) OR (matches.barracks_status_dire = 0 AND NOT matches.radiant_win))' : ''}
${maxGoldAdvantage ? `AND @ matches.radiant_gold_adv[array_upper(matches.radiant_gold_adv, 1)] <= ${maxGoldAdvantage.value}` : ''}
${minGoldAdvantage ? `AND @ matches.radiant_gold_adv[array_upper(matches.radiant_gold_adv, 1)] >= ${minGoldAdvantage.value}` : ''}
GROUP BY hero_id
ORDER BY total ${(order && order.value) || 'DESC'}`;
  } else {
    const selectVal = {};
    const groupVal = {};
    if (validateArray(groupArray)) {
      groupArray.forEach((x) => { groupVal[x.key] = `${x.value}${x.bucket ? ` / ${x.bucket} * ${x.bucket}` : ''}`; });
    }
    if (validateArray(selectArray)) {
      selectArray.forEach((x) => { selectVal[x.key] = x.groupValue || (x && x.value) || 1; });
    }
    query = `SELECT
    ${validateArray(selectArray) ? selectArray.map(x => (x.distinct && !validateArray(groupArray) ? `DISTINCT ON (${x.value})` : '')).join('') : ''}\
    ${(validateArray(groupArray)) ?
    groupArray.map(x =>
      [`${x.groupKeySelect || groupVal[x.key]} ${x.alias || ''},`].filter(Boolean).join(',\n')).join('') : ''}
${(validateArray(groupArray)) ?
    (validateArray(selectArray) && selectArray.map(x =>
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
${!validateArray(groupArray) ?
    [validateArray(selectArray) ? selectArray.map(x => `${x.value} ${x.alias || ''}`) : '',
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
LEFT JOIN notable_players ON notable_players.account_id = player_matches.account_id
LEFT JOIN teams using(team_id)
${organization || (groupArray !== null && groupArray.length > 0 && groupArray[0] && groupArray.some(x => x.key === 'organization')) ?
    'JOIN team_match ON matches.match_id = team_match.match_id AND (player_matches.player_slot < 128) = team_match.radiant JOIN teams teams2 ON team_match.team_id = teams2.team_id' : ''}
${validateArray(selectArray) ? selectArray.map(x => (x.joinFn ? x.joinFn(props) : '')).join('') : ''}
${validateArray(selectArray) ? selectArray.map(x => (x.join ? x.join : '')).join('') : ''}
WHERE TRUE
${validateArray(selectArray) ? selectArray.map(x => `AND ${x.value} IS NOT NULL `).join('') : ''}
${conjoin`match_patch.patch >= '${minPatch}'`}
${conjoin`match_patch.patch <= '${maxPatch}'`}
${conjoin`player_matches.hero_id = ${hero}`}
${conjoin`player_matches.account_id = ${player}`}
${conjoin`matches.leagueid = ${league}`}
${conjoin`(player_matches.purchase->>'${playerPurchased}')::int > 0`}
${conjoin`matches.duration >= ${minDuration}`}
${conjoin`matches.duration <= ${maxDuration}`}
${conjoin`(player_matches.player_slot < 128) = ${side}`}
${conjoin`((player_matches.player_slot < 128) = matches.radiant_win) = ${result}`}
${conjoin`notable_players.team_id = ${team}`}
${conjoin`team_match.team_id = ${organization} AND (player_matches.player_slot < 128) = team_match.radiant`}
${conjoin`player_matches.lane_role = ${laneRole}`}
${conjoin`matches.cluster IN (${region})`}
${minDate ? conjoin`matches.start_time >= extract(epoch from timestamp '${new Date(minDate.value).toISOString()}')` : ''}
${maxDate ? conjoin`matches.start_time <= extract(epoch from timestamp '${new Date(maxDate.value).toISOString()}')` : ''}
${conjoin`leagues.tier = '${tier}'`}
${isTiTeam ? `AND teams.team_id IN (${tiTeams.join(',')})` : ''}
${megaWin ? 'AND ((matches.barracks_status_radiant = 0 AND matches.radiant_win) OR (matches.barracks_status_dire = 0 AND NOT matches.radiant_win))' : ''}
${maxGoldAdvantage ? `AND @ matches.radiant_gold_adv[array_upper(matches.radiant_gold_adv, 1)] <= ${maxGoldAdvantage.value}` : ''}
${minGoldAdvantage ? `AND @ matches.radiant_gold_adv[array_upper(matches.radiant_gold_adv, 1)] >= ${minGoldAdvantage.value}` : ''}
${validateArray(groupArray) ? 'GROUP BY' : ''}${(validateArray(groupArray) && groupArray.map(x => ` ${groupVal[x.key]}`)) || ''}
${validateArray(groupArray) ? `HAVING count(distinct matches.match_id) >= ${(having && having.value) || '1'}` : ''}
ORDER BY ${
  [`${(validateArray(groupArray) && validateArray(selectArray) && selectArray.map(x => `"AVG ${x.text}" ${order ? order.value : 'DESC'}`)) ||
    (validateArray(selectArray) && selectArray.map(x => `${x.value} ${order ? order.value : 'DESC'}`).join(',')) || 'matches.match_id'}`,
  validateArray(groupArray) ? 'count DESC' : '',
  ].filter(Boolean).join(',')} NULLS LAST
LIMIT ${limit ? limit.value : 200}`;
  }
  return query
  // Remove extra newlines
    .replace(/\n{2,}/g, '\n');
};

export default queryTemplate;
