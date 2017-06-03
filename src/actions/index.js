import querystring from 'querystring';
import fetch from 'isomorphic-fetch';

function createAction(host, path, params = {}) {
    return (dispatch) => {
    const getDataStart = () => ({
    type: 'REQUEST ' + path,
    });
    const getDataOk = payload => ({
    type: 'OK ' + path,
    payload,
    });
  dispatch(getDataStart());
  return fetch(`${host}/${path}?${querystring.stringify(params)}`, { credentials: 'include' })
  .then(response => response.json())
  .then(json => dispatch(getDataOk(json)))
  .catch((error) => {
    console.error(error);
    // TODO transparently retry with backoff
  });
}
}

export function getMetadata() {
    return createAction(API_HOST, 'api/metadata')
}

export * from './matchActions';
export * from './tableActions';
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
export * from './formActions';
export * from './rankingActions';
export * from './benchmarkActions';
export * from './searchActions';
export * from './requestActions';
export * from './distributionsActions';
export * from './proPlayersActions';
export * from './proMatchesActions';
export * from './localizationActions';
export * from './pvgnaActions';
export * from './heroStatsActions';
export * from './publicMatchesActions';
export * from './leaguesActions';
export * from './teamsActions';
export * from './recordsActions';
