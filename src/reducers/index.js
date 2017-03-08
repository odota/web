import { combineReducers } from 'redux';
import metadata from 'reducers/metadata';
import match from 'reducers/match';
import pvgnaGuides from 'reducers/pvgnaGuides';
import heroRanking, { getHeroRanking } from 'reducers/heroRanking';
import heroBenchmark, { getHeroBenchmark } from 'reducers/heroBenchmark';
import search from 'reducers/search';
import proPlayers, { getProPlayers } from 'reducers/proPlayers';
import publicMatches, { getPublicMatches } from 'reducers/publicMatches';
import proMatches, { getProMatches } from 'reducers/proMatches';
import gotPlayer, {
  player,
  playerMatches,
  playerPeers,
  playerHeroes,
  playerPros,
  playerRankings,
  playerHistogram,
  playerRecords,
  playerCounts,
  playerMMR,
  playerItems,
  playerWardmap,
  playerWordcloud,
  playerTrends,
} from 'reducers/gotPlayer';
import form, { getForm } from 'reducers/form';
import request from 'reducers/request';
import distributions from 'reducers/distributions';
import ghPulls from 'reducers/githubPulls';
import table, { getTable } from 'reducers/table';
import localization, { getLocalization } from 'reducers/localization';
import heroStats, { getHeroStats } from 'reducers/heroStats';
import leagues, { getLeagues } from 'reducers/leagues';
import teams, { getTeams } from 'reducers/teams';

// This is where we will export all our state retrieval functions (better encapsulation)
export {
  player,
  playerMatches,
  playerPeers,
  playerHeroes,
  playerPros,
  playerRankings,
  playerHistogram,
  playerRecords,
  playerCounts,
  playerMMR,
  playerItems,
  playerWardmap,
  playerWordcloud,
  playerTrends,
  getProPlayers as proPlayers,
  getProMatches as proMatches,
  getForm as form,
  getHeroBenchmark as benchmark,
  getHeroRanking as ranking,
  getTable as table,
  getLocalization as localization,
  pvgnaGuides,
  getHeroStats as heroStats,
  getPublicMatches as publicMatches,
  getLeagues as leagues,
  getTeams as teams,
};

export default combineReducers({
  metadata,
  gotPlayer,
  match,
  heroRanking,
  heroBenchmark,
  search,
  form,
  request,
  distributions,
  table,
  proPlayers,
  proMatches,
  localization,
  pvgnaGuides,
  heroStats,
  publicMatches,
  leagues,
  ghPulls,
  teams,
});
