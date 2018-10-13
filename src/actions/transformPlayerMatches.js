export default function transformPlayerMatches(fields) {
  return (response) => {
    // Check if player match parameters have an included account id, and add an extra variable which specifies if that player id is in the same team
    if (fields.included_account_id && !Array.isArray(fields.included_account_id)) {
      return response.map((match) => {
        let sameTeam = false;
        const partnerHero = Object.values(match.heroes).find(hero => hero.account_id && hero.account_id.toString() === fields.included_account_id);
        if ((partnerHero.player_slot < 5 && match.player_slot < 5) || (partnerHero.player_slot > 127 && match.player_slot > 127)) {
          sameTeam = true;
        }
        return { ...match, sameTeam };
      });
    }
    return response;
  };
}
