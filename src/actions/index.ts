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

export const getMetadata = () =>
  action('metadata', config.VITE_API_HOST, 'api/metadata');
export const getMatch = (matchId: string) =>
  action(
    'match',
    config.VITE_API_HOST,
    `api/matches/${matchId}`,
    {},
    transformMatch,
  );
export const getRanking = (heroId: string) =>
  action('heroRanking', config.VITE_API_HOST, 'api/rankings', {
    hero_id: heroId,
  });
export const getBenchmark = (heroId: string) =>
  action(
    'heroBenchmark',
    config.VITE_API_HOST,
    'api/benchmarks',
    { hero_id: heroId },
    transformBenchmarks,
  );
export const getHeroRecentGames = (heroId: string) =>
  action(
    'heroRecentGames',
    config.VITE_API_HOST,
    `api/heroes/${heroId}/matches`,
  );
export const getHeroMatchups = (heroId: string) =>
  action('heroMatchups', config.VITE_API_HOST, `api/heroes/${heroId}/matchups`);
export const getHeroDurations = (heroId: string) =>
  action(
    'heroDurations',
    config.VITE_API_HOST,
    `api/heroes/${heroId}/durations`,
  );
export const getHeroPlayers = (heroId: string) =>
  action('heroPlayers', config.VITE_API_HOST, `api/heroes/${heroId}/players`);
export const getHeroItemSuggestions = (heroId: string) =>
  action(
    'heroItemSuggestions',
    config.VITE_API_HOST,
    `api/heroes/${heroId}/itemPopularity`,
    {},
    transformHeroItemSuggestion,
  );
export const getProPlayers = () =>
  action('proPlayers', config.VITE_API_HOST, 'api/proPlayers');
export const getProMatches = () =>
  action('proMatches', config.VITE_API_HOST, 'api/proMatches');
export const getPublicMatches = (params: any) =>
  action('publicMatches', config.VITE_API_HOST, 'api/publicMatches', params);
export const setSearchQuery = (query: string) => (dispatch: Function) =>
  dispatch({
    type: 'QUERY/search',
    query,
  });
export const getSearchResult = (query: string) =>
  action('search', config.VITE_API_HOST, 'api/search', { q: query });
export const getSearchResultAndPros = (query: string) => (dispatch: Function) =>
  Promise.all([
    dispatch(setSearchQuery(query)),
    dispatch(getSearchResult(query)),
    dispatch(getProPlayers()),
    ...(/^\d+$/.test(query) ? [dispatch(getMatch(query))] : []),
  ]);
export const getDistributions = () =>
  action('distributions', config.VITE_API_HOST, 'api/distributions');
export const getHeroStats = (params: any) =>
  action('heroStats', config.VITE_API_HOST, 'api/heroStats', params);
export const getLeagues = () =>
  action('leagues', config.VITE_API_HOST, 'api/leagues');
export const getPlayers = () =>
  action('players', config.VITE_API_HOST, 'api/topPlayers');
export const getPlayersTurbo = () =>
  action('playersTurbo', config.VITE_API_HOST, 'api/topPlayers', { turbo: 1 });
export const getTeams = () =>
  action('teams', config.VITE_API_HOST, 'api/teams');
export const getTeam = (teamId: string) =>
  action('team', config.VITE_API_HOST, `api/teams/${teamId}`);
export const getTeamMatches = (teamId: string) =>
  action('teamMatches', config.VITE_API_HOST, `api/teams/${teamId}/matches`);
export const getTeamPlayers = (teamId: string) =>
  action('teamPlayers', config.VITE_API_HOST, `api/teams/${teamId}/players`);
export const getTeamHeroes = (teamId: string) =>
  action('teamHeroes', config.VITE_API_HOST, `api/teams/${teamId}/heroes`);
export const getRecords = (field: string) =>
  action('records', config.VITE_API_HOST, `api/records/${field}`);
export const getGithubPulls = (merged: string) =>
  action('ghPulls', 'https://api.github.com', 'search/issues', {
    q: `repo:${config.GITHUB_REPO} type:pr base:production label:release merged:>${merged}`,
    order: 'desc',
    page: 1,
    per_page: 1,
  });
export const getPlayer = (accountId: string) =>
  action('player', config.VITE_API_HOST, `api/players/${accountId}`);
export const getPlayerWinLoss = (accountId: string, params: any) =>
  action(
    'playerWinLoss',
    config.VITE_API_HOST,
    `api/players/${accountId}/wl`,
    paramsWithTurbo(params),
  );
export const getPlayerRecentMatches = (accountId: string, params: any) =>
  action(
    'playerRecentMatches',
    config.VITE_API_HOST,
    `api/players/${accountId}/recentMatches`,
    paramsWithTurbo(params),
  );
export const getPlayerMatches = (accountId: string, params: any) =>
  action(
    'playerMatches',
    config.VITE_API_HOST,
    `api/players/${accountId}/matches`,
    {
      ...paramsWithTurbo(params),
      significant: 0,
      project: [
        'duration',
        'game_mode',
        'lobby_type',
        'start_time',
        'hero_id',
        'version',
        'kills',
        'deaths',
        'assists',
        'leaver_status',
        'party_size',
        'average_rank',
        'hero_variant', // default fields when querying without project field
        'item_0',
        'item_1',
        'item_2',
        'item_3',
        'item_4',
        'item_5', // additional fields required for items
      ],
    },
    transformPlayerMatches({ ...querystring.parse(params.substring(1)) }),
  );
export const getPlayerPeers = (accountId: string, params: any) =>
  action(
    'playerPeers',
    config.VITE_API_HOST,
    `api/players/${accountId}/peers`,
    paramsWithTurbo(params),
  );
export const getPlayerHeroes = (accountId: string, params: any) =>
  action(
    'playerHeroes',
    config.VITE_API_HOST,
    `api/players/${accountId}/heroes`,
    paramsWithTurbo(params),
  );
export const getPlayerPros = (accountId: string, params: any) =>
  action(
    'playerPros',
    config.VITE_API_HOST,
    `api/players/${accountId}/pros`,
    paramsWithTurbo(params),
  );
export const getPlayerHistograms = (
  accountId: string,
  params: any,
  field: string,
) =>
  action(
    'playerHistograms',
    config.VITE_API_HOST,
    `api/players/${accountId}/histograms/${field}`,
    paramsWithTurbo(params),
    transformHistograms,
  );
export const getPlayerRecords = (
  accountId: string,
  params: any,
  field: string,
) =>
  action(
    'playerRecords',
    config.VITE_API_HOST,
    `api/players/${accountId}/matches`,
    { ...paramsWithTurbo(params), sort: field, limit: 20 },
  );
export const getPlayerTrends = (
  accountId: string,
  params: any,
  field: string,
) =>
  action(
    'playerTrends',
    config.VITE_API_HOST,
    `api/players/${accountId}/matches`,
    {
      ...paramsWithTurbo(params),
      limit: 1000,
      project: [field, 'hero_id', 'start_time'],
    },
    transformTrends(field),
  );
export const getPlayerCounts = (accountId: string, params: any) =>
  action(
    'playerCounts',
    config.VITE_API_HOST,
    `api/players/${accountId}/counts`,
    paramsWithTurbo(params),
    transformCounts,
  );
export const getPlayerItems = (accountId: string, params: any) =>
  action(
    'playerItems',
    config.VITE_API_HOST,
    `api/players/${accountId}/items`,
    paramsWithTurbo(params),
  );
export const getPlayerWardmap = (accountId: string, params: any) =>
  action(
    'playerWardmap',
    config.VITE_API_HOST,
    `api/players/${accountId}/wardmap`,
    paramsWithTurbo(params),
  );
export const getPlayerWordcloud = (accountId: string, params: any) =>
  action(
    'playerWordcloud',
    config.VITE_API_HOST,
    `api/players/${accountId}/wordcloud`,
    paramsWithTurbo(params),
  );
export const getPlayerTotals = (accountId: string, params: any) =>
  action(
    'playerTotals',
    config.VITE_API_HOST,
    `api/players/${accountId}/totals`,
    paramsWithTurbo(params),
  );
export const getPlayerMmr = (accountId: string, params: any) =>
  action(
    'playerMmr',
    config.VITE_API_HOST,
    `api/players/${accountId}/ratings`,
    paramsWithTurbo(params),
  );
export const getPlayerRankings = (accountId: string, params: any) =>
  action(
    'playerRankings',
    config.VITE_API_HOST,
    `api/players/${accountId}/rankings`,
    paramsWithTurbo(params),
    transformRankings,
  );
export const getStrings = () => async (dispatch: Function) => {
  const getLang = (lang: string | null) =>
    langs.find((item) => item.value === lang);
  const savedLang =
    window.localStorage && window.localStorage.getItem('localization');
  const userLang = window.navigator.language;
  const defaultLang = langs[0];
  const lang = getLang(savedLang) || getLang(userLang) || defaultLang;

  const defData = await import(`../lang/${defaultLang.value}.json`);
  const selData = await import(`../lang/${lang.value}.json`);

  dispatch({ type: 'strings', payload: { ...defData, ...selData } });
};
export const getScenariosItemTimings = (params: any) =>
  action(
    'scenariosItemTimings',
    config.VITE_API_HOST,
    'api/scenarios/itemTimings',
    params,
  );
export const getScenariosLaneRoles = (params: any) =>
  action(
    'scenariosLaneRoles',
    config.VITE_API_HOST,
    'api/scenarios/laneRoles',
    params,
  );
export const getScenariosMisc = (params: any) =>
  action('scenariosMisc', config.VITE_API_HOST, 'api/scenarios/misc', params);
