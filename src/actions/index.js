/* global API_HOST */
import querystring from 'querystring';
import fetch from 'isomorphic-fetch';
import renderMatch from 'components/Match/renderMatch';

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
    return fetch(url, { credentials: 'include' })
  .then(response => response.json())
  .then(transform || (json => json))
  .then(json => dispatch(getDataOk(json)))
  .catch((error) => {
    console.error(error);
    // TODO transparently retry with backoff
  });
  };
}

function transformBenchmark(data) {
  const result = data.result;
  const listStats = Object.keys(data.result);
  const listPercentiles = result[listStats[0]].map(i => i.percentile);
  const benchmarks = [];

  for (let i = 0; i < listPercentiles.length; i += 1) {
    const percentilePerStat = {
      percentile: listPercentiles[i],
    };

    listStats.forEach((stat) => {
      percentilePerStat[stat] = result[stat][i].value;
    });
    benchmarks.push(percentilePerStat);
  }
  return { result: benchmarks };
}

export const getMetadata = () => createAction('metadata', API_HOST, 'api/metadata');
export const getMatch = matchId => createAction('match', API_HOST, `api/matches/${matchId}`, {}, renderMatch);
export const getRanking = heroId => createAction('heroRanking', API_HOST, 'api/rankings', { hero_id: heroId });
export const getBenchmark = heroId => createAction('heroBenchmark', API_HOST, 'api/benchmarks', { hero_id: heroId }, transformBenchmark);
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
export * from './pvgnaActions';
export * from './heroStatsActions';
export * from './leaguesActions';
export * from './teamsActions';
export * from './recordsActions';
export * from './player/playerActions';
export * from './player/playerMatchesActions';
export * from './player/playerPeersActions';
export * from './player/playerHeroesActions';
export * from './player/playerProsActions';
export * from './player/playerRankingsActions';
export * from './player/playerHistogramActions';
export * from './player/playerRecordsActions';
export * from './player/playerCountsActions';
export * from './player/playerMMRActions';
export * from './player/playerItemsActions';
export * from './player/playerWinLossActions';
export * from './player/playerWardmapActions';
export * from './player/playerWordcloudActions';
export * from './player/playerTrendsActions';
export * from './player/playerRecentMatchesActions';
export * from './player/playerTotalsActions';

export * from './tableActions';
export * from './formActions';
export * from './requestActions';
