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
          if (response.status === 404) {
            const err = new Error('api returned 404');
            err.code = 404;
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
        console.log(e);
        console.log(e.code);
        console.log(e.code === 404);
        if (e.code !== 404) {
          console.log('test');
          setTimeout(() => fetchDataWithRetry(delay + 3000), delay);
        }
      });
    dispatch(getDataStart());
    return fetchDataWithRetry(1000);
  };
}
