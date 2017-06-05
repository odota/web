import { combineReducers } from 'redux';
import reducer from 'reducers/reducer';
import request from 'reducers/request';
import form from 'reducers/form';
import table from 'reducers/table';

export default combineReducers({
  player: reducer('player'),
  playerWinLoss: reducer('playerWinLoss'),
  playerMatches: reducer('playerMatches'),
  playerHeroes: reducer('playerHeroes'),
  playerPros: reducer('playerPros'),
  playerRankings: reducer('playerRankings'),
  playerHistograms: reducer('playerHistograms'),
  playerPeers: reducer('playerPeers'),
  playerCounts: reducer('playerCounts'),
  playerRecords: reducer('playerRecords'),
  playerMmr: reducer('playerMmr'),
  playerItems: reducer('playerItems'),
  playerWardmap: reducer('playerWardmap'),
  playerWordcloud: reducer('playerWordcloud'),
  playerTrends: reducer('playerTrends'),
  playerRecentMatches: reducer('playerRecentMatches'),
  playerTotals: reducer('playerTotals'),
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
  heroStats: reducer('heroStats'),
  leagues: reducer('leagues'),
  teams: reducer('teams'),
  records: reducer('records'),
  ghPulls: reducer('ghPulls'),
  table,
  form,
  request,
});
