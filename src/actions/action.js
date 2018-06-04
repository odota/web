import querystring from 'querystring';
import fetch from 'isomorphic-fetch';

export default function action(type, host, path, params = {}, transform) {
  return (dispatch) => {
    const url = `${host}/${path}?${typeof params === 'string' ? params.substring(1) : querystring.stringify(params)}`;
    const getDataStart = () => ({
      type: `REQUEST/${type}`,
    });
    const getDataOk = payload => ({
      type: `OK/${type}`,
      payload,
    });
    const getError = error => ({
      type: `ERROR/${type}`,
      error,
    });
    const fetchDataWithRetry = delay => fetch(url, path === 'api/metadata' ? { credentials: 'include' } : {})
      .then((response) => {
        if (!response.ok) {
          dispatch(getError(response.status));
          if (response.status >= 400 && response.status < 500) {
            const err = new Error('client error');
            err.clientError = true;
            throw err;
          } else {
            throw new Error('fetch failed');
          }
        }
        return response.json();
      })
      .then(transform || (json => json))
      .then(json => dispatch(getDataOk(json)))
      .catch((e) => {
        console.error(e);
        if (!e.clientError) {
          setTimeout(() => fetchDataWithRetry(delay + 3000), delay);
        }
      });
    dispatch(getDataStart());
    return fetchDataWithRetry(1000);
  };
}
