import querystring from 'querystring';
import transformMatch from './transformMatch';
import transformBenchmarks from './transformBenchmarks';
import transformCounts from './transformCounts';
import transformHistograms from './transformHistograms';
import transformTrends from './transformTrends';
import transformRankings from './transformRankings';
import transformPlayerMatches from './transformPlayerMatches';
import action from './action';
import { langs } from '../lang';
import config from '../config';
import { paramsWithTurbo } from '../utility';
import transformHeroItemSuggestion from './transformHeroItemSuggestion';

export const getMetadata = () => action('metadata', config.VITE_API_HOST, 'api/metadata');
export const getMatch = matchId => action('match', config.VITE_API_HOST, `api/matches/${matchId}`, {}, transformMatch);
export const getRanking = heroId => action('heroRanking', config.VITE_API_HOST, 'api/rankings', { hero_id: heroId });
export const getBenchmark = heroId => action('heroBenchmark', config.VITE_API_HOST, 'api/benchmarks', { hero_id: heroId }, transformBenchmarks);
export const getHeroRecentGames = heroId => action('heroRecentGames', config.VITE_API_HOST, `api/heroes/${heroId}/matches`);
export const getHeroMatchups = heroId => action('heroMatchups', config.VITE_API_HOST, `api/heroes/${heroId}/matchups`);
export const getHeroDurations = heroId => action('heroDurations', config.VITE_API_HOST, `api/heroes/${heroId}/durations`);
export const getHeroPlayers = heroId => action('heroPlayers', config.VITE_API_HOST, `api/heroes/${heroId}/players`);
export const getHeroItemSuggestions = heroId => action('heroItemSuggestions', config.VITE_API_HOST, `api/heroes/${heroId}/itemPopularity`,{}, transformHeroItemSuggestion);
export const getProPlayers = () => action('proPlayers', config.VITE_API_HOST, 'api/proPlayers');
export const getProMatches = () => action('proMatches', config.VITE_API_HOST, 'api/proMatches');
export const getPublicMatches = params => action('publicMatches', config.VITE_API_HOST, 'api/publicMatches', params);
export const setSearchQuery = query => dispatch => dispatch(({
  type: 'QUERY/search',
  query,
}));
export const getSearchResult = query => action('search', config.VITE_API_HOST, 'api/search', { q: query });
export const getSearchResultAndPros = query => dispatch => Promise.all([
  dispatch(setSearchQuery(query)),
  dispatch(getSearchResult(query)),
  dispatch(getProPlayers()),
  ...(/^\d+$/.test(query) ? [dispatch(getMatch(query))] : []),
]);
export const getDistributions = () => action('distributions', config.VITE_API_HOST, 'api/distributions');
export const getHeroStats = params => action('heroStats', config.VITE_API_HOST, 'api/heroStats', params);
export const getLeagues = () => action('leagues', config.VITE_API_HOST, 'api/leagues');
export const getTeams = () => action('teams', config.VITE_API_HOST, 'api/teams');
export const getTeam = teamId => action('team', config.VITE_API_HOST, `api/teams/${teamId}`);
export const getTeamMatches = teamId => action('teamMatches', config.VITE_API_HOST, `api/teams/${teamId}/matches`);
export const getTeamPlayers = teamId => action('teamPlayers', config.VITE_API_HOST, `api/teams/${teamId}/players`);
export const getTeamHeroes = teamId => action('teamHeroes', config.VITE_API_HOST, `api/teams/${teamId}/heroes`);
export const getRecords = field => action('records', config.VITE_API_HOST, `api/records/${field}`);
export const getGithubPulls = merged => action('ghPulls', 'https://api.github.com', 'search/issues', {
  q: `repo:${config.GITHUB_REPO} type:pr base:production label:release merged:>${merged}`,
  order: 'desc',
  page: 1,
  per_page: 1,
});
export const getPlayer = accountId => action('player', config.VITE_API_HOST, `api/players/${accountId}`);
export const getPlayerWinLoss = (accountId, params) => action('playerWinLoss', config.VITE_API_HOST, `api/players/${accountId}/wl`, paramsWithTurbo(params));
export const getPlayerRecentMatches = (accountId, params) => action('playerRecentMatches', config.VITE_API_HOST, `api/players/${accountId}/recentMatches`, paramsWithTurbo(params));
export const getPlayerMatches = (accountId, params) => action('playerMatches', config.VITE_API_HOST, `api/players/${accountId}/matches`, {
  ...paramsWithTurbo(params),
  significant: 0,
  project: [
    'duration', 'game_mode', 'lobby_type',
    'start_time', 'hero_id', 'version', 'kills', 'deaths', 'assists', 'leaver_status', 'party_size', 'average_rank', 'hero_variant', // default fields when querying without project field
    'item_0', 'item_1', 'item_2', 'item_3', 'item_4', 'item_5', // additional fields required for items
  ] }, transformPlayerMatches({ ...querystring.parse(params.substring(1)) }));
export const getPlayerPeers = (accountId, params) => action('playerPeers', config.VITE_API_HOST, `api/players/${accountId}/peers`, paramsWithTurbo(params));
export const getPlayerHeroes = (accountId, params) => action('playerHeroes', config.VITE_API_HOST, `api/players/${accountId}/heroes`, paramsWithTurbo(params));
export const getPlayerPros = (accountId, params) => action('playerPros', config.VITE_API_HOST, `api/players/${accountId}/pros`, paramsWithTurbo(params));
export const getPlayerHistograms = (accountId, params, field) => action('playerHistograms', config.VITE_API_HOST, `api/players/${accountId}/histograms/${field}`, paramsWithTurbo(params), transformHistograms);
export const getPlayerRecords = (accountId, params, field) => action('playerRecords', config.VITE_API_HOST, `api/players/${accountId}/matches`, { ...paramsWithTurbo(params), sort: field, limit: 20 });
export const getPlayerTrends = (accountId, params, field) => action('playerTrends', config.VITE_API_HOST, `api/players/${accountId}/matches`, { ...paramsWithTurbo(params), limit: 1000, project: [field, 'hero_id', 'start_time'] }, transformTrends(field));
export const getPlayerCounts = (accountId, params) => action('playerCounts', config.VITE_API_HOST, `api/players/${accountId}/counts`, paramsWithTurbo(params), transformCounts);
export const getPlayerItems = (accountId, params) => action('playerItems', config.VITE_API_HOST, `api/players/${accountId}/items`, paramsWithTurbo(params));
export const getPlayerWardmap = (accountId, params) => action('playerWardmap', config.VITE_API_HOST, `api/players/${accountId}/wardmap`, paramsWithTurbo(params));
export const getPlayerWordcloud = (accountId, params) => action('playerWordcloud', config.VITE_API_HOST, `api/players/${accountId}/wordcloud`, { ...paramsWithTurbo(params), date: 365 });
export const getPlayerTotals = (accountId, params) => action('playerTotals', config.VITE_API_HOST, `api/players/${accountId}/totals`, paramsWithTurbo(params));
export const getPlayerMmr = (accountId, params) => action('playerMmr', config.VITE_API_HOST, `api/players/${accountId}/ratings`, paramsWithTurbo(params));
export const getPlayerRankings = (accountId, params) => action('playerRankings', config.VITE_API_HOST, `api/players/${accountId}/rankings`, paramsWithTurbo(params), transformRankings);
export const getStrings = () => async (dispatch) => {
  const getLang = lang => langs.find(item => item.value === lang);
  const savedLang = window.localStorage && window.localStorage.getItem('localization');
  const userLang = window.navigator.language;
  const defaultLang = langs[0];
  const lang = getLang(savedLang) || getLang(userLang) || defaultLang;

  const defData = await import(/* webpackChunkName: 'i18n-[request]' */`../lang/${defaultLang.value}.json`);
  const selData = await import(/* webpackChunkName: 'i18n-[request]' */`../lang/${lang.value}.json`);

  dispatch({ type: 'strings', payload: { ...defData, ...selData } });
};
export const getScenariosItemTimings = params => action('scenariosItemTimings', config.VITE_API_HOST, 'api/scenarios/itemTimings', params);
export const getScenariosLaneRoles = params => action('scenariosLaneRoles', config.VITE_API_HOST, 'api/scenarios/laneRoles', params);
export const getScenariosMisc = params => action('scenariosMisc', config.VITE_API_HOST, 'api/scenarios/misc', params);
