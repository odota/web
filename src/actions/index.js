/* global API_HOST */
import querystring from 'querystring';
import fetch from 'isomorphic-fetch';
import transformMatch from 'actions/transformMatch';
import transformBenchmarks from 'actions/transformBenchmarks';
import transformCounts from 'actions/transformCounts';
import transformHistograms from 'actions/transformHistograms';
import transformTrends from 'actions/transformTrends';
import transformRankings from 'actions/transformRankings';

function createAction(type, host, path, params = {}, transform) {
  return (dispatch) => {
    const url = `${host}/${path}?${querystring.stringify(params)}`;
    const getDataStart = () => ({
      type: `REQUEST/${type}`,
    });
    const getDataOk = payload => ({
      type: `OK/${type}`,
      payload,
    });
    dispatch(getDataStart());
    return fetch(url, path === 'api/metadata' ? { credentials: 'include' } : {})
    .then(response => response.json())
    .then(transform || (json => json))
    .then(json => dispatch(getDataOk(json)))
    .catch((error) => {
      console.error(error);
      // TODO transparently retry with backoff
    });
  };
}

export const getMetadata = () => createAction('metadata', API_HOST, 'api/metadata');
export const getMatch = matchId => createAction('match', API_HOST, `api/matches/${matchId}`, {}, transformMatch);
export const getRanking = heroId => createAction('heroRanking', API_HOST, 'api/rankings', { hero_id: heroId });
export const getBenchmark = heroId => createAction('heroBenchmark', API_HOST, 'api/benchmarks', { hero_id: heroId }, transformBenchmarks);
export const getProPlayers = () => createAction('proPlayers', API_HOST, 'api/proPlayers');
export const getProMatches = () => createAction('proMatches', API_HOST, 'api/proMatches');
export const getPublicMatches = params => createAction('publicMatches', API_HOST, 'api/publicMatches', params);
export const setSearchQuery = query => dispatch => dispatch(({
  type: 'QUERY/search',
  query,
}));
export const getSearchResult = query => createAction('search', API_HOST, 'api/search', { q: query });
export const getSearchResultAndPros = query => dispatch => Promise.all([
  dispatch(setSearchQuery(query)),
  dispatch(getSearchResult(query)),
  dispatch(getProPlayers()),
]);
export const getDistributions = () => createAction('distributions', API_HOST, 'api/distributions');
export const getPvgnaHeroGuides = () => createAction('pvgnaGuides', 'https://yasp.pvgna.com', 'yasp');
export const getHeroStats = params => createAction('heroStats', API_HOST, 'api/heroStats', params);
export const getLeagues = () => createAction('leagues', API_HOST, 'api/leagues');
export const getTeams = () => createAction('teams', API_HOST, 'api/teams');
export const getRecords = field => createAction('records', API_HOST, `api/records/${field}`);
export const getGithubPulls = merged => createAction('ghPulls', 'https://api.github.com', 'search/issues', {
  q: `repo:odota/ui type:pr base:production label:release merged:>${merged}`,
  order: 'desc',
  page: 1,
  per_page: 1,
});
export const getPlayer = accountId => createAction('player', API_HOST, `api/players/${accountId}`);
export const getPlayerWinLoss = (accountId, params) => createAction('playerWinLoss', API_HOST, `api/players/${accountId}/wl`, params);
export const getPlayerRecentMatches = (accountId, params) => createAction('playerRecentMatches', API_HOST, `api/players/${accountId}/recentMatches`, params);
export const getPlayerMatches = (accountId, params) => createAction('playerMatches', API_HOST, `api/players/${accountId}/matches`, params);
export const getPlayerPeers = (accountId, params) => createAction('playerPeers', API_HOST, `api/players/${accountId}/peers`, params);
export const getPlayerHeroes = (accountId, params) => createAction('playerHeroes', API_HOST, `api/players/${accountId}/heroes`, params);
export const getPlayerPros = (accountId, params) => createAction('playerPros', API_HOST, `api/players/${accountId}/pros`, params);
export const getPlayerHistograms = (accountId, params, field) => createAction('playerHistograms', API_HOST, `api/players/${accountId}/histograms/${field}`, params, transformHistograms);
export const getPlayerRecords = (accountId, params, field) => createAction('playerRecords', API_HOST, `api/players/${accountId}/matches`, { ...params, sort: field, limit: 20 });
export const getPlayerTrends = (accountId, params, field) => createAction('playerTrends', API_HOST, `api/players/${accountId}/matches`, params, transformTrends(field));
export const getPlayerCounts = (accountId, params) => createAction('playerCounts', API_HOST, `api/players/${accountId}/counts`, params, transformCounts);
export const getPlayerItems = (accountId, params) => createAction('playerItems', API_HOST, `api/players/${accountId}/items`, params);
export const getPlayerWardmap = (accountId, params) => createAction('playerWardmap', API_HOST, `api/players/${accountId}/wardmap`, params);
export const getPlayerWordcloud = (accountId, params) => createAction('playerWordcloud', API_HOST, `api/players/${accountId}/wordcloud`, params);
export const getPlayerTotals = (accountId, params) => createAction('playerTotals', API_HOST, `api/players/${accountId}/totals`, params);
export const getPlayerMmr = (accountId, params) => createAction('playerMmr', API_HOST, `api/players/${accountId}/ratings`, params);
export const getPlayerRankings = (accountId, params) => createAction('playerRankings', API_HOST, `api/players/${accountId}/rankings`, params, transformRankings);
export * from './tableActions';
export * from './formActions';
export * from './requestActions';
