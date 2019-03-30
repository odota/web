const getQueryString = (teamA, teamB) => {
  const selectTeamA = [4, 3, 2, 1, 0]
    .map(i => `
      pma${i}.hero_id
    `).join();

  const joinTeamA = [0, 1, 2, 3, 4]
    .map(i => `
      JOIN player_matches pmA${i} 
      ON pmA${i}.match_id = matches.match_id 
      
      ${teamA[i] ? `AND pmA${i}.hero_id = ${teamA[i]}` : ((teamA.length > 0 && `AND pmA${i}.hero_id NOT IN (${teamA})`) || '')}
  
      ${!teamA[i] && i > 0 && !teamA[i - 1] ? `AND pmA${i}.hero_id > pmA${i - 1}.hero_id` : ''}
    `).join(' ');

  const joinTeamAConditions = [1, 2, 3, 4]
    .map(i => `
      AND ( ( pmA0.player_slot < 5 ) = ( pmA${i}.player_Slot < 5 ) )
    `).join(' ');

  const selectTeamB = [0, 1, 2, 3, 4]
    .map(i => `
      pmB${i}.hero_id
    `).join();

  const joinTeamB = [0, 1, 2, 3, 4]
    .map(i => `
      JOIN player_matches pmB${i} 
      ON pmB${i}.match_id = matches.match_id 

      ${teamB[i] ? `AND pmB${i}.hero_id = ${teamB[i]}` : ((teamB.length > 0 && `AND pmB${i}.hero_id NOT IN (${teamB})`) || '')}
  
      ${!teamB[i] && i > 0 && !teamB[i - 1] ? `AND pmB${i}.hero_id > pmB${i - 1}.hero_id` : ''}            
    `).join(' ');

  const joinTeamBConditions = [0, 1, 2, 3, 4]
    .map(i => `
      AND ( ( pmA0.player_slot < 5 ) = ( pmB${i}.player_Slot > 5 ) ) 
    `).join(' ');

  return (
    `SELECT matches.match_id, matches.start_time,
    ((pmA0.player_slot < 5) = matches.radiant_win) team_a_win,      
    ARRAY[${selectTeamA}] team_a_composition, ARRAY[${selectTeamB}] team_b_composition
    FROM matches            
    ${joinTeamA} ${joinTeamAConditions} ${joinTeamB} ${joinTeamBConditions}
    ORDER BY matches.start_time DESC LIMIT 500`
  );
};

export default getQueryString;

/* EXAMPLE QUERY */
/*
/*
/*
SELECT
matches.match_id,
matches.start_time,
array[pma4.hero_id, pma3.hero_id, pma2.hero_id, pma1.hero_id, pma0.hero_id]
team_composition_a,
array[pmb0.hero_id, pmb1.hero_id, pmb2.hero_id, pmb3.hero_id, pmb4.hero_id]
team_composition_b
FROM   matches
       join player_matches pmA0
         ON pmA0.match_id = matches.match_id
            AND pmA0.hero_id = 5
       join player_matches pmA1
         ON pmA1.match_id = matches.match_id
            AND pmA1.hero_id = 4
       join player_matches pmA2
         ON pmA2.match_id = matches.match_id
            AND pmA2.hero_id NOT IN ( 5, 4 )
       join player_matches pmA3
         ON pmA3.match_id = matches.match_id
            AND pmA3.hero_id NOT IN ( 5, 4 )
            AND pmA3.hero_id > pmA2.hero_id
       join player_matches pmA4
         ON pmA4.match_id = matches.match_id
            AND pmA4.hero_id NOT IN ( 5, 4 )
            AND pmA4.hero_id > pmA3.hero_id
            AND ( ( pmA0.player_slot < 5 ) = ( pmA1.player_slot < 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmA2.player_slot < 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmA3.player_slot < 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmA4.player_slot < 5 ) )
       join player_matches pmB0
         ON pmB0.match_id = matches.match_id
            AND pmB0.hero_id = 6
       join player_matches pmB1
         ON pmB1.match_id = matches.match_id
            AND pmB1.hero_id = 7
       join player_matches pmB2
         ON pmB2.match_id = matches.match_id
            AND pmB2.hero_id NOT IN ( 6, 7 )
       join player_matches pmB3
         ON pmB3.match_id = matches.match_id
            AND pmB3.hero_id NOT IN ( 6, 7 )
            AND pmB3.hero_id > pmB2.hero_id
       join player_matches pmB4
         ON pmB4.match_id = matches.match_id
            AND pmB4.hero_id NOT IN ( 6, 7 )
            AND pmB4.hero_id > pmB3.hero_id
            AND ( ( pmA0.player_slot < 5 ) = ( pmB0.player_slot > 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmB1.player_slot > 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmB2.player_slot > 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmB3.player_slot > 5 ) )
            AND ( ( pmA0.player_slot < 5 ) = ( pmB4.player_slot > 5 ) )
*/
