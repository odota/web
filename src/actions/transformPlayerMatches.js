import {
  isRadiant,
} from '../utility';

export default function transformPlayerMatches(fields) {
  return (response) => {
    // Check if player match parameters have an included account id, and add an extra variable which specifies if that player id is in the same team
    if (fields.included_account_id && !Array.isArray(fields.included_account_id)) {
      return response.map((match) => {
        let sameTeam = false;
        const found = Object.entries(match.heroes).find(([key, val]) => val.account_id && val.account_id.toString() === fields.included_account_id);
        const partnerHero = {...found?.val, player_slot: found?.key};
        if (isRadiant(partnerHero.player_slot) === isRadiant(match.player_slot)) {
          sameTeam = true;
        }
        return { ...match, sameTeam };
      });
    }
    return response;
  };
}
