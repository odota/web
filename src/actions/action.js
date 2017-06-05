import querystring from 'querystring';
import fetch from 'isomorphic-fetch';

export default function action(type, host, path, params = {}, transform) {
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
