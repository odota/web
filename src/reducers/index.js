import { combineReducers } from 'redux';
import reducer from 'reducers/reducer';
import player, { getPlayer } from 'reducers/gotPlayer/player';
import matches, { getPlayerMatches } from 'reducers/gotPlayer/matches';
import peers, { getPlayerPeers } from 'reducers/gotPlayer/peers';
import heroes, { getPlayerHeroes } from 'reducers/gotPlayer/heroes';
import pros, { getPlayerPros } from 'reducers/gotPlayer/pros';
import rankings, { getPlayerRankings } from 'reducers/gotPlayer/rankings';
import histogram, { getPlayerHistogram } from 'reducers/gotPlayer/histogram';
import winloss, { getPlayerWinLoss } from 'reducers/gotPlayer/winloss';
import records, { getPlayerRecords } from 'reducers/gotPlayer/records';
import counts, { getPlayerCounts } from 'reducers/gotPlayer/counts';
import mmr, { getPlayerMMR } from 'reducers/gotPlayer/mmr';
import items, { getPlayerItems } from 'reducers/gotPlayer/items';
import wardmap, { getPlayerWardmap } from 'reducers/gotPlayer/wardmap';
import wordcloud, { getPlayerWordcloud } from 'reducers/gotPlayer/wordcloud';
import trends, { getPlayerTrends } from 'reducers/gotPlayer/trends';
import recentMatches, { getPlayerRecentMatches } from 'reducers/gotPlayer/recentMatches';
import totals, { getPlayerTotals } from 'reducers/gotPlayer/totals';
import form, { getForm } from 'reducers/form';
import request from 'reducers/request';
import ghPulls from 'reducers/githubPulls';
import table, { getTable } from 'reducers/table';
import heroStats, { getHeroStats } from 'reducers/heroStats';
import leagues, { getLeagues } from 'reducers/leagues';
import teams, { getTeams } from 'reducers/teams';
import globalRecords, { getGlobalRecords } from 'reducers/records';

// This is where we will export all our state retrieval functions (better encapsulation)
// TODO rename all of these "read*"
export {
  getPlayer as player,
  getPlayerMatches as playerMatches,
  getPlayerPeers as playerPeers,
  getPlayerHeroes as playerHeroes,
  getPlayerPros as playerPros,
  getPlayerRankings as playerRankings,
  getPlayerHistogram as playerHistogram,
  getPlayerRecords as playerRecords,
  getPlayerCounts as playerCounts,
  getPlayerMMR as playerMMR,
  getPlayerItems as playerItems,
  getPlayerWardmap as playerWardmap,
  getPlayerWordcloud as playerWordcloud,
  getPlayerTrends as playerTrends,
  getPlayerRecentMatches as playerRecentMatches,
  getPlayerTotals as playerTotals,
  getPlayerWinLoss as playerWinLoss,
  getForm as form,
  getTable as table,
  getHeroStats as heroStats,
  getLeagues as leagues,
  getTeams as teams,
  getGlobalRecords as records,
};

export default combineReducers({
  gotPlayer: combineReducers({
    player,
    matches,
    heroes,
    pros,
    rankings,
    histogram,
    winloss,
    peers,
    records,
    counts,
    mmr,
    items,
    wardmap,
    wordcloud,
    trends,
    recentMatches,
    totals,
  }),
  metadata: reducer('metadata'),
  match: reducer('match', {
    players: [],
  }),
  heroRanking: reducer('heroRanking'),
  heroBenchmark: reducer('heroBenchmark'),
  search: reducer('search'),
  distributions: reducer('distributions'),
  proPlayers: reducer('proPlayers'),
  proMatches: reducer('proMatches'),
  publicMatches: reducer('publicMatches'),
  pvgnaGuides: reducer('pvgnaGuides'),
  heroStats,
  leagues,
  ghPulls,
  teams,
  records: globalRecords,
  table,
  form,
  request,
});
