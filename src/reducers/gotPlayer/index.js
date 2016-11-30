import { combineReducers } from 'redux';
import playerReducer, { getPlayer } from 'reducers/gotPlayer/player';
import matches, { getPlayerMatches } from 'reducers/gotPlayer/matches';
import peers, { getPlayerPeers } from 'reducers/gotPlayer/peers';
import heroes, { getPlayerHeroes } from 'reducers/gotPlayer/heroes';
import pros, { getPlayerPros } from 'reducers/gotPlayer/pros';
import rankings, { getPlayerRankings } from 'reducers/gotPlayer/rankings';
import histogram, { getPlayerHistogram } from 'reducers/gotPlayer/histogram';
import winloss, { getWinLoss } from 'reducers/gotPlayer/winloss';
import records, { getPlayerRecords } from 'reducers/gotPlayer/records';
import counts, { getPlayerCounts } from 'reducers/gotPlayer/counts';
import mmr, { getPlayerMMR } from 'reducers/gotPlayer/mmr';
import items, { getPlayerItems } from 'reducers/gotPlayer/items';
import wardmap, { getPlayerWardmap } from 'reducers/gotPlayer/wardmap';
import wordcloud, { getPlayerWordcloud } from 'reducers/gotPlayer/wordcloud';
import trends, { getPlayerTrends } from 'reducers/gotPlayer/trends';

export default combineReducers({
  playerReducer,
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
});

const player = {
  ...getPlayer,
  ...getWinLoss,
};

export {
  player,
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
};
