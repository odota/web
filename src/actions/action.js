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
    const fetchDataWithRetry = delay => fetch(url, path === 'api/metadata' ? { credentials: 'include' } : {})
        .then(response => response.json())
        .then(transform || (json => json))
        .then(json => dispatch(getDataOk(json)))
        .catch((error) => {
          console.error(error);
          setTimeout(() => fetchDataWithRetry(delay + 3000), delay);
        });
    dispatch(getDataStart());
    return fetchDataWithRetry(1000);
  };
}
