/* global API_HOST */
import transformMatch from 'actions/transformMatch';
import transformBenchmarks from 'actions/transformBenchmarks';
import transformCounts from 'actions/transformCounts';
import transformHistograms from 'actions/transformHistograms';
import transformTrends from 'actions/transformTrends';
import transformRankings from 'actions/transformRankings';
import action from 'actions/action';
import querystring from 'querystring';

export const getMetadata = () => action('metadata', API_HOST, 'api/metadata');
export const getMatch = matchId => action('match', API_HOST, `api/matches/${matchId}`, {}, transformMatch);
export const getRanking = heroId => action('heroRanking', API_HOST, 'api/rankings', { hero_id: heroId });
export const getBenchmark = heroId => action('heroBenchmark', API_HOST, 'api/benchmarks', { hero_id: heroId }, transformBenchmarks);
export const getProPlayers = () => action('proPlayers', API_HOST, 'api/proPlayers');
export const getProMatches = () => action('proMatches', API_HOST, 'api/proMatches');
export const getPublicMatches = params => action('publicMatches', API_HOST, 'api/publicMatches', params);
export const setSearchQuery = query => dispatch => dispatch(({
  type: 'QUERY/search',
  query,
}));
export const getSearchResult = query => action('search', API_HOST, 'api/search', { q: query });
export const getSearchResultAndPros = query => dispatch => Promise.all([
  dispatch(setSearchQuery(query)),
  dispatch(getSearchResult(query)),
  dispatch(getProPlayers()),
]);
export const getDistributions = () => action('distributions', API_HOST, 'api/distributions');
export const getPvgnaHeroGuides = () => action('pvgnaGuides', 'https://yasp.pvgna.com', 'yasp');
export const getHeroStats = params => action('heroStats', API_HOST, 'api/heroStats', params);
export const getLeagues = () => action('leagues', API_HOST, 'api/leagues');
export const getTeams = () => action('teams', API_HOST, 'api/teams');
export const getRecords = field => action('records', API_HOST, `api/records/${field}`);
export const getGithubPulls = merged => action('ghPulls', 'https://api.github.com', 'search/issues', {
  q: `repo:odota/ui type:pr base:production label:release merged:>${merged}`,
  order: 'desc',
  page: 1,
  per_page: 1,
});
export const getPlayer = accountId => action('player', API_HOST, `api/players/${accountId}`);
export const getPlayerWinLoss = (accountId, params) => action('playerWinLoss', API_HOST, `api/players/${accountId}/wl`, params);
export const getPlayerRecentMatches = (accountId, params) => action('playerRecentMatches', API_HOST, `api/players/${accountId}/recentMatches`, params);
export const getPlayerMatches = (accountId, params) => action('playerMatches', API_HOST, `api/players/${accountId}/matches`, { ...querystring.parse(params.substring(1)), significant: 0 });
export const getPlayerPeers = (accountId, params) => action('playerPeers', API_HOST, `api/players/${accountId}/peers`, params);
export const getPlayerHeroes = (accountId, params) => action('playerHeroes', API_HOST, `api/players/${accountId}/heroes`, params);
export const getPlayerPros = (accountId, params) => action('playerPros', API_HOST, `api/players/${accountId}/pros`, params);
export const getPlayerHistograms = (accountId, params, field) => action('playerHistograms', API_HOST, `api/players/${accountId}/histograms/${field}`, params, transformHistograms);
export const getPlayerRecords = (accountId, params, field) => action('playerRecords', API_HOST, `api/players/${accountId}/matches`, { ...querystring.parse(params.substring(1)), sort: field, limit: 20 });
export const getPlayerTrends = (accountId, params, field) => action('playerTrends', API_HOST, `api/players/${accountId}/matches`, { ...querystring.parse(params.substring(1)), limit: 500, project: [field, 'hero_id', 'start_time'] }, transformTrends(field));
export const getPlayerCounts = (accountId, params) => action('playerCounts', API_HOST, `api/players/${accountId}/counts`, params, transformCounts);
export const getPlayerItems = (accountId, params) => action('playerItems', API_HOST, `api/players/${accountId}/items`, params);
export const getPlayerWardmap = (accountId, params) => action('playerWardmap', API_HOST, `api/players/${accountId}/wardmap`, params);
export const getPlayerWordcloud = (accountId, params) => action('playerWordcloud', API_HOST, `api/players/${accountId}/wordcloud`, params);
export const getPlayerTotals = (accountId, params) => action('playerTotals', API_HOST, `api/players/${accountId}/totals`, params);
export const getPlayerMmr = (accountId, params) => action('playerMmr', API_HOST, `api/players/${accountId}/ratings`, params);
export const getPlayerRankings = (accountId, params) => action('playerRankings', API_HOST, `api/players/${accountId}/rankings`, params, transformRankings);
export * from './requestActions';
export * from './tableActions';
export * from './formActions';
