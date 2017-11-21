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
    minDate,
    maxDate,
    // having,
    // limit,
  } = props;
  const groupVal = group ? `${group.value}${group.bucket ? ` / ${group.bucket} * ${group.bucket}` : ''}` : 'hero_id';
  const query = `
select ${groupVal} ${(group && group.alias) || ''}, 
count(distinct match_id) games, 
count(distinct match_id)::float/sum(count(1)) OVER() * 10 pickrate,
sum(case when radiant_win = (player_slot < 128) then 1 else 0 end)::float/count(1) winrate
FROM public_matches
JOIN public_player_matches using(match_id)
WHERE start_time >= extract(epoch from ${minDate ? `timestamp '${minDate.value}'` : 'now() - interval \'1 day\''})::int
${minMmr ? `AND avg_mmr >= '${minMmr.value}'` : ''}
${maxMmr ? `AND avg_mmr <= '${maxMmr.value}'` : ''}
${hero ? `AND public_player_matches.hero_id = ${hero.value}` : ''}
${minDuration ? `AND public_matches.duration >= ${minDuration.value}` : ''}
${maxDuration ? `AND public_matches.duration <= ${maxDuration.value}` : ''}
${side ? `AND (public_player_matches.player_slot < 128) = ${side.value}` : ''}
${result ? `AND ((public_player_matches.player_slot < 128) = public_matches.radiant_win) = ${result.value}` : ''}
${gameMode ? `AND game_mode = '${gameMode.value}'` : ''}
${lobbyType ? `AND lobby_type = '${lobbyType.value}'` : ''}
${maxDate ? `AND start_time <= extract(epoch from timestamp '${maxDate.value}')::int` : ''}
GROUP BY ${groupVal}
ORDER BY games desc
`;
  console.log(query);
  return query
  // Remove extra newlines
    .replace(/\n{2,}/g, '\n');
};

export default queryTemplate;
// const minDateThreshold = new Date(new Date()) - (1000 * 60 * 60 * 24 * 30));
// TABLESAMPLE SYSTEM_ROWS(1000)
// Postgres query optimizer refuses to use index scan when date range is too large (>3 days or so)
