const queryTemplate = (props) => {
  const {
    group,
    minMmr,
    maxMmr,
    hero,
    minDuration,
    maxDuration,
    side,
    result,
    gameMode,
    lobbyType,
    // minDate,
    // maxDate,
    // having,
    // limit,
  } = props;
  const groupVal = group ? `${group.value}${group.bucket ? ` / ${group.bucket} * ${group.bucket}` : ''}` : 'hero_id';
  const query = `
select ${groupVal} ${(group && group.alias) || ''}, 
count(distinct match_id) games, 
sum(case when radiant_win = (player_slot < 128) then 1 else 0 end)::float/count(1) winrate
FROM public_matches
JOIN public_player_matches using(match_id)
WHERE TRUE
${minMmr ? `AND avg_mmr >= '${minMmr.value}'` : ''}
${maxMmr ? `AND avg_mmr <= '${maxMmr.value}'` : ''}
${hero ? `AND public_player_matches.hero_id = ${hero.value}` : ''}
${minDuration ? `AND public_matches.duration >= ${minDuration.value}` : ''}
${maxDuration ? `AND public_matches.duration <= ${maxDuration.value}` : ''}
${side ? `AND (public_player_matches.player_slot < 128) = ${side.value}` : ''}
${result ? `AND ((public_player_matches.player_slot < 128) = public_matches.radiant_win) = ${result.value}` : ''}
${gameMode ? `AND game_mode = '${gameMode.value}'` : ''}
${lobbyType ? `AND lobby_type = '${lobbyType.value}'` : ''}
AND start_time > extract(epoch from now() - interval '1 day')::int
GROUP BY ${groupVal}
ORDER BY games desc
`;
  return query
  // Remove extra newlines
    .replace(/\n{2,}/g, '\n');
};

export default queryTemplate;
