export default {
  mega_creep_wins: {
    sql: `
SELECT match_id, leagues.name from matches
JOIN leagues
USING(leagueid)
WHERE (radiant_win = TRUE AND barracks_status_radiant = 0)
OR (radiant_win = FALSE AND barracks_status_dire = 0)
ORDER BY match_id DESC
`,
  },
  heroes_most_picked_banned: {
    name: 'Heroes, most picked/banned',
    sql: `
SELECT h.localized_name,
sum(case when ((pm.player_slot < 128) = m.radiant_win) then 1 else 0 end) wins, 
sum(case when is_pick is true then 1 else 0 end) picks,
sum(case when is_pick is false then 1 else 0 end) bans
FROM picks_bans pb
LEFT JOIN matches m
ON pb.match_id = m.match_id
LEFT JOIN player_matches pm
ON pb.hero_id = pm.hero_id
AND pm.match_id = m.match_id
LEFT JOIN heroes h
ON pb.hero_id = h.id
GROUP BY h.localized_name
ORDER BY picks DESC;
            `,
  },
  heroes_most_midas: {
    name: 'Heroes, most Hand of Midas built',
    sql: `
SELECT h.localized_name, sum((purchase->>'hand_of_midas')::int)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
GROUP by h.localized_name
ORDER by sum DESC NULLS LAST;
    `,
  },
  matches_most_recent: {
    name: 'Matches, most recent',
    sql: `
SELECT match_id, t1.name AS radiant_team_name, t2.name AS dire_team_name, le.name, start_time, duration
FROM matches ma
JOIN leagues le
ON ma.leagueid = le.leagueid
LEFT JOIN teams t1
ON radiant_team_id = t1.team_id
LEFT JOIN teams t2
ON dire_team_id = t2.team_id
WHERE ma.leagueid > 0
ORDER BY match_id DESC
LIMIT 100;
            `,
  },
  /*
      "metadata_columns":
      {
          "name": "Metadata, columns",
          "sql": `
  SELECT *
  FROM information_schema.columns
  WHERE table_schema = "public";
          `,
      },
      */
  hero_most_picked: `
SELECT h.localized_name, count(*)
FROM picks_bans pb
JOIN heroes h
ON pb.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pb.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE is_pick IS TRUE
AND to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
ORDER BY count DESC;
`,
  hero_most_banned: `
SELECT h.localized_name, count(*)
FROM picks_bans pb
JOIN heroes h
ON pb.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pb.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE is_pick IS FALSE
AND to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
ORDER BY count DESC;
`,
  hero_highest_win_rate: `
SELECT h.localized_name, 
sum(case when ((pm.player_slot < 128) = m.radiant_win) then 1 else 0 end)/count(*)::float winrate
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
ON pm.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY winrate DESC
`,
  hero_highest_kill_avg: `
SELECT h.localized_name, 
avg(kills)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY avg DESC
`,
  hero_highest_assist_avg: `
SELECT h.localized_name, 
avg(assists)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY avg DESC
`,
  hero_lowest_death_avg: `
SELECT h.localized_name, 
avg(deaths)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY avg ASC
`,
  hero_highest_last_hits_avg: `
SELECT h.localized_name, 
avg(last_hits)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY avg DESC
`,
  hero_highest_gpm_avg: `
SELECT h.localized_name, 
avg(gold_per_min)
FROM player_matches pm
JOIN heroes h
ON pm.hero_id = h.id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
GROUP BY h.localized_name
HAVING count(*) > 5
ORDER BY avg DESC
`,
  team_most_kills: `
SELECT t.name,
avg(kills)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY avg DESC
LIMIT 100
`,
  team_least_deaths: `
SELECT t.name,
avg(deaths)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY avg ASC
LIMIT 100
`,
  team_most_assists: `
SELECT t.name,
avg(assists)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY avg DESC
LIMIT 100
`,
  team_longest_match: `
SELECT t.name,
avg(m.duration)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
ON pm.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY avg DESC
LIMIT 100
`,
  team_shortest_match: `
SELECT t.name,
avg(duration)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN matches m
ON pm.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY avg ASC
LIMIT 100
`,
  team_most_heroes: `
SELECT t.name,
count(distinct h.localized_name)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN heroes h
ON pm.hero_id = h.id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY count DESC
LIMIT 100
`,
  team_least_heroes: `
SELECT t.name,
count(distinct h.localized_name)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
LEFT JOIN teams t
ON np.team_id = t.team_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN heroes h
ON pm.hero_id = h.id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY t.team_id
ORDER BY count ASC
LIMIT 100
`,
  player_highest_kills_avg: `
SELECT np.name,
avg(kills)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY avg DESC
LIMIT 100
`,
  player_lowest_deaths_avg: `
SELECT np.name,
avg(deaths)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY avg ASC
LIMIT 100
`,
  player_highest_assists_avg: `
SELECT np.name,
avg(assists)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY avg DESC
LIMIT 100
`,
  player_highest_last_hits_avg: `
SELECT np.name,
avg(last_hits)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY avg DESC
LIMIT 100
`,
  player_highest_gpm_avg: `
SELECT np.name,
avg(gold_per_min)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY avg DESC
LIMIT 100
`,
  player_most_heroes: `
SELECT np.name,
count(distinct pm.hero_id)
FROM player_matches pm
JOIN notable_players np
ON pm.account_id = np.account_id
JOIN match_patch mp
ON mp.match_id = pm.match_id
JOIN teams t
ON np.team_id = t.team_id
JOIN matches m
on mp.match_id = m.match_id
WHERE to_timestamp(m.start_time) > '2016-07-01'
AND (t.name LIKE 'OG Dota2'
OR t.name LIKE 'Team Liquid'
OR t.name LIKE 'Newbee'
OR t.name LIKE 'LGD-GAMING'
OR t.name LIKE 'MVP Phoenix'
OR t.name LIKE 'Natus Vincere'
OR t.name LIKE 'Evil Geniuses'
OR t.name LIKE 'the wings gaming'
OR t.name LIKE 'Team Secret'
OR t.name LIKE 'Digital Chaos'
OR t.name LIKE 'Alliance'
OR t.name LIKE 'Fnatic'
OR t.name LIKE 'compLexity Gaming'
OR t.name LIKE 'EHOME'
OR t.name LIKE 'Execration'
OR t.name LIKE 'Vici_Gaming Reborn'
OR t.name LIKE 'TNC Pro Team'
OR t.name LIKE 'Escape Gaming')
GROUP BY np.name
HAVING count(*) > 5
ORDER BY count DESC
LIMIT 100
`,
  tournament_heroes_picked: `
SELECT count(distinct hero_id)
FROM (SELECT * FROM picks_bans pb
WHERE is_pick IS TRUE
ORDER BY pb.match_id DESC
LIMIT 1500) x
`,
  tournament_heroes_banned: `
SELECT count(distinct hero_id)
FROM (SELECT * FROM picks_bans pb
WHERE is_pick IS FALSE
ORDER BY pb.match_id DESC
LIMIT 1500) x
`,
  tournament_kills_in_game: `
SELECT sum(kills)
FROM (SELECT * FROM player_matches pm
ORDER BY pm.match_id DESC
LIMIT 1500) x
GROUP BY match_id
ORDER BY sum DESC
LIMIT 1;
`,
  tournament_longest_game: `
SELECT max(duration) as seconds
FROM (SELECT * FROM player_matches pm
JOIN matches m 
ON pm.match_id = m.match_id
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
  tournament_shortest_game: `
SELECT min(duration) as seconds
FROM (SELECT * FROM player_matches pm
JOIN matches m 
ON pm.match_id = m.match_id
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
  tournament_most_kills_on_hero: `
SELECT max(kills)
FROM (SELECT * FROM player_matches pm
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
  tournament_most_deaths_on_hero: `
SELECT max(deaths)
FROM (SELECT * FROM player_matches pm
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
  tournament_most_assists_on_hero: `
SELECT max(assists)
FROM (SELECT * FROM player_matches pm
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
  tournament_highest_gpm_on_hero: `
SELECT max(gold_per_min)
FROM (SELECT * FROM player_matches pm
ORDER BY pm.match_id DESC
LIMIT 1500) x
`,
};
